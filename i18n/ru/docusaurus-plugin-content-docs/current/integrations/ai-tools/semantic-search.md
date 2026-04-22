---
title: "Семантический поиск"
sidebar_label: "Семантический поиск"
description: "Как добавить поиск задач по смыслу в DHTMLX Gantt с использованием эмбеддингов и косинусного сходства"
---

# Семантический поиск

Этот гид показывает, как добавить семантический поиск в приложение DHTMLX Gantt.

В отличие от традиционного текстового поиска, семантический поиск находит результаты по смыслу, а не по точному формулированию. Например, запрос вроде "backend delays" может соответствовать задачам вроде "API latency issue", даже если они не содержат общих ключевых слов. Это особенно полезно в крупных проектах, где названия задач различаются между командами, и пользователи описывают одну и ту же проблему по-разному.

Под капотом семантический поиск основан на *эмбеддингах* — числовых представлениях текста (иногда их называют векторами). Эти эмбеддинги генерируются моделями эмбеддинга, которые преобразуют текст в числа. Тексты с похожим значением дают похожие числа, поэтому их эмбеддинги оказываются "близкими" друг к другу.

Сравнивая эти эмбеддинги, мы можем найти задачи, которые семантически похожи на запрос пользователя.

На практике реализация проста:
- сгенерируйте эмбеддинги для ваших задач и сохраните их
- преобразуйте запрос пользователя в эмбеддинг
- найдите задачи с ближайшими эмбеддингами (то есть с наибольшим смысловым сходством)

Существует множество моделей эмбеддингов — от облачных провайдеров, таких как OpenAI или Cohere, до полностью локальных моделей, которые можно запускать через Ollama или llama.cpp.

В этом руководстве мы будем использовать небольшую локальную модель, которая работает на большинстве машин без внешних зависимостей. Сам подход не привязан к конкретному провайдеру, поэтому вы можете заменить любой сервис эмбеддинга, не меняя общую интеграцию.

## Как это работает

Поток поиска состоит из четырех шагов:

```text
user query
  -> generate query embedding
  -> compare with stored task embeddings (cosine similarity)
  -> return ranked task IDs with scores
  -> highlight matches in the Gantt chart
```

Бэкенд отвечает за генерацию эмбеддингов и ранжирование по сходству. Фронтенд отвечает за взаимодействие и отображение. Такое разделение означает, что можно заменить провайдера эмбеддинга или изменить UI независимо.

:::note
Хранящиеся эмбеддинги задач и эмбеддинги запроса должны получаться одной и той же моделью. Если вы перейдете на другую модель эмбеддинга, регенерируйте все сохранённые эмбеддинги задач перед обслуживанием запросов поиска.
:::

## Бэкенд: конечная точка поиска

Фронтенд отправляет строку запроса на `POST /search` и получает ранжированный список идентификаторов задач с оценками сходства.

Request:

```http
POST /search
Content-Type: application/json

{ "query": "risk assessment" }
```

Response:

```json
[
  { "id": 42, "score": 0.87 },
  { "id": 77, "score": 0.81 }
]
```

Ниже приведена минимальная реализация на FastAPI. Она использует Ollama с моделью [all-minilm], поэтому вся конфигурация запускается локально без внешних API-запросов. Чтобы воспользоваться другим провайдером, замените функцию `get_embedding()` — см. ниже раздел [Embedding provider examples](#embedding-provider-examples).

```python
from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI()

SIMILARITY_THRESHOLD = 0.4

TaskId = str | int

task_vectors: dict[TaskId, list[float]] = {}


class SearchRequest(BaseModel):
    query: str


class SearchResult(BaseModel):
    id: TaskId
    score: float


def get_embedding(text: str) -> list[float]:
    response = ollama.embed(model="all-minilm", input=text, truncate=True)
    return response.embeddings[0]


def cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(y * y for y in b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


@app.post("/search")
async def search(request: SearchRequest):
    query_vector = get_embedding(request.query)
    results = []

    for task_id, task_vector in task_vectors.items():
        score = cosine_similarity(task_vector, query_vector)
        if score > SIMILARITY_THRESHOLD:
            results.append(SearchResult(id=task_id, score=round(score, 4)))

    results.sort(key=lambda item: item.score, reverse=True)
    return [item.model_dump() for item in results]
```

### Embedding provider examples {#embedding-provider-examples}

Чтобы использовать hosted API, замените `get_embedding()`. Вот пример с использованием OpenAI:

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small", input=text
    )
    return response.data[0].embedding
```

### Combining text fields

Обычно у задач несколько полей для поиска (таких как название и описание). Объедините их в одну строку перед эмбеддингом. Так вектор захватит полное значение задачи:

```python
def get_indexable_text(task) -> str:
    return f"{task.text}\n{task.description}"
```

Вызывайте эту функцию при создании или обновлении задачи и сохраняйте получившийся эмбеддинг вместе с данными задачи:

```python
task_vectors[task.id] = get_embedding(get_indexable_text(task))
```

## Фронтенд: отправка запроса поиска

Добавьте ввод поиска над графиком Gantt и отправляйте запрос на бэкэнд при отправке. Отслеживайте три элемента состояния:

- `searchResults` — сырой ответ массива (или `null`, когда поиск не активен)
- `matchedIds` — `Set` идентификаторов сопоставленных задач для быстрого поиска
- `scoreMap` — `Map` от идентификатора задачи к релевантности

```js
let searchResults = null;
let matchedIds = new Set();
let scoreMap = new Map();

async function search() {
    const input = document.getElementById("search_input");
    const query = input.value.trim();
    if (!query) {
        flush();
        return;
    }

    const response = await fetch("/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const results = await response.json();

    searchResults = results;
    matchedIds = new Set(results.map(r => r.id));
    scoreMap = new Map(results.map(r => [r.id, r.score]));
    gantt.render();
}

function flush() {
    searchResults = null;
    matchedIds.clear();
    scoreMap.clear();
    gantt.render();
}
```

## Фронтенд: выделение совпавших задач

Используйте шаблоны Gantt для стилизации совпавших строк иначе чем несовпавших. Когда поиск не активен, возвращайте нейтральный класс, чтобы диаграмма отображалась нормально.

```js
function isSearchActive() {
    return searchResults !== null;
}
function isMatchedId(id) {
    return matchedIds.has(id);
}

gantt.templates.grid_row_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return isMatchedId(task.id) ? "highlight" : "dimmed";
};

gantt.templates.task_row_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return isMatchedId(task.id) ? "highlight" : "dimmed";
};

gantt.templates.task_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return isMatchedId(task.id) ? "highlight_task" : "dimmed_task";
};
```

Определите соответствующие CSS-классы для контроля визуального эффекта — например, снижение непрозрачности у затемнённых строк и добавление фона для выделенных.

Связанные API: [grid_row_class](api/template/grid_row_class.md), [task_row_class](api/template/task_row_class.md), и [task_class](api/template/task_class.md).

## Фронтенд: разворачивание родителей и прокрутка

После получения результатов откройте родительские ветви для любых сопоставленных задач, которые вложены, затем прокрутите к верхнему совпадению.

```js
matchedIds.forEach(function (id) {
    gantt.eachParent(function (parent) {
        parent.$open = true;
    }, id);
});

gantt.render();

if (searchResults.length > 0) {
    gantt.showTask(searchResults[0].id);
}
```

Связанные API: [eachParent()](api/method/eachparent.md) и [showTask()](api/method/showtask.md).

## Фронтенд: добавление столбца релевантности

Покажите оценки релевантности в столбце грид только во время активного поиска. Определите столбец с функцией `template`, который читает из `scoreMap`, и добавьте его в `gantt.config.columns` условно.

```js
function getColumns() {
    const columns = [
        { name: "text", label: "Task name", tree: true, width: 300 },
        { name: "start_date", label: "Start time", width: 120 },
        { name: "duration", label: "Duration", width: 90 }
    ];

    if (isSearchActive()) {
        columns.push({
            name: "relevance",
            label: "Relevance",
            align: "center",
            width: 100,
            template: function (task) {
                const score = scoreMap.get(task.id);
                if (score === undefined) return "";
                return Math.round(score * 100) + "%";
            }
        });
    }

    columns.push({ name: "add", label: "", width: 40 });

    return columns;
}

gantt.config.columns = getColumns();
gantt.attachEvent("onBeforeGanttRender", function () {
    gantt.config.columns = getColumns();
});
```

Столбец появляется, когда есть результаты поиска, и исчезает, когда пользователь очищает поиск вызовом `flush()`.

Связанный API: [columns](api/config/columns.md).

## Практические советы

- **Одинатая модель для индексирования и поиска.** Эмбеддинги из разных моделей несовместимы. Смена модели требует регенерации всех сохранённых эмбеддингов задач.

- **Качество исходного текста имеет решающее значение.** Короткие или неясные названия задач дают слабые эмбеддинги. Объединяйте все поля, подлежащие поиску — имя, описание, теги, ярлыки статусов — в текст, который вы эмбеддите. Богатый входной текст даёт более качественные результаты, чем любые настройки порога или алгоритмов.

- **Гибридный поиск.** Эмбеддинги хорошо работают со синонимами и перефразированием, но могут упускать точные совпадения — аббревиатуры, идентификаторы задач или термины, специфичные для домена. Комбинирование семантического поиска с полнотекстовым поиском охватывает оба случая: выполняйте оба запроса, объединяйте результаты и устраняйте дубликаты по ID задачи.

- **Top-k поиск и пересортировка.** Пример выше использует простой порог сходства, что просто, но может вернуть слишком много или слишком мало результатов в зависимости от запроса. Более надёжный подход — всегда извлекать топ-*k* результатов по баллу (например, топ-20), а затем при необходимости прогонять их через кросс-энкодер-ререйнер, который оценивает каждую пару (запрос, текст задачи) более точно.

- **Масштабирование с помощью приближённых ближайших соседей.** Пример выше сопоставляет вектор запроса с каждым сохранённым эмбеддингом задачи (линейный обход). Это работает для сотен или даже нескольких тысяч задач. Для больших наборов данных используйте индекс типа ANN — например pgvector в PostgreSQL, FAISS или управляемую векторную базу данных — чтобы получить суб-линейное время поиска. Индексы ANN требуют небольшого снижения точности recall в обмен на существенно более быструю выборку.

## Демонстрационный репозиторий GitHub

Полный рабочий проект, following этому руководству, доступен на GitHub: https://github.com/DHTMLX/gantt-semantic-search-ai-demo.

Приложение-демо включает в себя Python-бэкенд с Ollama, статичный фронтенд и Docker Compose для запуска одним кликом. Его интерфейс поиска также развивает родительские ветви для сопоставленных задач, прокручивает к верхнему совпадению, затемняет ссылки во время активного поиска и добавляет столбец релевантности в грид.