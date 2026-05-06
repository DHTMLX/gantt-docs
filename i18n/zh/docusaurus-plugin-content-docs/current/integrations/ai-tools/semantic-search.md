---
title: "语义搜索"
sidebar_label: "语义搜索"
description: "如何在 DHTMLX Gantt 中使用嵌入和余弦相似度实现基于含义的任务搜索"
---

# 语义搜索

本指南展示如何在 DHTMLX Gantt 应用中添加语义搜索。

与传统文本搜索不同，语义搜索根据含义而非精确措辞来查找结果。例如，查询“后端延迟”可以匹配诸如“API 延迟问题”的任务，即使它们没有共享共同的关键词。对于团队众多、任务名称在不同团队之间差异较大、用户以不同方式描述同一问题的大型项目，这种方式尤其有用。

在底层，语义搜索基于 *嵌入*（embeddings）——文本的数值表示（有时也称为向量）。这些嵌入由嵌入模型生成，将文本转换为数字。具有相近含义的文本会产生相近的数字，因此它们的嵌入会“接近”彼此。

通过比较这些嵌入，我们可以找到在语义上与用户查询相似的任务。

实际实现很直接：
- 为你的任务生成嵌入并存储
- 将用户的查询转换为一个嵌入
- 找到嵌入最接近的任务（即含义最相近）

目前有许多嵌入模型可用——从云提供商如 OpenAI、Cohere，到可以通过 Ollama 或 llama.cpp 运行的完全本地模型。

在本指南中，我们将使用一个在大多数机器上无需外部依赖即可运行的小型本地模型。该方法本身与提供商无关，因此你可以在不改变整体集成的情况下替换任何嵌入服务。

## 工作原理

搜索流程分为四个步骤：

```text
用户查询
  -> 生成查询嵌入
  -> 与存储的任务嵌入进行比较（余弦相似度）
  -> 返回带分数的排序任务 ID
  -> 在甘特图中高亮匹配项
```

后端负责嵌入生成和相似度排序。前端负责交互和显示。这种分离意味着你可以独立地更换嵌入提供者或更改 UI。

:::note
存储的任务嵌入和查询嵌入必须来自同一模型。如果你切换到不同的嵌入模型，请在提供搜索请求之前重新生成所有存储的任务嵌入。
:::

## 后端：搜索端点

前端将查询字符串发送到 `POST /search`，并接收带有相似度分数的排序任务 ID 列表。

请求：

```http
POST /search
Content-Type: application/json

{ "query": "risk assessment" }
```

响应：

```json
[
  { "id": 42, "score": 0.87 },
  { "id": 77, "score": 0.81 }
]
```

下面给出一个最小化的 FastAPI 实现。它使用 [Ollama](https://ollama.com/) 与 [all-minilm](https://ollama.com/library/all-minilm) 模型，因此整个设置在本地运行，无需外部 API 调用。若要使用其他提供商，请替换 `get_embedding()` 函数——见下方的 [Embedding provider examples](#embedding-provider-examples)。
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

若要使用托管 API，请替换 `get_embedding()`。以下是一个使用 OpenAI 的示例：

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small", input=text
    )
    return response.data[0].embedding
```
### 组合文本字段

通常任务有多个可搜索字段（例如名称和描述）。在进行嵌入前将它们组合成一个字符串。这样向量就能捕捉到任务的完整含义：

```python
def get_indexable_text(task) -> str:
    return f"{task.text}\n{task.description}"
```

在创建或更新任务时调用此函数，并将得到的嵳嵌入与任务数据一起存储：

```python
task_vectors[task.id] = get_embedding(get_indexable_text(task))
```

## 前端：发送搜索请求

在甘特图上方添加一个搜索输入框，提交时将查询发送到后端。跟踪三种状态：

- `searchResults` - 原始响应数组（搜索未激活时为 `null`）
- `matchedIds` - 匹配任务标识符集合，便于快速查找
- `scoreMap` - 从任务标识符到相关性分数的映射

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
## 前端：高亮显示匹配的任务

使用甘特模板将匹配的行样式与不匹配的行区分开来。当未进行搜索时，返回中性类名以确保图表正常呈现。

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
为控制视觉效果定义相应的 CSS 类——例如在变暗行上降低不透明度，在高亮行添加背景色等。

相关 API: [grid_row_class](api/template/grid_row_class.md), [task_row_class](api/template/task_row_class.md), 以及 [task_class](api/template/task_class.md)。

## 前端：展开父项并滚动

在收到结果后，打开嵌套任务的父分支以展开匹配的任务，然后滚动到顶部的匹配项。

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
相关 API: [eachParent()](api/method/eachparent.md) 和 [showTask()](api/method/showtask.md)。

## 前端：添加相关性列

仅在搜索活动时在网格列中显示相关性分数。定义一个读取 `scoreMap` 的 `template` 函数的列，并根据条件将其添加到 `gantt.config.columns`。

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

当存在搜索结果时，该列会显示；清除搜索（调用 `flush()`）后，该列将消失。

相关 API： [columns](api/config/columns.md)。

## 实用技巧

- **索引和查询使用同一模型。** 来自不同模型的嵌入并不兼容。切换模型需要重新生成所有存储的任务嵌入。

- **源文本质量最重要。** 简短或模糊的任务名称会产生薄弱的嵌入。将每一个可搜索字段（名称、描述、标签、状态标签等）整合到你嵌入的文本中。输入文本越丰富，结果越好，哪怕阈值或算法调优再多也比不上它。

- **混合搜索。** 嵌入在处理同义词和改述方面表现良好，但它们可能错过精确匹配——如缩写、任务 ID 或领域特定术语。将语义搜索与关键词（全文）搜索结合起来，可以覆盖两种情况：同时执行两次查询，合并结果并按任务ID 去重。

- **Top-k 检索与再排序。** 上述示例使用一个平坦的相似度阈值，简单但可能根据查询返回过多或过少的结果。更稳健的方法是始终按分数检索前 k 个结果（如前 20 条），然后可选地将它们传递给跨编码器的再排序器，以更精确地对每对（查询、任务文本）进行评分。

- **使用近似最近邻来扩展规模。** 上述示例将查询嵌入与每个存储的任务嵌入进行对比（线性扫描）。对于数百或几千条任务来说，这已经足够。对于更大数据集，请使用近似最近邻（ANN）索引——例如 PostgreSQL 中的 pgvector、FAISS，或托管向量数据库——以获得接近线性的搜索时间。ANN 索引在召回精确度与查找速度之间进行权衡。

## GitHub 演示代码仓库

遵循本教程的完整可运行项目可在 GitHub 上获取：[https://github.com/DHTMLX/gantt-semantic-search-ai-demo](https://github.com/DHTMLX/gantt-semantic-search-ai-demo)。

随附的演示应用包含一个使用 Ollama 的 Python 后端、一个静态前端和用于一键启动的 Docker Compose。其搜索界面还会在匹配任务时展开父分支、滚动到顶部匹配项、在进行搜索时对链接进行变暗处理，并在网格中添加一个相关性列。