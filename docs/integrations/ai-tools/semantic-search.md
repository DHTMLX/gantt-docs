---
title: "Semantic Search"
sidebar_label: "Semantic Search"
description: "How to add meaning-based task search to DHTMLX Gantt using embeddings and cosine similarity"
---

# Semantic Search

This guide shows how to add semantic search to a DHTMLX Gantt application. Instead of matching exact keywords, semantic search finds tasks that are close in meaning to the user's query - useful when schedules are large, task names vary across teams, or users don't know the exact wording.

The approach is provider-agnostic. The examples below use a generic `embed_text()` function that you can implement with any embedding provider (OpenAI, Ollama, Cohere, etc.). The frontend integration pattern stays the same regardless of which provider you choose.

## How it works

The search flow has four steps:

```text
user query
  → generate query embedding
  → compare with stored task embeddings (cosine similarity)
  → return ranked task IDs with scores
  → highlight matches in the Gantt chart
```

The backend owns embedding generation and similarity ranking. The frontend owns interaction and display. This separation means you can swap the embedding provider or change the UI independently.

:::note
Stored task embeddings and query embeddings must come from the same model. If you switch to a different embedding model, regenerate all stored task embeddings before serving search requests.
:::

## Backend: the search endpoint

The frontend sends a query string to `POST /search` and receives a ranked list of task IDs with similarity scores.

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

Here is a minimal FastAPI implementation. The `embed_text()` function is a placeholder - replace it with your embedding provider.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

SIMILARITY_THRESHOLD = 0.4

task_vectors: dict[int, list[float]] = {}


class SearchRequest(BaseModel):
    query: str


def embed_text(text: str) -> list[float]:
    """Replace with your embedding provider."""
    raise NotImplementedError


def cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(y * y for y in b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


@app.post("/search")
async def search(request: SearchRequest):
    query_vector = embed_text(request.query)
    results = []

    for task_id, task_vector in task_vectors.items():
        score = cosine_similarity(task_vector, query_vector)
        if score > SIMILARITY_THRESHOLD:
            results.append({"id": task_id, "score": round(score, 4)})

    results.sort(key=lambda item: item["score"], reverse=True)
    return results
```

### Embedding provider examples

Drop-in `embed_text()` implementations for two common providers:

**Ollama** (local, uses the `ollama` Python package):

```python
import ollama

def embed_text(text: str) -> list[float]:
    response = ollama.embed(model="all-minilm", input=text, truncate=True)
    return response.embeddings[0]
```

**OpenAI** (hosted, uses the `openai` Python SDK):

```python
from openai import OpenAI

client = OpenAI()

def embed_text(text: str) -> list[float]:
    response = client.embeddings.create(
        model="all-minilm", input=text
    )
    return response.data[0].embedding
```

### Combining text fields

If tasks have multiple searchable fields (such as a name and a description), combine them into a single string before embedding. This way the vector captures the full meaning of the task.

```python
def get_searchable_text(task) -> str:
    return f"{task.text}\n{task.description}"
```

Call this function when creating or updating a task, and store the resulting embedding alongside the task data:

```python
task_vectors[task.id] = embed_text(get_searchable_text(task))
```

## Frontend: sending the search request

Add a search input above the Gantt chart and send the query to the backend on submit. Track three pieces of state:

- `searchResults` - the raw response array (or `null` when search is inactive)
- `matchedIds` - a `Set` of matched task IDs for fast lookup
- `scoreMap` - a `Map` from task ID to relevance score

```js
let searchResults = null;
let matchedIds = new Set();
let scoreMap = new Map();

async function doSearch(query) {
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

function clearSearch() {
    searchResults = null;
    matchedIds.clear();
    scoreMap.clear();
    gantt.render();
}
```

## Frontend: highlighting matched tasks

Use Gantt templates to style matched rows differently from non-matches. When search is inactive, return a neutral class so the chart renders normally.

```js
function isSearchActive() {
    return searchResults !== null;
}

gantt.templates.grid_row_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return matchedIds.has(task.id) ? "highlight" : "dimmed";
};

gantt.templates.task_row_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return matchedIds.has(task.id) ? "highlight" : "dimmed";
};

gantt.templates.task_class = function (start, end, task) {
    if (!isSearchActive()) return "";
    return matchedIds.has(task.id) ? "highlight_task" : "dimmed_task";
};
```

Define the corresponding CSS classes to control the visual effect - for example, reducing opacity on dimmed rows and adding a background tint on highlighted ones.

Related API: [grid_row_class](api/template/grid_row_class.md), [task_row_class](api/template/task_row_class.md), and [task_class](api/template/task_class.md).

## Frontend: expanding parents and scrolling

After receiving results, open parent branches for any matched tasks that are nested, then scroll to the top match.

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

Related API: [eachParent()](api/method/eachparent.md) and [showTask()](api/method/showtask.md).

## Frontend: adding a relevance column

Show relevance scores in a grid column only while search is active. Define a column with a `template` function that reads from `scoreMap`, and add it to `gantt.config.columns` conditionally.

```js
function getColumns() {
    var columns = [
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
                var score = scoreMap.get(task.id);
                if (score === undefined) return "";
                return Math.round(score * 100) + "%";
            }
        });
    }

    return columns;
}

gantt.config.columns = getColumns();
gantt.attachEvent("onBeforeGanttRender", function () {
    gantt.config.columns = getColumns();
});
```

The column appears when search results are present and disappears when the user clears the search.

Related API: [columns](api/config/columns.md).

## Practical tips

- **Threshold tuning.** The example uses `0.4` as the similarity threshold. If results feel noisy, raise it to return fewer but stricter matches. If good matches disappear, lower it. Before over-tuning the number, try improving the source text you embed - richer descriptions help more than threshold tweaks.
- **Source text quality.** Short or vague task names produce weak embeddings. If your tasks have descriptions, notes, or tags, include them in the text you embed.
- **Same model for indexing and querying.** Embeddings from different models are not compatible. Switching the model requires regenerating all stored task embeddings.
- **Label scores as relevance, not certainty.** A score of 0.85 means the task is semantically close to the query, not that it is 85% likely to be the right answer.

## Demo application

A complete working example is available on GitHub:

- [Gantt Semantic Search AI Demo](https://github.com/DHTMLX/gantt-semantic-search-ai-demo)

The demo includes a Python backend with Ollama, a static frontend, and Docker Compose for one-command startup.
