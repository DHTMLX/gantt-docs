---
title: "의미 기반 검색"
sidebar_label: "의미 기반 검색"
description: "임베딩과 코사인 유사도를 사용하여 DHTMLX Gantt에 의미 기반 작업 검색을 추가하는 방법"
---

# 의미 기반 검색

이 가이드는 DHTMLX Gantt 애플리케이션에 의미 기반 검색을 추가하는 방법을 보여줍니다.

전통적인 텍스트 검색과 달리 의미 기반 검색은 정확한 표현의 일치가 아니라 의미에 따라 결과를 찾습니다. 예를 들어 "backend delays" 같은 쿼리는 공통 키워드를 공유하지 않더라도 "API 지연 문제"와 같은 작업과 일치할 수 있습니다. 이는 팀 간에 작업 이름이 다양하고 사용자가 같은 문제를 다르게 설명하는 대규모 프로젝트에서 특히 유용합니다.

배후에서, 의미 기반 검색은 *임베딩* - 텍스트의 수치 표현(때로는 벡터라고도 함)으로 이루어집니다. 이 임베딩은 임베딩 모델에 의해 생성되며, 텍스트를 숫자로 변환합니다. 의미가 비슷한 텍스트는 유사한 숫자를 생성하므로 이들의 임베딩은 서로 가까이에 위치하게 됩니다.

이 임베딩을 비교함으로써 사용자의 쿼리와 의미적으로 유사한 작업을 찾을 수 있습니다.

실무에서의 구현은 간단합니다:
- 작업에 대한 임베딩을 생성하고 저장합니다
- 사용자의 쿼리를 임베딩으로 변환합니다
- 가장 가까운 임베딩을 가진 작업을 찾습니다(즉, 의미가 가장 유사한 것)

임베딩 모델은 다양합니다 - OpenAI나 Cohere 같은 클라우드 공급자에서부터 Ollama나 llama.cpp를 통해 실행 가능한 완전 로컬 모델에 이르기까지 있습니다.

이 가이드에서는 외부 의존성 없이 대부분의 기계에서 실행되는 작은 로컬 모델을 사용합니다. 이 접근 방식은 공급자에 구애받지 않으며, 전체 통합을 변경하지 않고도 어떤 임베딩 서비스로도 교체할 수 있습니다.

## How it works

검색 흐름은 네 가지 단계로 구성됩니다:

```text
user query
  -> generate query embedding
  -> compare with stored task embeddings (cosine similarity)
  -> return ranked task IDs with scores
  -> highlight matches in the Gantt chart
```

백엔드는 임베딩 생성과 유사도 순위 매김을 담당합니다. 프런트엔드는 상호 작용과 디스플레이를 담당합니다. 이 분리는 임베딩 공급자를 바꾸거나 UI를 독립적으로 변경할 수 있음을 의미합니다.

:::note
저장된 작업 임베딩과 쿼리 임베딩은 반드시 같은 모델에서 와야 합니다. 다른 임베딩 모델로 전환하면 검색 요청을 서비스하기 전에 모든 저장된 작업 임베딩을 다시 생성해야 합니다.
:::

## Backend: the search endpoint

프런트엔드는 쿼리 문자열을 `POST /search`로 보내고, 유사도 점수와 함께 순위가 매겨진 작업 ID 목록을 받습니다.

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

다음은 최소한의 FastAPI 구현 예제입니다. 이 예제는 [Ollama](https://ollama.com/)와 [all-minilm](https://ollama.com/library/all-minilm) 모델을 사용하여 모든 설정이 외부 API 호출 없이 로컬에서 실행되도록 만듭니다. 다른 공급자를 사용하려면 `get_embedding()` 함수를 교체하십시오 - 아래의 Embedding provider 예시를 참고하십시오.

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

 hosted API를 사용하는 경우에는 `get_embedding()`를 바꾸면 됩니다. 아래는 OpenAI를 사용하는 예제입니다:

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

보통 작업에는 이름과 설명 같은 여러 개의 검색 가능 필드가 있습니다. 이를 하나의 문자열로 결합한 후 임베딩하세요. 이렇게 하면 벡터가 작업의 전체 의미를 포착합니다:

```python
def get_indexable_text(task) -> str:
    return f"{task.text}\n{task.description}"
```

이 함수를 작업을 생성하거나 업데이트할 때 호출하고, 결과 임베딩을 작업 데이터와 함께 저장하세요:

```python
task_vectors[task.id] = get_embedding(get_indexable_text(task))
```

## Frontend: sending the search request

Gantt 차트 위에 검색 입력을 추가하고 제출 시 백엔드로 쿼리를 보냅니다. 세 가지 상태를 추적합니다:

- `searchResults` - 원시 응답 배열(또는 검색이 비활성화되면 `null`)
- `matchedIds` - 빠른 조회를 위한 매칭된 작업 식별자의 `Set`
- `scoreMap` - 작업 식별자에서 관련 점수로의 매핑을 담는 `Map`

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

## Frontend: highlighting matched tasks

Gantt 템플릿을 사용하여 일치하는 행을 일치하지 않는 행과 다르게 스타일링합니다. 검색이 비활성화되면 차트가 정상적으로 렌더링되도록 중립 클래스를 반환합니다.

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

상응하는 시각 효과를 제어하는 CSS 클래스를 정의합니다. 예를 들어 흐려진 행의 불투명도를 낮추고, 강조된 행에는 배경 색상을 추가합니다.

관련 API: [grid_row_class](api/template/grid_row_class.md), [task_row_class](api/template/task_row_class.md), 및 [task_class](api/template/task_class.md).

## Frontend: expanding parents and scrolling

결과를 받은 후 중첩된 매칭 작업의 부모 분기를 열고 맨 위 매치를 향해 스크롤합니다.

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

관련 API: [eachParent()](api/method/eachparent.md) 및 [showTask()](api/method/showtask.md).

## Frontend: adding a relevance column

검색이 활성화될 때만 그리드 열에 관련도 점수를 표시합니다. `template` 함수로 `scoreMap`에서 값을 읽고, 조건부로 `gantt.config.columns`에 추가되도록 열을 정의합니다.

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

검색 결과가 있을 때만 열이 나타나고, 사용자가 `flush()`를 호출해 검색을 지우면 사라집니다.

관련 API: [columns](api/config/columns.md).

## Practical tips

- **인덱싱과 질의에 동일한 모델 사용.** 서로 다른 모델의 임베딩은 호환되지 않습니다. 모델을 바꾸면 저장된 모든 작업 임베딩을 다시 생성해야 합니다.

- **원문 텍스트의 품질이 가장 중요합니다.** 짧거나 모호한 작업 이름은 약한 임베딩을 생성합니다. 이름, 설명, 태그, 상태 라벨 등 모든 검색 가능한 필드를 임베딩하는 텍스트에 포함시키세요. 더 풍부한 입력 텍스트가 임계값이나 알고리즘 조정보다 결과를 더 개선합니다.

- **하이브리드 검색.** 임베딩은 동의어와 의역을 잘 처리하지만 정확한 매치를 놓칠 수 있습니다 - 약어, 작업 ID, 도메인 특정 용어 등. 의미 기반 검색과 키워드(전체 텍스트) 검색을 결합하면 두 경우를 모두 커버합니다: 두 쿼리를 모두 실행하고 결과를 병합한 후 작업 ID로 중복 제거를 수행합니다.

- **Top-k 검색 및 재랭킹.** 위의 예는 평면적인 유사도 임계치를 사용합니다. 이는 간단하지만 쿼리에 따라 너무 많거나 너무 적은 결과를 반환할 수 있습니다. 더 견고한 방법은 항상 상위 k개를 점수 순으로 조회한 뒤 필요 시 교차 인코더 재랭커를 거쳐 더 정확하게 점수를 매기는 것입니다.

- **근사 최근접 이웃(ANN)으로 확장하기.** 위의 예는 저장된 모든 작업 임베딩과 쿼리 임베딩을 선형 스캔으로 비교합니다. 수백 또는 수천 개의 작업에는 무난하지만, 더 큰 데이터 세트의 경우 PostgreSQL의 pgvector, FAISS, 또는 관리형 벡터 데이터베이스와 같은 ANN 인덱스를 사용해 검색 시간을 부분적으로 줄일 수 있습니다. ANN 인덱스는 검색 정확도에서 작은 희생을 감수하고 매우 빠른 조회를 제공합니다.

## GitHub demo repository

이 튜토리얼을 따라 만든 완전한 작동 프로젝트가 GitHub에 제공됩니다.

The accompanying demo application includes a Python backend with Ollama, a static frontend, and Docker Compose for one-command startup. Its search UI also expands parent branches for matched tasks, scrolls to the top match, dims links during active search, and adds a relevance column in the grid.