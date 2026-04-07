---
title: Using React Gantt with TanStack Query
sidebar_label: TanStack Query
description: 'Learn how to manage Gantt server state with TanStack Query, wire mutations to the data.save callback, and combine it with a lightweight Zustand store for undo/redo history and UI configuration.'
---

# React Gantt - TanStack Query Tutorial

This tutorial will guide you through creating a React TypeScript application with Vite, integrating the DHTMLX React Gantt component, and managing server state with TanStack Query. A small Zustand store handles local UI state - undo/redo history and zoom configuration.

The focus of this tutorial is the **client-side integration**: how TanStack Query fetches data, how mutations wire up to the Gantt's `data.save` callback, and how the query cache is used as the single source of truth for Gantt data. The backend included in the demo is intentionally minimal - it uses a local JSON file as storage instead of a real database. This is enough to demonstrate a working REST API without adding unrelated infrastructure. In a production application you would replace it with any persistent storage solution of your choice.

## Prerequisites

- Basic knowledge of React, TypeScript, Vite, and TanStack Query
- Recommended: read [](integrations/react/state/state-management-basics.md) to understand the data binding mode and the `data.save` callback this tutorial builds on.

## Quick setup - create the project

Before you start, install [Node.js](https://nodejs.org/en/).

Create a Vite React + TypeScript project:

```bash
npm create vite@latest react-gantt-tanstack-query-demo -- --template react-ts
cd react-gantt-tanstack-query-demo
```

Now let's install the required dependencies.

- For **npm**:

```bash
npm install @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

- For **yarn**:

```bash
yarn add @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

We also need a few dev dependencies to run the Express backend server with TypeScript:

- For **npm**:

```bash
npm install -D tsx nodemon @types/express @types/node
```

- For **yarn**:

```bash
yarn add -D tsx nodemon @types/express @types/node
```

Then we need to install the React Gantt package.

### Installing React Gantt

Install React Gantt as described in the [React Gantt installation guide](integrations/react/installation.md).

In this tutorial we use the evaluation package:

```bash
npm install @dhtmlx/trial-react-gantt
```

or

```bash
yarn add @dhtmlx/trial-react-gantt
```

If you already use the Professional package, replace `@dhtmlx/trial-react-gantt` with `@dhx/react-gantt` in the commands and imports.

Add the following scripts to `package.json` so you can start the backend and frontend separately:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

:::note
To make Gantt occupy the entire space of the body, you need to remove the default styles from the `App.css` and `index.css` files located in the `src` folder and add the following one in the `index.css` file:

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

## Setting Up Sample Data and Configuration

Create `src/seed/Seed.ts` with the Gantt zoom configuration:

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

Also create `src/seed/data.json` with the initial tasks and links that the backend will serve:

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

## Building the Backend Server

:::note
The server below is a demo convenience, not a production recommendation. It stores all data in a single JSON file so you can run the full tutorial without setting up a database. Replace it with any real persistence layer - PostgreSQL, MongoDB, a cloud API, etc. - when building a production application. The client-side TanStack Query integration remains the same regardless of what the backend uses.
:::

Create `src/server.ts`. This is a lightweight Express server that reads and writes a JSON file to simulate a real REST API:

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

// Copy seed data to a runtime location on startup so the seed stays pristine
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

The server exposes these endpoints:

| Method | Path         | Action                                 |
| ------ | ------------ | -------------------------------------- |
| GET    | `/data`      | Returns all tasks and links            |
| POST   | `/tasks`     | Creates a task, assigns a stable DB id |
| PUT    | `/tasks/:id` | Updates a task                         |
| DELETE | `/tasks/:id` | Deletes a task                         |
| POST   | `/links`     | Creates a link, assigns a stable DB id |
| PUT    | `/links/:id` | Updates a link                         |
| DELETE | `/links/:id` | Deletes a link                         |

When a task or link is created, the server prefixes the client-generated id with `DB_ID:` and returns the new record. The Gantt component uses the returned id to update its internal reference.

## Creating the API Layer

Create `src/api.ts` with plain `fetch`-based functions that TanStack Query will call:

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

Each function throws on a non-2xx response so TanStack Query can catch the error and trigger its `onError` handler.

## Building the Control Toolbar Component

Add a **Toolbar** component in `src/components/Toolbar.tsx`:

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
          Day
        </Button>
        <Button onClick={() => onZoom?.('month')} variant={currentZoom === 'month' ? 'contained' : 'outlined'}>
          Month
        </Button>
        <Button onClick={() => onZoom?.('year')} variant={currentZoom === 'year' ? 'contained' : 'outlined'}>
          Year
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

The toolbar accepts these props:

- `canUndo` / `canRedo` - boolean flags that enable or disable the undo/redo buttons based on the history stack length.
- `onUndo` / `onRedo` - callbacks that trigger undo/redo logic in the parent component.
- `onZoom` - a callback that updates the zoom level when users click a zoom button.
- `currentZoom` - indicates the active zoom level so the correct button appears `contained`.

## Setting Up TanStack Query in main.tsx

Wrap the application with `QueryClientProvider` so every component can access the TanStack Query client:

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

`QueryClient` is created once outside the render tree to prevent it from being recreated on every render.

## Creating the Main Gantt Component

Create `src/components/GanttComponent.tsx`. This is where TanStack Query drives all data operations.

### Imports and initial setup

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

### Fetching data with useQuery

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

`useQuery` fetches all tasks and links from the server when the component mounts. The result is stored in the TanStack Query cache under the `['data']` key.

- `isLoading` - true while the initial fetch is in progress.
- `isError` / `error` - populated if the fetch fails.
- Fallback to empty arrays (`fetchedData || { tasks: [], links: [] }`) ensures Gantt receives valid props even before the first response arrives.

### Reading Zustand state

```tsx
const { undo, redo, setZoom, config, recordHistory, past, future } = useGanttStore();
```

Only UI-related state comes from Zustand - zoom configuration and the undo/redo history stacks. Tasks and links live in the TanStack Query cache, not in Zustand.

### Creating a snapshot helper

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

`makeSnapshot` captures a deep copy of the current tasks, links, and config as a single `Snapshot` object. It is called before every mutation so the previous state can be restored by undo.

### Defining mutations

Each CRUD operation is wrapped in a `useMutation` hook. All six mutations share the same three lifecycle hooks:

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

- **`onMutate`** - fires synchronously before the API call. We record a snapshot here so the undo stack captures the state immediately before the change.
- **`onSuccess`** - calls `queryClient.invalidateQueries` which marks the `['data']` cache as stale and triggers a background refetch. The Gantt re-renders with the fresh server response once the refetch completes.
- **`onError`** - logs the failure. You can extend this to show a notification or roll back optimistic updates.

### Connecting mutations to the Gantt via data.save

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
Since v9.1.3, Gantt automatically detects ISO date strings and the `templates` overrides are no longer needed. They are shown here for compatibility with earlier Gantt versions. See [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

The `data.save` callback is the bridge between the Gantt chart and TanStack Query. Whenever the user drags a task, edits text, creates a link, or performs any other change:

1. The Gantt calls `data.save` with the entity type (`task` or `link`), the action (`create`, `update`, or `delete`), the full item payload, and its id.
2. We route that to the appropriate mutation.
3. The mutation calls the API function and, on success, invalidates the cache.

If you need a deeper explanation of this callback, see [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave) in the Basics guide.

### Undo, redo and zoom handlers

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

- `handleUndo` passes the current snapshot to the Zustand `undo` action (so it can push it onto `future`) and receives the previous snapshot in return. It then writes that snapshot directly into the TanStack Query cache with `setQueryData`. React re-renders the Gantt with the restored data immediately - no server round-trip needed.
- `handleRedo` works the same way in reverse.
- `handleZoom` records a history snapshot first, then calls the Zustand `setZoom` action to update `config.zoom`.

This pattern keeps undo/redo fast and offline since it operates entirely on the client-side cache.

### Rendering

```tsx
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading project data...</div>;
  }

  if (isError) {
    return <div style={{ padding: '20px', color: 'red' }}>Failed to load data: {error?.message}</div>;
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

- Loading and error states are handled before the chart renders.
- `canUndo` and `canRedo` are derived from the Zustand history stacks so the toolbar buttons are disabled when there is nothing to undo or redo.
- `tasks` and `links` always come from the TanStack Query cache; `config` always comes from Zustand.

### Update App.tsx

Update `src/App.tsx` to use the Gantt component:

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

## Setting Up the Zustand Store

Zustand manages only local UI state: zoom configuration and the undo/redo history stacks. Tasks and links are owned by TanStack Query.

Create `src/store.ts`:

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

### What the store manages

- **`config`** - Gantt zoom configuration passed directly to the `<ReactGantt>` `config` prop.
- **`past` / `future`** - snapshot stacks for undo and redo. Each snapshot includes `tasks`, `links`, and `config` so a full rollback restores everything at once.
- **`maxHistory`** - limits the history to the last 50 snapshots.

### Why undo and redo accept a snapshot parameter

In the pure-Zustand tutorial the store owns tasks and links, so `undo()` can just swap the previous snapshot in. Here, tasks and links live in the TanStack Query cache. To keep the store decoupled from TanStack Query, each undo/redo call:

1. Receives the **current** snapshot from the component as an argument (so the store can push it onto the opposite stack without knowing about TanStack Query).
2. Returns the **target** snapshot so the component can write it into the cache with `queryClient.setQueryData`.

This clear separation means Zustand manages history bookkeeping only, while TanStack Query remains the single source of truth for server data.

## Run the application

Start the Express backend in one terminal:

```bash
npm run start:server
```

or:

```bash
yarn start:server
```

Then start the Vite dev server in another terminal:

```bash
npm run dev
```

or:

```bash
yarn dev
```

Open `http://localhost:3000`. The Gantt chart loads data from the backend, and every change you make is persisted to the server automatically.

## Summary

In this tutorial you've:

- set up a Vite + React + TypeScript project with TanStack Query and Zustand
- created an Express REST backend that serves and persists tasks and links as JSON
- used `useQuery` to fetch all Gantt data from the server on load
- defined six `useMutation` hooks - one per CRUD operation - and wired them to the `data.save` callback
- implemented snapshot-based undo/redo by storing history in Zustand and restoring snapshots into the TanStack Query cache via `queryClient.setQueryData`

This keeps the Gantt component fully declarative: server state is owned by TanStack Query, UI state is owned by Zustand, and the `data.save` callback connects user interactions to mutations without the component knowing about any persistence logic.

## GitHub demo repository

A complete working project that follows this tutorial is [provided on GitHub](https://github.com/dhtmlx/react-gantt-tanstack-query-starter).

## What's next

To go further:

- Revisit the concepts behind this example in [](integrations/react/state/state-management-basics.md)
- Combine store-driven state with advanced configuration and templating in the [React Gantt overview](integrations/react/overview.md)
- Explore the same pattern with other state managers:
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)
