---
title: Verwendung von React Gantt mit TanStack Query
sidebar_label: TanStack Query
description: 'Erfahren Sie, wie Sie den Gantt-Serverzustand mit TanStack Query verwalten, Mutationen an den `data.save`-Callback anbinden und ihn mit einem leichten Zustandsspeicher (Zustand) für Undo/Redo-History und UI-Konfiguration kombinieren.'
---

# React Gantt - Tutorial zu TanStack Query

Dieses Tutorial führt Sie durch die Erstellung einer React-TypeScript-Anwendung mit Vite, der Integration der DHTMLX React Gantt-Komponente und der Verwaltung des Serverzustands mit TanStack Query. Ein kleines Zustand-Speicher-Setup (Zustand) kümmert sich um den lokalen UI-Zustand – Undo/Redo-Historie und Zoom-Konfiguration.

Der Fokus dieses Tutorials liegt auf der **Client-seitigen Integration**: wie TanStack Query Daten abruft, wie Mutationen an den Gantt-`data.save`-Callback gebunden werden und wie der Abfrage-Cache als einzige Quelle der Wahrheit für die Gantt-Daten genutzt wird. Das im Demo enthaltene Backend ist absichtlich minimal – es verwendet eine lokale JSON-Datei als Speicherung statt einer echten Datenbank. Das genügt, um eine lauffähige REST-API zu demonstrieren, ohne eine irrelevante Infrastruktur hinzuzufügen. In einer Produktionsanwendung würden Sie sie durch jede von Ihnen bevorzugte persistente Speichermlösung ersetzen.

## Voraussetzungen

- Grundkenntnisse in React, TypeScript, Vite und TanStack Query
- Empfohlen: lesen Sie [](integrations/react/state/state-management-basics.md), um den Bindungsmodus der Datenbindung und den `data.save`-Callback kennenzulernen, auf dem dieses Tutorial aufbaut.

## Schnelleinrichtung – Projekt erstellen

Bevor Sie beginnen, installieren Sie [Node.js](https://nodejs.org/en/).

Erstellen Sie ein Vite React + TypeScript-Projekt:

```bash
npm create vite@latest react-gantt-tanstack-query-demo -- --template react-ts
cd react-gantt-tanstack-query-demo
```

Nun installieren wir die benötigten Abhängigkeiten.

- Für **npm**:

```bash
npm install @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

- Für **yarn**:

```bash
yarn add @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

Wir benötigen außerdem einige Dev-Abhängigkeiten, um den Express-Backend-Server mit TypeScript auszuführen:

- Für **npm**:

```bash
npm install -D tsx nodemon @types/express @types/node
```

- Für **yarn**:

```bash
yarn add -D tsx nodemon @types/express @types/node
```

Dann müssen wir das React Gantt-Paket installieren.

### React Gantt installieren

Installieren Sie React Gantt wie im [React Gantt-Installationsleitfaden](integrations/react/installation.md) beschrieben.

In diesem Tutorial verwenden wir das Evaluierungspaket:

```bash
npm install @dhtmlx/trial-react-gantt
```

oder

```bash
yarn add @dhtmlx/trial-react-gantt
```

Wenn Sie bereits das Professional-Paket verwenden, ersetzen Sie `@dhtmlx/trial-react-gantt` in den Befehlen und Importen durch `@dhx/react-gantt`.

Fügen Sie die folgenden Skripte zu `package.json` hinzu, damit Backend und Frontend separat gestartet werden können:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

:::note
Damit Gantt den gesamten Platz des Bodys einnimmt, müssen Sie die Standardstile aus den Dateien `App.css` und `index.css` entfernen, die sich im Ordner `src` befinden, und die folgende Regel in der Datei `index.css` hinzufügen:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
```

:::

## Bereitstellung von Beispiel-Daten und Konfiguration

Erstellen Sie `src/seed/Seed.ts` mit der Gantt-Zoom-Konfiguration:

```ts
import type { GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] },
  ],
};
```

Erstellen Sie außerdem `src/seed/data.json` mit den anfänglichen Aufgaben und Verbindungen, die der Backend-Server bereitstellt:

```json
{
  "tasks": [
    {
      "id": 1,
      "text": "Office itinerancy",
      "type": "project",
      "start_date": "2025-04-02T00:00:00.000Z",
      "duration": 17,
      "progress": 0.4,
      "parent": 0,
      "open": true
    },
    {
      "id": 2,
      "text": "Office facing",
      "type": "project",
      "start_date": "2025-04-02T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 1,
      "open": true
    },
    {
      "id": 3,
      "text": "Furniture installation",
      "type": "project",
      "start_date": "2025-04-11T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 1,
      "open": true
    },
    {
      "id": 4,
      "text": "The employee relocation",
      "type": "project",
      "start_date": "2025-04-13T00:00:00.000Z",
      "duration": 5,
      "progress": 0.5,
      "parent": 1,
      "open": true
    },
    {
      "id": 5,
      "text": "Interior office",
      "type": "task",
      "start_date": "2025-04-03T00:00:00.000Z",
      "duration": 7,
      "progress": 0.6,
      "parent": 2
    },
    {
      "id": 6,
      "text": "Air conditioners check",
      "type": "task",
      "start_date": "2025-04-03T00:00:00.000Z",
      "duration": 7,
      "progress": 0.6,
      "parent": 2
    },
    {
      "id": 7,
      "text": "Workplaces preparation",
      "type": "task",
      "start_date": "2025-04-12T00:00:00.000Z",
      "duration": 8,
      "progress": 0.6,
      "parent": 3
    },
    {
      "id": 8,
      "text": "Preparing workplaces",
      "type": "task",
      "start_date": "2025-04-14T00:00:00.000Z",
      "duration": 5,
      "progress": 0.5,
      "parent": 4
    },
    {
      "id": 9,
      "text": "Workplaces importation",
      "type": "task",
      "start_date": "2025-04-21T00:00:00.000Z",
      "duration": 4,
      "progress": 0.5,
      "parent": 4
    },
    {
      "id": 10,
      "text": "Workplaces exportation",
      "type": "task",
      "start_date": "2025-04-27T00:00:00.000Z",
      "duration": 3,
      "progress": 0.5,
      "parent": 4
    }
  ],
  "links": [
    { "id": 2, "source": 2, "target": 3, "type": "0" },
    { "id": 3, "source": 3, "target": 4, "type": "0" },
    { "id": 7, "source": 8, "target": 9, "type": "0" }
  ]
}
```

## Aufbau des Backend-Servers

:::note
Der unten gezeigte Server ist eine Demo-Erleichterung, kein Produktions-Empfehlung. Er speichert alle Daten in einer einzigen JSON-Datei, damit Sie das gesamte Tutorial ohne das Einrichten einer Datenbank ausführen können. Ersetzen Sie ihn durch eine echte Persistenzschicht – PostgreSQL, MongoDB, eine Cloud-API usw. – wenn Sie eine Produktionsanwendung bauen. Die client-seitige TanStack Query-Integration bleibt unabhängig davon gleich, welches Backend verwendet wird.
:::

Erstellen Sie `src/server.ts`. Dies ist ein leichter Express-Server, der eine JSON-Datei liest und schreibt, um eine echte REST-API zu simulieren:

```ts
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SEED_PATH = join(__dirname, 'seed', 'data.json');
const DB_PATH = join(os.tmpdir(), 'gantt-tanstack-demo-db.json');
const PORT = 3001;

// Kopieren der Seed-Daten an einen Laufzeitort beim Start, damit der Seed sauber bleibt
if (!fs.existsSync(DB_PATH)) {
  fs.copyFileSync(SEED_PATH, DB_PATH);
}

interface Task {
  id: string | number;
  [key: string]: unknown;
}
interface Link {
  id: string | number;
  [key: string]: unknown;
}
interface DB {
  tasks: Task[];
  links: Link[];
}

const readDB = (): DB => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data: DB) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

app.get('/data', (_req, res) => {
  res.json(readDB());
});

app.post('/tasks', (req, res) => {
  const db = readDB();
  const task = req.body as Task;
  const newTask = { ...task, id: `DB_ID:${task.id}` };
  db.tasks.push(newTask);
  writeDB(db);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.map((t) => (String(t.id) === req.params.id ? { ...t, ...req.body } : t));
  writeDB(db);
  res.sendStatus(200);
});

app.delete('/tasks/:id', (req, res) => {
  const db = readDB();
  db.tasks = db.tasks.filter((t) => String(t.id) !== req.params.id);
  writeDB(db);
  res.sendStatus(200);
});

app.post('/links', (req, res) => {
  const db = readDB();
  const link = req.body as Link;
  const newLink = { ...link, id: `DB_ID:${link.id}` };
  db.links.push(newLink);
  writeDB(db);
  res.json(newLink);
});

app.put('/links/:id', (req, res) => {
  const db = readDB();
  db.links = db.links.map((l) => (String(l.id) === req.params.id ? { ...l, ...req.body } : l));
  writeDB(db);
  res.sendStatus(200);
});

app.delete('/links/:id', (req, res) => {
  const db = readDB();
  db.links = db.links.filter((l) => String(l.id) !== req.params.id);
  writeDB(db);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

Die Server-Endpunkte sehen so aus:

| Methode | Pfad         | Aktion                                 |
| ------ | ------------ | -------------------------------------- |
| GET    | `/data`      | Gibt alle Tasks und Links zurück          |
| POST   | `/tasks`     | Erzeugt eine Aufgabe, weist eine stabile DB-ID zu |
| PUT    | `/tasks/:id` | Aktualisiert eine Aufgabe                |
| DELETE | `/tasks/:id` | Löscht eine Aufgabe                    |
| POST   | `/links`     | Erzeugt einen Link, weist eine stabile DB-ID zu |
| PUT    | `/links/:id` | Aktualisiert einen Link                |
| DELETE | `/links/:id` | Löscht einen Link                       |

Wenn eine Aufgabe oder ein Link erstellt wird, fügt der Server dem client-seitig generierten Id den Präfix `DB_ID:` hinzu und gibt den neuen Datensatz zurück. Die Gantt-Komponente verwendet diese Rückgabe-ID, um ihre interne Referenz zu aktualisieren.

## Die API-Ebene erstellen

Erstellen Sie `src/api.ts` mit einfachen `fetch`-basierte Funktionen, die TanStack Query aufruft:

```ts
import { type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';

const BASE = window.location.origin;

async function request(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`${options?.method ?? 'GET'} ${url} failed: ${res.status}`);
  }
  return res;
}

export const fetchData = async () => {
  const res = await request(`${BASE}/data`);
  return await res.json();
};

export const createTask = async (task: SerializedTask) => {
  const res = await request(`${BASE}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const updateTask = async (task: SerializedTask) => {
  await request(`${BASE}/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteTask = async (id: string | number) => {
  await request(`${BASE}/tasks/${id}`, { method: 'DELETE' });
};

export const createLink = async (link: Link) => {
  const res = await request(`${BASE}/links`, {
    method: 'POST',
    body: JSON.stringify(link),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const updateLink = async (link: Link) => {
  await request(`${BASE}/links/${link.id}`, {
    method: 'PUT',
    body: JSON.stringify(link),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const deleteLink = async (id: string | number) => {
  await request(`${BASE}/links/${id}`, { method: 'DELETE' });
};
```

Jede Funktion wirft bei einer Nicht-2xx-Antwort, damit TanStack Query den Fehler abfangen und dessen `onError`-Handler auslösen kann.

## Aufbau der Control Toolbar-Komponente

Fügen Sie eine **Toolbar**-Komponente in `src/components/Toolbar.tsx` hinzu:

```tsx
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Button from '@mui/material/Button';
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onZoom?: (level: ZoomLevel) => void;
  currentZoom?: ZoomLevel;
}

export default function Toolbar({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onZoom,
  currentZoom = 'month',
}: ToolbarProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'start', padding: '0px 0px 20px', gap: '10px' }}>
      <ButtonGroup>
        <Button onClick={() => onUndo?.()} disabled={!canUndo}>
          <UndoIcon />
        </Button>
        <Button onClick={() => onRedo?.()} disabled={!canRedo}>
          <RedoIcon />
        </Button>
      </ButtonGroup>
      <Divider orientation="vertical"></Divider>
      <ButtonGroup>
        <Button onClick={() => onZoom?.('day')} variant={currentZoom === 'day' ? 'contained' : 'outlined'}>
          Tag
        </Button>
        <Button onClick={() => onZoom?.('month')} variant={currentZoom === 'month' ? 'contained' : 'outlined'}>
          Monat
        </Button>
        <Button onClick={() => onZoom?.('year')} variant={currentZoom === 'year' ? 'contained' : 'outlined'}>
          Jahr
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

Der Toolbar akzeptiert diese Props:

- `canUndo` / `canRedo` – boolsche Flags, die die Undo-/Redo-Schaltflächen basierend auf der Länge des Verlaufsstapels aktivieren bzw. deaktivieren.
- `onUndo` / `onRedo` – Callback-Funktionen, die die Undo/Redo-Logik in der Elternkomponente auslösen.
- `onZoom` – ein Callback, das den Zoom-Level aktualisiert, wenn Benutzer einen Zoom-Button klicken.
- `currentZoom` – gibt den aktiven Zoom-Level an, damit der entsprechende Button als `contained` erscheint.

## TanStack Query in main.tsx einbinden

Um die Anwendung mit dem `QueryClientProvider` zu umschließen, sodass jede Komponente Zugriff auf den TanStack Query-Client hat:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
```

`QueryClient` wird einmal außerhalb des Renderbaums erstellt, um zu verhindern, dass er bei jedem Rendern neu erzeugt wird.

## Die Haupt-Gantt-Komponente erstellen

Erstellen Sie `src/components/GanttComponent.tsx`. Hier treiben TanStack Query alle Datenoperationen.

### Importe und erste Einrichtung

```tsx
import { useMemo, useRef, useCallback } from 'react';
import ReactGantt, {
  type ReactGanttProps,
  type Link,
  type ReactGanttRef,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { fetchData, createTask, updateTask, deleteTask, createLink, updateLink, deleteLink } from '../api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Snapshot, useGanttStore } from '../store';
import { type ZoomLevel } from '../seed/Seed';
```

### Daten mit useQuery abrufen

```tsx
export default function DemoTanstackQuery() {
  const ganttRef = useRef<ReactGanttRef>(null);
  const queryClient = useQueryClient();

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery<{ tasks: SerializedTask[]; links: Link[] }>({ queryKey: ['data'], queryFn: fetchData });

  const { tasks, links } = fetchedData || { tasks: [], links: [] };
```

`useQuery` ruft alle Tasks und Links vom Server ab, wenn die Komponente gemountet wird. Das Ergebnis wird im TanStack Query-Cache unter dem Schlüssel `['data']` gespeichert.

- `isLoading` – Wahr, während der initiale Fetch läuft.
- `isError` / `error` – Wird befüllt, wenn der Fetch fehlschlägt.
- Fallback-Option zu leeren Arrays (`fetchedData || { tasks: [], links: [] }`) sorgt dafür, dass Gantt gültige Props erhält, selbst bevor die erste Antwort eintrifft.

### Zustandzustand lesen

```tsx
const { undo, redo, setZoom, config, recordHistory, past, future } = useGanttStore();
```

Nur UI-bezogene Zustandsinformationen kommen von Zustand – Zoom-Konfiguration und Undo/Redo-Historienstapel. Tasks und Links liegen im TanStack Query-Cache, nicht in Zustand.

### Einen Snapshot-Helfer erstellen

```tsx
const makeSnapshot = useCallback(
  (): Snapshot => ({
    tasks: structuredClone(tasks),
    links: structuredClone(links),
    config: structuredClone(config),
  }),
  [tasks, links, config],
);
```

`makeSnapshot` erfasst eine tiefe Kopie der aktuellen Aufgaben, Links und der Konfiguration als einzelnes `Snapshot`-Objekt. Es wird vor jeder Mutation aufgerufen, damit der vorherige Zustand durch Undo wiederhergestellt werden kann.

### Mutationen definieren

Jede CRUD-Operation ist in einem `useMutation`-Hook eingeschlossen. Alle sechs Mutationen teilen sich dieselben drei Lifecycle-Hooks:

```tsx
const onError = useCallback((err: Error) => {
  console.error('Mutation failed:', err.message);
}, []);

const createTaskMutation = useMutation({
  mutationFn: createTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const updateTaskMutation = useMutation({
  mutationFn: updateTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const deleteTaskMutation = useMutation({
  mutationFn: deleteTask,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const createLinkMutation = useMutation({
  mutationFn: createLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const updateLinkMutation = useMutation({
  mutationFn: updateLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});

const deleteLinkMutation = useMutation({
  mutationFn: deleteLink,
  onMutate: () => {
    recordHistory(makeSnapshot());
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['data'] }),
  onError,
});
```

- **`onMutate`** – Wird synchron, bevor der API-Aufruf erfolgt. Wir speichern hier einen Snapshot, damit der Undo-Stack den Zustand direkt vor der Änderung erfasst.
- **`onSuccess`** – Ruft `queryClient.invalidateQueries` auf, wodurch der `['data']`-Cache als veraltet markiert wird und eine Hintergrund-Neuladung ausgelöst wird. Die Gantt-Komponente rendert nach Abschluss des Neuladens erneut mit der frischen Server-Antwort.
- **`onError`** – protokolliert das Scheitern. Sie können dies erweitern, um eine Benachrichtigung anzuzeigen oder optimistic updates zurückzunehmen.

### Mutationen über `data.save` mit dem Gantt verbinden

```tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  [],
);

const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, payload, id) => {
      if (entity === 'task') {
        const task = payload as SerializedTask;
        if (action === 'create') return createTaskMutation.mutate(task);
        else if (action === 'update') updateTaskMutation.mutate(task);
        else if (action === 'delete') deleteTaskMutation.mutate(id);
      } else if (entity === 'link') {
        const link = payload as Link;
        if (action === 'create') return createLinkMutation.mutate(link);
        else if (action === 'update') updateLinkMutation.mutate(link);
        else if (action === 'delete') deleteLinkMutation.mutate(id);
      }
    },
  }),
  [
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
  ],
);
```

:::note
Seit v9.1.3 erkennt Gantt automatisch ISO-Datumstrings und die `templates`-Überschreibungen sind nicht mehr nötig. Sie werden hier aus Abwärtskompatibilitätsgründen gezeigt. Siehe [Laden von Datumsangaben im ISO-Format](guides/loading.md#loading-dates-in-iso-format).
:::

Der `data.save`-Callback ist die Brücke zwischen dem Gantt-Diagramm und TanStack Query. Wenn der Benutzer eine Aufgabe zieht, Text bearbeitet, einen Link erstellt oder eine andere Änderung vornimmt:

1. Ruft Gantt `data.save` mit dem Entity-Typ (`task` oder `link`), der Aktion (`create`, `update` oder `delete`), dem vollständigen Payload des Elements und seiner ID auf.
2. Leiten wir das an die entsprechende Mutation weiter.
3. Die Mutation ruft die API-Funktion auf und invalidiert bei Erfolg den Cache.

Wenn Sie eine ausführlichere Erklärung dieses Callbacks benötigen, lesen Sie [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) im Basics-Guide.

### Undo-,Redo- und Zoom-Handler

```tsx
const handleUndo = () => {
  const snapshot = undo(makeSnapshot());
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
  }
};

const handleRedo = () => {
  const snapshot = redo(makeSnapshot());
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
  }
};

const handleZoom = (level: ZoomLevel) => {
  recordHistory(makeSnapshot());
  setZoom(level);
};
```

- `handleUndo` gibt den aktuellen Snapshot an die Zustand-`undo`-Aktion weiter (damit er auf den `future`-Stack geschoben werden kann) und erhält den vorherigen Snapshot zurück. Anschließend wird dieser Snapshot direkt in den TanStack Query-Cache mit `setQueryData` geschrieben. React rendert die Gantt-Komponente mit den wiederhergestellten Daten sofort neu – ohne Server-Rundreise.
- `handleRedo` funktioniert in umgekehrter Richtung.
- `handleZoom` nimmt zuerst einen Verlauf-Snapshot auf, anschliessend wird die Zustand-`setZoom`-Aktion aufgerufen, um `config.zoom` zu aktualisieren.

Dieses Muster hält Undo/Redo schnell und offline, da es vollständig im Client-Cache operiert.

### Rendering

```tsx
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Lade Projektdaten...</div>;
  }

  if (isError) {
    return <div style={{ padding: '20px', color: 'red' }}>Fehler beim Laden der Daten: {error?.message}</div>;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>
      <Toolbar
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        currentZoom={config.zoom.current}
        onZoom={handleZoom}
      />
      <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />
    </div>
  );
}
```

- Lade- und Fehlerzustände werden vor dem Rendern des Diagramms behandelt.
- `canUndo` und `canRedo` werden aus den Zustand-Historienstapeln abgeleitet, sodass die Schaltflächen in der Symbolleiste deaktiviert sind, wenn nichts undo- oder redo-bereit ist.
- `tasks` und `links` stammen immer aus dem TanStack Query-Cache; `config` stammt immer aus Zustand.

### App.tsx aktualisieren

Aktualisieren Sie `src/App.tsx`, um die Gantt-Komponente zu verwenden:

```tsx
import './App.css';
import GanttComponent from './components/GanttComponent';

function App() {
  return (
    <div style={{ height: '100dvh', width: '100dvw' }}>
      <GanttComponent />
    </div>
  );
}

export default App;
```

## Zustand Store einrichten

Zustand verwaltet ausschließlich lokalen UI-Zustand: Zoom-Konfiguration und Undo/Redo-Historienstapel. Tasks und Links gehören TanStack Query.

Erstellen Sie `src/store.ts`:

```ts
import { create } from 'zustand';
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';
import { defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export type Snapshot = {
  tasks: SerializedTask[];
  links: Link[];
  config: GanttConfig;
};

type State = {
  config: GanttConfig;

  past: Snapshot[];
  future: Snapshot[];
  maxHistory: number;

  recordHistory: (snapshot: Snapshot) => void;
  undo: (snapshot: Snapshot) => Snapshot | null;
  redo: (snapshot: Snapshot) => Snapshot | null;

  setZoom: (level: ZoomLevel) => void;
};

export const useGanttStore = create<State>((set, get) => ({
  config: { zoom: defaultZoomLevels },

  past: [],
  future: [],
  maxHistory: 50,

  recordHistory: (snapshot) => {
    const { past, maxHistory } = get();
    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  },

  undo: (snapshot: Snapshot) => {
    const { past, future } = get();
    if (!past.length) return null;

    const previous = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      future: [{ ...snapshot }, ...future],
      config: previous.config,
    });

    return previous;
  },

  redo: (snapshot: Snapshot) => {
    const { past, future } = get();
    if (!future.length) return null;

    const next = future[0];
    set({
      past: [...past, { ...snapshot }],
      future: future.slice(1),
      config: next.config,
    });

    return next;
  },

  setZoom: (level) => {
    set({
      config: {
        ...get().config,
        zoom: { ...get().config.zoom, current: level },
      },
    });
  },
}));
```

### Wofür der Store zuständig ist

- **`config`** – Gantt-Zoom-Konfiguration, wird direkt an das `<ReactGantt>`-`config`-Prop weitergereicht.
- **`past` / `future`** – Snapshot-Stapel für Undo und Redo. Jeder Snapshot enthält `tasks`, `links` und `config`, sodass eine vollständige Rücksetzung alles auf einmal wiederherstellt.
- **`maxHistory`** – Beschränkt die Historie auf die letzten 50 Snapshots.

### Warum Undo/Redo einen Snapshot-Parameter akzeptieren

Im reinen Zustandstutorial besitzt der Store Tasks und Links, sodass `undo()` einfach den vorherigen Snapshot austauschen kann. Hier liegen Tasks und Links im TanStack Query-Cache. Um den Store von TanStack Query zu entkoppeln, erhält jeder Undo-/Redo-Aufruf:

1. den aktuellen Snapshot als Argument (damit der Store ihn auf den gegenüberliegenden Stapel schieben kann, ohne von TanStack Query zu wissen),
2. den Ziel-Snapshot zurück, sodass die Komponente ihn mit `queryClient.setQueryData` in den Cache schreiben kann.

Diese klare Trennung bedeutet, dass Zustand nur das History-Tracking verwaltet, während TanStack Query nach wie vor die einzige Quelle der Wahrheit für Serverdaten bleibt.

## Anwendung ausführen

Starten Sie den Express-Backend-Server in einem Terminal:

```bash
npm run start:server
```

oder:

```bash
yarn start:server
```

Starten Sie anschließend den Vite-Entwicklungsserver in einem weiteren Terminal:

```bash
npm run dev
```

oder:

```bash
yarn dev
```

Öffnen Sie http://localhost:3000. Die Gantt-Diagramm lädt Daten aus dem Backend, und jede Änderung wird automatisch auf dem Server persistiert.

## Zusammenfassung

In diesem Tutorial haben Sie:

- ein Vite + React + TypeScript-Projekt mit TanStack Query und Zustand eingerichtet
- ein Express REST-Backend erstellt, das Tasks und Links als JSON bereitstellt und persistiert
- `useQuery` verwendet, um alle Gantt-Daten beim Laden vom Server abzurufen
- sechs `useMutation`-Hooks definiert – je einer pro CRUD-Operation – und sie an den `data.save`-Callback gebunden
- ein snapshot-basiertes Undo/Redo implementiert, indem die Historie in Zustand gespeichert und Snapshots in den TanStack Query-Cache über `queryClient.setQueryData` wiederhergestellt wird

Dies hält die Gantt-Komponente vollständig deklarativ: Der Serverzustand gehört TanStack Query, der UI-Zustand gehört Zustand, und der `data.save`-Callback verbindet Benutzerinteraktionen mit Mutationen, ohne dass die Komponente etwas über Persistenz-Logik wissen muss.

## GitHub-Demo-Repository

Ein vollständiges funktionsfähiges Projekt, das dieses Tutorial verfolgt, finden Sie auf GitHub: [GitHub-Demo-Repository](https://github.com/dhtmlx/react-gantt-tanstack-query-starter).

## Was kommt als Nächstes

Um weiterzugehen:

- Die Konzepte hinter diesem Beispiel erneut betrachten: [](integrations/react/state/state-management-basics.md)
- Store-gesteuerten Zustand mit fortgeschrittener Konfiguration und Templates im [React Gantt-Überblick](integrations/react/overview.md) kombinieren
- Dasselbe Muster mit anderen Zustandsmanagern erkunden:
  - [Verwendung von React Gantt mit Zustand](integrations/react/state/zustand.md)
  - [Verwendung von React Gantt mit Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Verwendung von React Gantt mit MobX](integrations/react/state/mobx.md)
  - [Verwendung von React Gantt mit XState](integrations/react/state/xstate.md)
  - [Verwendung von React Gantt mit Jotai](integrations/react/state/jotai.md)
  - [Verwendung von React Gantt mit Valtio](integrations/react/state/valtio.md)