---
title: "Semantische Suche"
sidebar_label: "Semantische Suche"
description: "Wie man eine semantische Suche nach Aufgaben in DHTMLX Gantt mithilfe von Embeddings und Kosinusähnlichkeit hinzufügt"
---

# Semantische Suche

Dieses Handbuch zeigt, wie man eine semantische Suche in eine DHTMLX Gantt-Anwendung integriert.

Im Gegensatz zur herkömmlichen Textsuche ermittelt die semantische Suche Ergebnisse anhand ihrer Bedeutung und nicht nach der exakten Wortwahl. Beispielsweise kann eine Abfrage wie „Backend-Verzögerungen“ Aufgaben wie „API-Latenzproblem“ finden, auch wenn sie keine gemeinsamen Schlüsselwörter verwenden. Das ist besonders nützlich in großen Projekten, in denen Aufgabenbezeichnungen teamübergreifend variieren und Benutzer dasselbe Problem unterschiedlich beschreiben.

Unter der Haube basiert die semantische Suche auf *Einbettungen* – numerischen Darstellungen von Texten (manchmal auch Vektoren genannt). Diese Einbettungen werden von Einbettungsmodellen erzeugt, die Text in Zahlen umwandeln. Texte mit ähnlicher Bedeutung erzeugen ähnliche Zahlen, sodass ihre Einbettungen am Ende nahe beieinanderliegen.

Durch den Vergleich dieser Einbettungen können wir Aufgaben finden, die semantisch ähnlich zur Abfrage eines Benutzers sind.

In der Praxis ist die Implementierung einfach:
- Einbettungen für Ihre Aufgaben erzeugen und speichern
- Die Abfrage des Benutzers in eine Einbettung umwandeln
- Aufgaben mit den engsten Einbettungen finden (d. h. semantisch am ähnlichsten)

Es gibt viele Embedding-Modelle – von Cloud-Anbietern wie OpenAI oder Cohere bis hin zu vollständig lokalen Modellen, die über Ollama oder llama.cpp laufen können.

In diesem Leitfaden verwenden wir ein kleines lokales Modell, das auf den meisten Maschinen ohne externe Abhängigkeiten läuft. Der Ansatz ist anbieterunabhängig, sodass Sie jeden Embedding-Dienst einsetzen können, ohne die Gesamteinbindung zu ändern.

## Wie es funktioniert

Der Suchablauf umfasst vier Schritte:

```text
user query
  -> generate query embedding
  -> compare with stored task embeddings (cosine similarity)
  -> return ranked task IDs with scores
  -> highlight matches in the Gantt chart
```

Der Backend verwaltet die Erzeugung von Einbettungen und die Rangordnung der Ähnlichkeiten. Das Frontend ist für Interaktion und Anzeige zuständig. Diese Trennung bedeutet, dass Sie den Embedding-Anbieter austauschen oder die Benutzeroberfläche unabhängig voneinander ändern können.

:::note
Gespeicherte Aufgaben-Einbettungen und Abfrage-Einbettungen müssen vom gleichen Modell stammen. Wenn Sie zu einem anderen Embedding-Modell wechseln, regenerieren Sie alle gespeicherten Aufgaben-Einbettungen, bevor Suchanfragen verarbeitet werden.
:::

## Backend: der Such-Endpunkt

Das Frontend sendet eine Abfragezeichenfolge an `POST /search` und erhält eine sortierte Liste von Aufgaben-IDs mit Ähnlichkeitswerten.

Anfrage:

```http
POST /search
Content-Type: application/json

{ "query": "risk assessment" }
```

Antwort:

```json
[
  { "id": 42, "score": 0.87 },
  { "id": 77, "score": 0.81 }
]
```

Hier ist eine minimale FastAPI-Implementierung. Sie verwendet [Ollama](https://ollama.com/) mit dem [all-minilm](https://ollama.com/library/all-minilm) Modell, sodass der gesamte Aufbau lokal ohne externe API-Aufrufe läuft. Um einen anderen Anbieter zu verwenden, ersetzen Sie die Funktion `get_embedding()` - siehe unten unter [Beispiele für Embedding-Anbieter](#embedding-provider-examples) unten.

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

### Beispiele für Embedding-Anbieter {#embedding-provider-examples}

Um eine gehostete API zu verwenden, ersetzen Sie `get_embedding()`. Hier ein Beispiel mit OpenAI:

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        model="text-embedding-3-small", input=text
    )
    return response.data[0].embedding
```

### Kombination mehrerer Textfelder

Normalerweise verfügen Aufgaben über mehrere durchsuchbare Felder (z. B. Name und Beschreibung). Kombinieren Sie diese zu einer einzigen Zeichenkette, bevor Sie sie einbetten. Dadurch erfasst der Vektor die volle Bedeutung der Aufgabe:

```python
def get_indexable_text(task) -> str:
    return f"{task.text}\n{task.description}"
```

Rufen Sie diese Funktion auf, wenn Sie eine Aufgabe erstellen oder aktualisieren, und speichern Sie die daraus resultierende Einbettung zusammen mit den Taskdaten:

```python
task_vectors[task.id] = get_embedding(get_indexable_text(task))
```

## Frontend: Senden der Suchanfrage

Fügen Sie oberhalb des Gantt-Diagramms eine Such-Eingabe hinzu und senden Sie die Abfrage beim Absenden an das Backend. Verfolgen Sie drei Zustände:

- `searchResults` - das rohe Antwortarray (oder `null`, wenn die Suche deaktiviert ist)
- `matchedIds` - ein `Set` von übereinstimmenden Aufgabenkennungen für schnelle Suche
- `scoreMap` - ein `Map` von Aufgaben-ID zu Relevanz-Score

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

## Frontend: Hervorheben der passenden Aufgaben

Verwenden Sie Gantt-Templates, um passende Zeilen im Diagramm anders zu formatieren als Nicht-Paare. Wenn die Suche deaktiviert ist, geben Sie eine neutrale Klasse zurück, damit das Diagramm normal gerendert wird.

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

Definieren Sie die entsprechenden CSS-Klassen, um den visuellen Effekt zu steuern – zum Beispiel reduzierte Transparenz bei ausgedimmten Zeilen und eine Hintergrundtönung bei hervorgehobenen Zeilen.

Verwandte API: [grid_row_class](api/template/grid_row_class.md), [task_row_class](api/template/task_row_class.md) und [task_class](api/template/task_class.md).

## Frontend: Erweitern von Eltern-Elementen und Scrollen

Nachdem Ergebnisse eingegangen sind, öffnen Sie die Elternebenen (Parent-Bäume) für alle passenden verschachtelten Aufgaben und scrollen Sie dann zum ersten Treffer oben.

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

Verwandte API: [eachParent()](api/method/eachparent.md) und [showTask()](api/method/showtask.md).

## Frontend: Eine Relevanz-Spalte hinzufügen

Zeigen Sie Relevanz-Scores in einer	Grid-Spalte nur, solange die Suche aktiv ist. Definieren Sie eine Spalte mit einer `template`-Funktion, die aus `scoreMap` liest, und fügen Sie sie bedingt zu `gantt.config.columns` hinzu.

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

Die Spalte erscheint, wenn Suchergebnisse vorhanden sind, und verschwindet, wenn der Benutzer die Suche durch Aufruf von `flush()` löscht.

Verwandte API: [columns](api/config/columns.md).

## Praktische Tipps

- **Gleiches Modell für Indizierung und Abfrage.** Embeddings aus unterschiedlichen Modellen sind nicht kompatibel. Der Wechsel des Modells erfordert die Neuerstellung aller gespeicherten Aufgaben-Einbettungen.

- **Qualität des Quelltexts ist entscheidend.** Kurze oder vage Aufgabenbezeichnungen erzeugen schwache Embeddings. Fassen Sie alle durchsuchbaren Felder – Name, Beschreibung, Tags, Statusbezeichnungen – zu dem Text zusammen, den Sie einbetten. Ausführlichere Eingabetexte verbessern die Ergebnisse stärker als irgendeine Schwellenwert- oder Algorithmus-Tuning.

- **Hybrid-Suche.** Embeddings erkennen Synonyme und Paraphrasierungen gut, können jedoch exakte Übereinstimmungen übersehen – Abkürzungen, Aufgaben-IDs oder domänenspezifische Begriffe. Die Kombination aus semantischer Suche und Volltextsuche deckt beide Fälle ab: Führen Sie beide Abfragen aus, kombinieren Sie die Ergebnisse und deduplizieren Sie nach der Aufgaben-ID.

- **Top-k-Retrieval und Neu-Ranking.** Das obige Beispiel verwendet eine einfache, flache Ähnlichkeits-Schwelle. Das ist zwar einfach, kann aber je nach Abfrage zu vielen oder zu wenigen Ergebnissen führen. Ein robusterer Ansatz besteht darin, immer die Top-*k*-Ergebnisse nach Score abzurufen (z. B. Top 20) und sie optional durch einen Cross-Encoder-Re-Ranker zu bewerten, der jedes Paar (Abfrage, Text der Aufgabe) genauer bewertet.

- **Skalierung mit ANN (approximate nearest neighbors).** Das gezeigte Beispiel vergleicht die Abfrage-Einbettung mit jeder gespeicherten Aufgabe-Einbettung (linearer Scan). Für Hunderte oder einige Tausend Aufgaben funktioniert das gut. Bei größeren Datensätzen verwenden Sie einen ANN-Index – z. B. pgvector in PostgreSQL, FAISS oder eine verwaltete Vektor-Datenbank –, um sublineare Suchzeiten zu erreichen. ANN-Indizes tauschen eine geringe Recall-Genauigkeit gegen deutlich schnellere Abfragen aus.


## GitHub-Demo-Repository

Ein vollständiges, funktionsfähiges Projekt, das dieser Anleitung folgt, ist [auf GitHub bereitgestellt](https://github.com/DHTMLX/gantt-semantic-search-ai-demo).

Die begleitende Demo-Anwendung enthält ein Python-Backend mit Ollama, ein statisches Frontend und Docker Compose für einen Start per Befehl. Ihre Suchoberfläche erweitert außerdem Elternebenen für übereinstimmende Aufgaben, scrollt zum oberen Treffer, dimmt Links während der aktiven Suche und fügt eine Relevanz-Spalte in das Raster hinzu.