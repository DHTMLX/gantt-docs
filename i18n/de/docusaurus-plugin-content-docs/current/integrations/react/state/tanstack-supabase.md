---
title: React Gantt mit TanStack Query + Supabase
sidebar_label: TanStack Query + Supabase
description: 'Erfahren Sie, wie Sie eine echte Echtzeit-Synchronisation mehrerer Benutzer zu einem React Gantt hinzufügen, das von TanStack Query angetrieben wird. Dieser Leitfaden behandelt Supabase Realtime-Abonnements, das Deduplication-Muster für Pending-Operations, batchSave für effizientes CRUD, server-seitige sortorder-Verwaltung und persistenzbewusstes Undo/Redo.'
---

# React Gantt - Tutorial zu TanStack Query + Supabase

Dieses Tutorial erweitert [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md), indem das lokale JSON-Backend durch **Supabase** (PostgreSQL + Realtime) ersetzt wird und eine Live-Multiplayer-Synchronisation hinzufügt wird. Wenn ein Benutzer eine Aufgabe erstellt, bearbeitet oder löscht, wird die Änderung sofort in jedem anderen geöffneten Tab widergespiegelt – eine Seitenaktualisierung ist nicht nötig.

Der Leitfaden konzentriert sich darauf, was neu und anders ist im Vergleich zum Basis-Tutorial zu TanStack Query:

- Supabase-Datenbankeinrichtung
- Realtime-Abonnements
- `batchSave` statt `save` zur Gruppierung von Mutationen
- Serverseitige `sortorder`-Verwaltung für eine persistente Aufgabenreihenfolge
- XSS-Sanitisierung auf dem Backend
- Persistenzbewusstes Undo/Redo via `applySnapshotDiff`

Wenn Sie mit der Basiskonfiguration (Vite + React + TypeScript, TanStack Query, Zustand, grundlegende CRUD-Mutationen, Snapshot-basiertes Undo/Redo) nicht vertraut sind, lesen Sie zuerst das [TanStack Query-Tutorial](integrations/react/state/tanstack-query.md).

## Voraussetzungen

- Abgeschlossen (oder gelesen) des [TanStack Query-Tutorials](integrations/react/state/tanstack-query.md)
- Ein [Supabase](https://supabase.com)-Projekt mit der Projekt-URL und dem anon Key
- Node.js 16+

## Projektsetup

```bash
npm create vite@latest react-gantt-tanstack-supabase-demo -- --template react-ts
cd react-gantt-tanstack-supabase-demo
```

Installieren Sie die Abhängigkeiten. Dieses Demo verwendet **shadcn/ui** (Tailwind-basiert) statt MUI:

```bash
npm install @tanstack/react-query zustand @supabase/supabase-js \
  express cors dotenv \
  tailwindcss @tailwindcss/vite lucide-react \
  radix-ui class-variance-authority clsx tailwind-merge
```

Dev-Abhängigkeiten:

```bash
npm install -D tsx nodemon @types/express @types/cors @types/node
```

Installieren Sie React Gantt:

```bash
npm install @dhtmlx/trial-react-gantt
```

Fügen Sie dem `package.json`-File Skripte hinzu:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

## Konfiguration der Supabase-Umgebungsvariablen

Erstellen Sie `.env` (basierend auf `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Das `VITE_`-Präfix macht Variablen dem Vite-Frontend-Bundle zugänglich. Die unpräfixierten Variablen werden vom Express-Backend zur Laufzeit mittels `dotenv` genutzt.

## Einrichten der Datenbank

Im Supabase **SQL Editor** führen Sie die Migration aus `setup.sql` aus:

```sql
-- Create a table for the tasks for Supabase
CREATE TABLE tasks (
    id varchar(255) NOT NULL,
    text TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    duration INT NOT NULL,
    type TEXT,
    progress FLOAT,
    parent varchar(255),
    sortorder INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (parent) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Create a table for the links for Supabase
CREATE TABLE links (
    id varchar(255) NOT NULL,
    source varchar(255) NOT NULL,
    target varchar(255) NOT NULL,
    type TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (source) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (target) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Clear existing data (optional)
DELETE FROM links;
DELETE FROM tasks;

-- Insert tasks
INSERT INTO tasks (id, text, start_date, end_date, duration, type, progress, parent, sortorder)
VALUES
  ('1', 'Project #1', '2026-04-01', '2026-04-10', 9, 'project', 0.4, NULL, 1),

  ('2', 'Task 1', '2026-04-01', '2026-04-03', 2, 'task', 0.6, '1', 2),
  ('3', 'Task 2', '2026-04-03', '2026-04-06', 3, 'task', 0.3, '1', 3),
  ('4', 'Task 3', '2026-04-06', '2026-04-10', 4, 'task', 0.1, '1', 4),

  ('5', 'Milestone', '2026-04-10', '2026-04-10', 0, 'milestone', 1, '1', 5);

-- Insert links (dependencies)
INSERT INTO links (id, source, target, type)
VALUES
  ('1', '2', '3', '0'),
  ('2', '3', '4', '0'),
  ('3', '4', '5', '0');
```

Kernpunkte des Designs:

- `sortorder` ist eine serververwaltete Ganzzahl, die die visuelle Ordnung beibehält, in der Aufgaben im Gantt-Gitter erscheinen.
- Sowohl `links.source` als auch `links.target` haben `ON DELETE CASCADE`, sodass das Löschen einer Aufgabe automatisch alle abhängigen Links entfernt.
- `tasks.parent` setzt ebenfalls verschachtelte Beziehungen fort, sodass das Löschen eines Elternteils alle Kinder löscht.

Supabase Realtime muss für beide Tabellen aktiviert sein. Im Supabase-Dashboard gehen Sie zu **Database → Replication** und fügen Sie die Tabellen `tasks` und `links` zur Replikationspublikation hinzu.

## Duale Supabase-Clients

Das Demo verwendet zwei separate Supabase-Client-Instanzen, weil Frontend und Backend in verschiedenen Umgebungen laufen.

`src/db/supabaseClient.ts` - Browser-Client, liest Umgebungsvariablen via `import.meta.env`:

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrlClient = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyClient = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrlClient || !supabaseAnonKeyClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrlClient, supabaseAnonKeyClient);
```

`src/db/supabaseServer.ts` - Server-seitiger Client, liest Umgebungsvariablen via `process.env` (geladen durch `dotenv`):

```ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrlServer = process.env.SUPABASE_URL;
const supabaseAnonKeyServer = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrlServer || !supabaseAnonKeyServer) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServer = createClient(supabaseUrlServer, supabaseAnonKeyServer);
```

`supabaseClient` wird ausschließlich für Realtime-Abonnements in `GanttComponent.tsx` verwendet. Alle Datenbank-Schreiboperationen erfolgen über `supabaseServer` in der Express-Schicht.

:::note
Dieses Starter-Projekt verwendet den **anon key** serverseitig, weil das Demo-Schema keine Row-Level Security-Richtlinien hat und es keine Authentifizierung gibt. In einer Produktion mit Auth und RLS sollte der Server den **service role key** (vom Frontend ferngehalten) besitzen, um vertrauenswürdige Operationen zu umgehen.
:::

## TypeScript-Typen

`src/types/types.ts` definiert die Zeilenformen der Datenbank und Service-Schnittstellen:

```ts
export interface TaskRow {
  id: string;
  text: string;
  start_date: string;
  end_date: string;
  duration: number;
  type?: string;
  progress?: number;
  parent: string | null;
  sortorder: number;
}

export interface LinkRow {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ITaskService {
  createTask(task: Omit<TaskRow, 'sortorder'>): Promise<TaskRow>;
  updateTask(id: string, fields: Partial<TaskRow>, target?: string): Promise<TaskRow>;
  deleteTask(id: string): Promise<TaskRow>;
}

export interface ILinkService {
  createLink(link: LinkRow): Promise<LinkRow>;
  updateLink(id: string, fields: Partial<LinkRow>): Promise<LinkRow>;
  deleteLink(id: string): Promise<LinkRow>;
}

export interface IGanttDataService {
  getData(): Promise<{ tasks: TaskRow[]; links: LinkRow[] }>;
}
```

`ITaskService.updateTask` akzeptiert einen optionalen Parameter `target`. Dies ist die Drop-Ziel-Aufgaben-ID, die von der Gantt gesendet wird, wenn der Benutzer Aufgaben per Drag-and-Drop neu ordnet, und die serverseitige Reorder-Logik auslöst.

## Aufbau der Backend-Services

### ganttDataService

`src/services/ganttDataService.ts` holt alle Aufgaben in der Sortierung nach `sortorder`:

```ts
import { supabaseServer } from '@/db/supabaseServer';
import type { IGanttDataService, LinkRow, TaskRow } from '@/types/types';

class GanttDataService implements IGanttDataService {
  async getData(): Promise<{ tasks: TaskRow[]; links: LinkRow[] }> {
    const { data: tasks, error: tasksError } = await supabaseServer
      .from('tasks')
      .select('*')
      .order('sortorder', { ascending: true });
    if (tasksError) throw tasksError;

    const { data: links, error: linksError } = await supabaseServer.from('links').select('*');
    if (linksError) throw linksError;

    const normalizedTasks = tasks.map((t) => ({ ...t, parent: t.parent ?? '0' }));
    return { tasks: normalizedTasks, links };
  }
}

const ganttDataService = new GanttDataService();
export default ganttDataService;
```

`parent` wird in der Datenbank für Aufgaben auf Root-Ebene als `NULL` gespeichert. Die Gantt erwartet für dieselbe Rolle den String `'0'`, daher normalisiert der Service den Wert beim Lesen.

### sanitize-Helfer

`src/services/sanitize.ts` HTML-escapt Textfelder, bevor sie in die Datenbank gelangen:

```ts
const TEXT_FIELDS: string[] = ['text'];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitize<T extends object>(obj: T): T {
  const out = { ...obj } as Record<string, unknown>;
  for (const key of TEXT_FIELDS) {
    if (typeof out[key] === 'string') {
      out[key] = escapeHtml(out[key] as string);
    }
  }
  return out as T;
}
```

Jede Schreiboperation ruft `sanitize()` vor dem Einfügen oder Aktualisieren auf. Fügen Sie bei Bedarf Felder zu `TEXT_FIELDS` hinzu, sobald das Schema weitere bearbeitbare Texte enthält.

### taskService - Sortorder-Verwaltung

`src/services/taskService.ts` ist der komplexeste Service, weil er die persistente Aufgabenreihenfolge verwaltet.

```ts
import { supabaseServer } from '@/db/supabaseServer';
import { type TaskRow, type ITaskService } from '../types/types';
import { sanitize } from './sanitize';

class TaskService implements ITaskService {
  private normalizeParent<T extends { parent?: string | null }>(data: T): T {
    return { ...data, parent: data.parent === '0' ? null : data.parent };
  }

  async createTask(task: Omit<TaskRow, 'sortorder'>): Promise<TaskRow> {
    const cleanData = sanitize(this.normalizeParent(task));

    const { data: lastOrderIndex } = await supabaseServer
      .from('tasks')
      .select('sortorder')
      .order('sortorder', { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextOrder = (lastOrderIndex?.sortorder ?? 0) + 1;
    const { data, error } = await supabaseServer
      .from('tasks')
      .insert({ ...cleanData, sortorder: nextOrder })
      .select()
      .single();

    if (error) throw error;
    return { ...data, parent: data.parent ?? '0' };
  }

  async updateTask(id: string, fields: Partial<TaskRow>, target?: string): Promise<TaskRow> {
    const cleanData = sanitize(this.normalizeParent(fields));

    const { data, error } = await supabaseServer
      .from('tasks')
      .update(cleanData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (target) await this.reorder(id, target);
    return { ...data, parent: data.parent ?? '0' };
  }

  async deleteTask(id: string): Promise<TaskRow> {
    const { data, error } = await supabaseServer.from('tasks').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  private async reorder(taskId: string, target: string): Promise<void> {
    let nextTask = false;
    let targetId = target;

    if (targetId.startsWith('next:')) {
      targetId = targetId.slice('next:'.length);
      nextTask = true;
    }

    const { data: targetTask } = await supabaseServer
      .from('tasks')
      .select('sortorder')
      .eq('id', targetId)
      .single();

    if (!targetTask) return;

    let targetOrder = targetTask.sortorder;
    if (nextTask) targetOrder++;

    const { data: toShift } = await supabaseServer
      .from('tasks')
      .select('id, sortorder')
      .gte('sortorder', targetOrder)
      .neq('id', taskId)
      .order('sortorder', { ascending: false });

    for (const task of toShift ?? []) {
      await supabaseServer
        .from('tasks')
        .update({ sortorder: task.sortorder + 1 })
        .eq('id', task.id);
    }

    await supabaseServer.from('tasks').update({ sortorder: targetOrder }).eq('id', taskId);
  }
}

const taskService = new TaskService();
export default taskService;
```

Die `reorder`-Methode:

1. Liest die `sortorder` der Drop-Target-Aufgabe.
2. Falls der Ziel-String mit `next:` beginnt, soll die gedraggte Aufgabe direkt nach dem Ziel platziert werden, wodurch die Reihenfolge um eins erhöht wird.
3. Verschiebt alle Aufgaben mit `sortorder` ≥ `targetOrder` nach unten, um eine Lücke zu schaffen.
4. Setzt die gedraggte Aufgabe auf die Lückenposition.

Die Aufgaben werden in absteigender Reihenfolge durchlaufen, bevor verschoben wird, um Konflikte mit der eindeutigen Einschränkung bei sequentiellen Aktualisierungen zu vermeiden.

### linkService

`src/services/linkService.ts` ist eine einfache CRUD-Schicht, die von Supabase abhängt:

```ts
import type { ILinkService, LinkRow } from '@/types/types';
import { sanitize } from './sanitize';
import { supabaseServer } from '@/db/supabaseServer';

class LinkService implements ILinkService {
  async createLink(link: LinkRow): Promise<LinkRow> {
    const cleanData = sanitize(link);
    const { data, error } = await supabaseServer.from('links').insert(cleanData).select().single();
    if (error) throw error;
    return data;
  }
  async updateLink(id: string, fields: Partial<LinkRow>): Promise<LinkRow> {
    const cleanData = sanitize(fields);
    const { data, error } = await supabaseServer.from('links').update(cleanData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
  async deleteLink(id: string): Promise<LinkRow> {
    const { data, error } = await supabaseServer.from('links').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
}

const linkService = new LinkService();
export default linkService;
```

## Aufbau des Express-Backends

`src/server.ts` bildet eine schlanke HTTP-Schicht über die Services. Es delegiert jede Route an den entsprechenden Service und nutzt einen gemeinsamen Fehler-Handler:

```ts
import express, { type Response, type Request } from 'express';
import cors from 'cors';
import 'dotenv/config';
import ganttDataService from './services/ganttDataService';
import taskService from './services/taskService';
import linkService from './services/linkService';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/data', async (_req, res) => {
  try { res.json(await ganttDataService.getData()); }
  catch (error) { handleError(error as Error, res, 'Failed to fetch data'); }
});

app.post('/tasks', async (req, res) => {
  try { res.json(await taskService.createTask(req.body)); }
  catch (error) { handleError(error as Error, res, 'Failed to create task'); }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { target, ...taskFields } = req.body;
    res.json(await taskService.updateTask(req.params.id, taskFields, target));
  } catch (error) { handleError(error as Error, res, 'Failed to update task'); }
});

app.delete('/tasks/:id', async (req, res) => {
  try { res.json(await taskService.deleteTask(req.params.id)); }
  catch (error) { handleError(error as Error, res, 'Failed to delete task'); }
});

// ... link routes follow the same pattern

function handleError(error: Error, res: Response, message: string) {
  console.error(error);
  res.status(500).json({ error: message });
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

Der `PUT /tasks/:id`-Handler destructuriert `target` aus dem Request-Body, bevor `taskFields` an `taskService.updateTask` weitergereicht wird. `target` ist nur vorhanden, wenn die Gantt eine Drag-and-Drop-Neuanordnung signalisiert.

## Aufbau der API-Schicht

`src/api.ts` ist ähnlich dem Basis-TanStack-Query-Demo – einfache `fetch`-Wrapper, die bei non-2xx-Antworten Fehler werfen. Der entscheidende Unterschied: Jede Mutation gibt nun die Server-Antwort JSON zurück (die aktualisierte/degelöschte Zeile), statt sie zu verworfen. Die zurückgegebene `id` wird von Mutationen genutzt, um ausstehende Operationen für die Deduplizierung zu registrieren.

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
  const res = await request(`${BASE}/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return await res.json();
};

export const deleteTask = async (id: string | number) => {
  const res = await request(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  return await res.json();
};

// createLink, updateLink, deleteLink folgen demselben Muster gegen /links
```

Frontend-Anfragen treffen von der Vite-Entwicklungs-Server-URL aus auf dieselbe Herkunft; ein Proxy in `vite.config.ts` leitet `/data`, `/tasks` und `/links` an das Express-Backend auf Port 3001 weiter:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const API_URL = 'http://localhost:3001';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 3000,
    open: true,
    proxy: { '/data': API_URL, '/tasks': API_URL, '/links': API_URL },
  },
});
```

## Zustand Store-Änderungen

Der Store (`src/store.ts`) erhält zwei Ergänzungen gegenüber dem Basis-Tutorial:

- Erweiterte Konfiguration mit Gantt-Optionen für Drag-and-Drop-Reordering:

```ts
config: {
  zoom: defaultZoomLevels,
  open_tree_initially: true,
  order_branch: true,       // enable drag reorder within the same parent
  order_branch_free: true,  // enable drag reorder across parents
  cascade_delete: false,
  root_id: '0',
},
```

- `diffSnapshots`-Hilfsfunktion, die die minimale Differenz zwischen zwei Snapshots berechnet:

```ts
export type SnapshotDiff = {
  tasks: { created: SerializedTask[]; updated: SerializedTask[]; deleted: (string | number)[] };
  links: { created: Link[]; updated: Link[]; deleted: (string | number)[] };
};

// Builds Maps for both snapshots and classifies each item as created/updated/deleted
// by comparing JSON-serialized values
export function diffSnapshots(from: Snapshot, to: Snapshot): SnapshotDiff {
  const fromTasksMap = new Map(from.tasks.map((t) => [t.id, t]));
  const toTasksMap = new Map(to.tasks.map((t) => [t.id, t]));
  const fromLinksMap = new Map(from.links.map((l) => [l.id, l]));
  const toLinksMap = new Map(to.links.map((l) => [l.id, l]));

  const tasksCreated: SerializedTask[] = [];
  const tasksUpdated: SerializedTask[] = [];
  const tasksDeleted: (string | number)[] = [];
  const linksCreated: Link[] = [];
  const linksUpdated: Link[] = [];
  const linksDeleted: (string | number)[] = [];

  for (const [id, task] of toTasksMap) {
    if (!fromTasksMap.has(id)) {
      tasksCreated.push(task);
    } else if (JSON.stringify(fromTasksMap.get(id)) !== JSON.stringify(task)) tasksUpdated.push(task);
  }
  for (const id of fromTasksMap.keys()) {
    if (!toTasksMap.has(id)) tasksDeleted.push(id);
  }

  for (const [id, link] of toLinksMap) {
    if (!fromLinksMap.has(id)) {
      linksCreated.push(link);
    } else if (JSON.stringify(fromLinksMap.get(id)) !== JSON.stringify(link)) linksUpdated.push(link);
  }
  for (const id of fromLinksMap.keys()) {
    if (!toLinksMap.has(id)) linksDeleted.push(id);
  }

  return {
    tasks: { created: tasksCreated, updated: tasksUpdated, deleted: tasksDeleted },
    links: { created: linksCreated, updated: linksUpdated, deleted: linksDeleted },
  };
}
```

`diffSnapshots` wird von `applySnapshotDiff` in `GanttComponent.tsx` verwendet, um Undo/Redo-Operationen auf dem Server zu persistieren.

## Aufbau der Gantt-Komponente

`src/components/GanttComponent.tsx` erweitert das Basistutorial um drei signifikante Ergänzungen: Realtime-Abonnements, `batchSave` und persistenzbewusstes Undo/Redo.

### Importe und Refs

```tsx
import { supabaseClient } from '../db/supabaseClient';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { type Snapshot, diffSnapshots, useGanttStore } from '../store';

// ...inside the component:
const pendingOperationsRef = useRef<Set<string>>(new Set());
const isUndoRedoRef = useRef(false);
const prevSnapshotRef = useRef<Snapshot | null>(null);
```

- `pendingOperationsRef` verfolgt Operationen, die vom lokalen Benutzer initiiert wurden, damit deren Realtime-Echos ignoriert werden können.
- `isUndoRedoRef` unterdrückt Cache-Invalidationen während Undo/Redo-Batches, um eine serverseitige Bestätigung der Änderungen nicht durch eine gleichzeitige Optimistic-Rolllback zu überschreiben.
- `prevSnapshotRef` hält den Snapshot, der direkt vor dem Auslösen von `batchSave` aufgenommen wird, als Ausgangszustand für `diffSnapshots`.

### Verfolgung des Pre-Mutation-Snapshots

```tsx
useEffect(() => {
  if (!isUndoRedoRef.current) {
    prevSnapshotRef.current = makeSnapshot();
  }
}, [makeSnapshot]);
```

Diese Effekt-Funktion läuft nach jedem Render, solange kein Undo/Redo-Vorgang erfolgt. Sie hält `prevSnapshotRef` aktuell, damit `batchSave` immer den richtigen Baseline-Zustand für die Undo-Verwaltung hat.

### Realtime-Abonnements

```tsx
useEffect(() => {
  const tasksChannel = supabaseClient
    .channel('gantt-tasks')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, postgresChangesHandler<SerializedTask>)
    .subscribe();

  const linksChannel = supabaseClient
    .channel('gantt-links')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'links' }, postgresChangesHandler<Link>)
    .subscribe();

  return () => {
    supabaseClient.removeChannel(tasksChannel);
    supabaseClient.removeChannel(linksChannel);
  };
}, [postgresChangesHandler]);
```

Supabase sendet ein PostgreSQL-CDC-Ereignis (Change Data Capture) für jede Zeilenänderung. Die Bereinigungsfunktion entfernt beide Kanäle beimUnmounten der Komponente, um doppelte Listener bei Hot-Reload zu vermeiden.

### Deduplizierung eigener Echoes

Jedes Mal, wenn der lokale Benutzer eine Mutation auslöst, registriert der Mutations-`onSuccess`-Callback die Operation in `pendingOperationsRef`:

```tsx
const createOperationKey = useCallback((action: string, id: string) => {
  pendingOperationsRef.current.add(`${action}-${id}`);
}, []);

// Beispiel für eine Mutation:
const createTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: (data) => {
    createOperationKey(OperationType.INSERT, data.id);
    if (!isUndoRedoRef.current) queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  onError,
});
// ... gleiche Muster für weitere Mutationen
```

Der `postgresChangesHandler` prüft, ob das eingehende Ereignis zu einem ausstehenden Schlüssel gehört und verbraucht es dann still, anstatt eine erneute Abfrage (`refetch`) auszulösen:

```tsx
const postgresChangesHandler = useCallback(
  <T extends ItemWithId>(payload: RealtimePostgresChangesPayload<T>) => {
    const eventType = payload.eventType;
    const id = (payload.new as T)?.id || (payload.old as T)?.id;
    const operationKey = `${eventType}-${id}`;

    if (pendingOperationsRef.current.has(operationKey)) {
      pendingOperationsRef.current.delete(operationKey);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  [pendingOperationsRef, queryClient],
);
```

Ohne dieses Muster würde jede lokale Mutation zweimal eine Abfrage auslösen: einmal im `onSuccess` und einmal durch das Echo der Realtime-Veränderung. Mit diesem Muster invalidieren lokale Änderungen den Cache exakt einmal, und nur Änderungen von anderen Clients lösen eine zusätzliche erneute Abfrage aus.

:::note
Drag-and-drop-Reordern aktualisieren `sortorder` serverseitig für mehrere Zeilen. Nur der primäre Task wird in `pendingOperationsRef` registriert; die Nebeneffekte `sortorder`-Updates bei anderen Tasks erzeugen ungetrackte Realtime-Ereignisse, die zu `invalidateQueries` durchdringen. Dies ist harmlos – `sortorder` ist serverseitiger Zustand, und TanStack Query dedupliziert schnelle Invalidationen zu einem einzigen Hintergrund-Refetch.
:::

### batchSave statt Save

Dieses Demo verwendet `data.batchSave` statt `data.save`. `batchSave` gruppiert alle Änderungen, die aus einer einzigen Benutzerinteraktion resultieren (zum Beispiel Drag-and-Drop, das eine Aufgabe verschiebt und gleichzeitig deren Eltern aktualisiert), in einen Callback:

```tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    batchSave: (changes: BatchChanges) => {
      const { tasks: tasksChanges, links: linksChanges } = changes;

      if (prevSnapshotRef.current) {
        recordHistory(prevSnapshotRef.current);
      }

      tasksChanges?.forEach((task) => {
        if (task.action === 'create') createTaskMutation.mutate(task.data);
        else if (task.action === 'update') updateTaskMutation.mutate(task.data);
        else if (task.action === 'delete') deleteTaskMutation.mutate(task.data.id);
      });

      linksChanges?.forEach((link) => {
        if (link.action === 'create') createLinkMutation.mutate(link.data);
        else if (link.action === 'update') updateLinkMutation.mutate(link.data);
        else if (link.action === 'delete') deleteLinkMutation.mutate(link.data.id);
      });
    },
  }),
  [ 
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
    recordHistory,
   ],
);
```

Wichtige Unterschiede zu `save`:

- Ein einzelner Undo-Eintrag deckt die gesamte Charge ab, nicht einzelne Sub-Operationen.
- Der aufgezeichnete Snapshot ist `prevSnapshotRef.current` – der Zustand, der direkt vor dem Auslösen von `batchSave` aufgenommen wurde – sodass Undo immer die gesamte Interaktion rückgängig macht.
- Die Gantt ruft `batchSave` einmal pro Benutzer-Geste auf, auch wenn diese Geste mehrere Datenbank-Schreibvorgänge erzeugt.

Weitere Informationen zu `batchSave` finden Sie in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md).

### Persistenzbewusstes Undo/Redo

In dem Basis-TanStack-Query-Tutorial schreiben `handleUndo` und `handleRedo` ein Snapshot in den Client-Cache mit `setQueryData` und das war's – Änderungen werden erst persistiert, wenn der Benutzer die nächste manuelle Bearbeitung vornimmt.

In diesem Demo muss Undo/Redo auch die Rücksetzung in Supabase persistent machen, damit andere verbundene Clients sie sehen. Dies geschieht mit `applySnapshotDiff`:

```tsx
const applySnapshotDiff = useCallback(
  async (from: Snapshot, to: Snapshot) => {
    const diff = diffSnapshots(from, to);

    const mutations: Promise<unknown>[] = [];
    const mutateAsync = <T,>(fn: (arg: T) => Promise<unknown>, arg: T) => {
      mutations.push(fn(arg));
    };

    isUndoRedoRef.current = true;

    // Links müssen gelöscht werden, bevor Tasks gelöscht werden (FK)
    diff.links.deleted.forEach((id) => mutateAsync(deleteLinkMutation.mutateAsync, id));
    diff.links.updated.forEach((link) => mutateAsync(updateLinkMutation.mutateAsync, link));
    const batch1 = await Promise.allSettled(mutations.splice(0));

    diff.tasks.deleted.forEach((id) => mutateAsync(deleteTaskMutation.mutateAsync, id));
    diff.tasks.created.forEach((task) => mutateAsync(createTaskMutation.mutateAsync, task));
    diff.tasks.updated.forEach((task) => mutateAsync(updateTaskMutation.mutateAsync, task));
    const batch2 = await Promise.allSettled(mutations.splice(0));

    diff.links.created.forEach((link) => mutateAsync(createLinkMutation.mutateAsync, link));
    const batch3 = await Promise.allSettled(mutations.splice(0));

    const results = [...batch1, ...batch2, ...batch3];
    const rejected = results.filter((result) => result.status === 'rejected');

    isUndoRedoRef.current = false;

    if (rejected.length) {
      console.error('Mutation failed:', rejected);
      queryClient.invalidateQueries({ queryKey: ['data'] });
    }
  },
  [
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createLinkMutation,
    updateLinkMutation,
    deleteLinkMutation,
    queryClient,
  ],
);

const handleUndo = () => {
  const current = makeSnapshot();
  const snapshot = undo(current);
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);   // sofortige optimistic updates
    applySnapshotDiff(current, snapshot);           // persistiert nach Supabase
  }
};

const handleRedo = () => {
  const current = makeSnapshot();
  const snapshot = redo(current);
  if (snapshot) {
    queryClient.setQueryData(['data'], snapshot);
    applySnapshotDiff(current, snapshot);
  }
};
```

Die drei-Batch-Ausführungsreihenfolge ist kritisch:

1. **Batch 1** – Links löschen und aktualisieren (FK-Verweise); Links müssen gelöscht werden, bevor Tasks gelöscht werden.
2. **Batch 2** – Tasks löschen, erstellen und aktualisieren.
3. **Batch 3** – Links erstellen (zuletzt), weil sie auf vorhandene Tasks verweisen.

Während dieses Prozesses verhindert `isUndoRedoRef.current = true` dass jede einzelne Mutationseinfügung ihren `onSuccess`-Callback ausführt, der `invalidateQueries` auslöst – dadurch würde ein Refetch den optimistischen `setQueryData` überschreiben, bevor der Server die Änderungen bestätigt.

## Zoom-Verarbeitung

Im Basis-Tutorial protokolliert `handleZoom` einen Snapshot, bevor der Zoom-Level geändert wird. In diesem Demo werden Zoom-Änderungen nicht persistiert (Zoom ist eine rein lokale UI-Einstellung) – daher ist kein Snapshot nötig:

```tsx
const handleZoom = (level: ZoomLevel) => {
  setZoom(level);
};
```

Die Symbolleiste nutzt shadcn/ui `ToggleGroup` statt MUI `ButtonGroup`:

```tsx
<ToggleGroup type="single" value={currentZoom} onValueChange={(value) => value && onZoom?.(value as ZoomLevel)}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```

## Demo ausführen

Starten Sie das Express-Backend:

```bash
npm run start:server
```

Starten Sie den Vite-Dev-Server:

```bash
npm run dev
```

Öffnen Sie **http://localhost:3000**. Um die Echtzeit-Synchronisation zu sehen, öffnen Sie dieselbe URL in einem zweiten Browser-Tab – jede Änderung in einem Tab wird sofort im anderen angezeigt.

## Zusammenfassung

Im Vergleich zum Basis-TanStack-Query-Tutorial ergänzt dieses Demo:

| Feature | Basis-Tutorial | Dieses Demo |
|---|---|---|
| Backend-Speicherung | Lokale JSON-Datei | Supabase (PostgreSQL) |
| Echtzeit-Synchronisation | Keine | Supabase Realtime-Abonnements |
| Änderungs-Gruppierung | `data.save` (pro Element) | `data.batchSave` (pro Geste) |
| Undo/Redo-Persistenz | Nur Client-seitig | Persistiert über `applySnapshotDiff` |

Das zentrale Architekturprinzip ist das **pending-operations-Set**: Lokale Mutationen registrieren ihre erwarteten Realtime-Echos, bevor sie eintreffen, damit der Handler den Unterschied zwischen einer Remote-Änderung (Trigger Refetch) und dem Echo einer lokalen Änderung (ignorieren) erkennen kann.

## GitHub Demo-Repository

Das komplette lauffähige Projekt ist [auf GitHub verfügbar](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter).

## Was kommt als Nächstes

Dies ist das dritte Tutorial in der React Gantt State-Management-Reihe:

1. [Zustand](integrations/react/state/zustand.md) - lokale In-Memory-State
2. [TanStack Query](integrations/react/state/tanstack-query.md) - serverseitig gespeicherter Zustand mit JSON-Backend
3. **TanStack Query + Supabase** - Echtzeit-Multi-User-Sync (du bist hier)

Von hier aus können Sie:

- Die Kernkonzepte der Data Binding & State Management Basics erneut prüfen (Data Binding & State Management Basics)
- Mit der einfacheren lokalen Backend-Version vergleichen in [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md)
- Realtime-Synchronisation mit einem anderen Backend erkunden in [Firebase Integration](integrations/react/firebase-integration.md)