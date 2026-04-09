---
title: Using React Gantt with TanStack Query and Supabase
sidebar_label: TanStack Query + Supabase
description: 'Learn how to add real-time multi-user sync to a React Gantt powered by TanStack Query. This guide covers Supabase Realtime subscriptions, the pending-operations deduplication pattern, batchSave for efficient CRUD, server-side sortorder management, and persistence-aware undo/redo.'
---

# React Gantt - TanStack Query + Supabase Tutorial

This tutorial extends [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md) by replacing the local JSON backend with **Supabase** (PostgreSQL + Realtime) and adding live multi-user synchronization. When one user creates, edits, or deletes a task the change is reflected instantly in every other open tab - no page refresh needed.

The guide focuses on what is new and different from the base TanStack Query tutorial:

- Supabase database setup
- Realtime subscriptions
- `batchSave` instead of `save` for grouping mutations
- Server-side `sortorder` management for persistent task ordering
- XSS sanitization on the backend
- Persistence-aware undo/redo via `applySnapshotDiff`

If you are not familiar with the base setup (Vite + React + TypeScript, TanStack Query, Zustand, basic CRUD mutations, snapshot-based undo/redo), read the [TanStack Query tutorial](integrations/react/state/tanstack-query.md) first.

## Prerequisites

- Completed (or read) the [TanStack Query tutorial](integrations/react/state/tanstack-query.md)
- A [Supabase](https://supabase.com) project with the Project URL and anon key
- Node.js 16+

## Project setup

```bash
npm create vite@latest react-gantt-tanstack-supabase-demo -- --template react-ts
cd react-gantt-tanstack-supabase-demo
```

Install dependencies. This demo uses **shadcn/ui** (Tailwind-based) instead of MUI:

```bash
npm install @tanstack/react-query zustand @supabase/supabase-js \
  express cors dotenv \
  tailwindcss @tailwindcss/vite lucide-react \
  radix-ui class-variance-authority clsx tailwind-merge
```

Dev dependencies:

```bash
npm install -D tsx nodemon @types/express @types/cors @types/node
```

Install React Gantt:

```bash
npm install @dhtmlx/trial-react-gantt
```

Add scripts to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

## Configuring Supabase environment variables

Create `.env` (based on `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

The `VITE_` prefix exposes variables to the Vite frontend bundle. The unprefixed variables are used by the Express backend at runtime via `dotenv`.

## Setting up the database

In the Supabase **SQL Editor** run the migration from `setup.sql`:

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

Key design points:

- `sortorder` is a server-managed integer that preserves the visual order tasks appear in the Gantt grid.
- Both `links.source` and `links.target` have `ON DELETE CASCADE` so deleting a task automatically removes any dependent links.
- `tasks.parent` also cascades, so deleting a parent removes all children.

Supabase Realtime must be enabled for both tables. In the Supabase dashboard go to **Database → Replication** and add the `tasks` and `links` tables to the replication publication.

## Dual Supabase clients

The demo uses two separate Supabase client instances because the frontend and backend run in different environments.

`src/db/supabaseClient.ts` — browser client, reads env via `import.meta.env`:

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrlClient = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyClient = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrlClient || !supabaseAnonKeyClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrlClient, supabaseAnonKeyClient);
```

`src/db/supabaseServer.ts` — server-side client, reads env via `process.env` (loaded by `dotenv`):

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

`supabaseClient` is used exclusively for Realtime subscriptions in `GanttComponent.tsx`. All database writes go through `supabaseServer` in the Express layer.

## TypeScript types

`src/types/types.ts` defines the database row shapes and service interfaces:

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

`ITaskService.updateTask` accepts an optional `target` parameter. This is the drop-target task id sent by the Gantt when the user reorders tasks by drag-and-drop, and it triggers the server-side reorder logic.

## Building the backend services

### ganttDataService

`src/services/ganttDataService.ts` fetches all tasks ordered by `sortorder`:

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

`parent` is stored as `NULL` in the database for root-level tasks. The Gantt expects the string `'0'` for the same role, so the service normalizes the value on read.

### sanitize helper

`src/services/sanitize.ts` HTML-escapes text fields before they reach the database:

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

Every write service calls `sanitize()` before inserting or updating. Add field names to `TEXT_FIELDS` when the schema gains additional user-editable text columns.

### taskService — sortorder management

`src/services/taskService.ts` is the most complex service because it manages the persistent task order.

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

The `reorder` method:

1. Reads the `sortorder` of the drop target.
2. If the target string is prefixed with `next:` the dragged task should be placed after the target, so the order is incremented by one.
3. Shifts all tasks whose `sortorder` is `≥ targetOrder` down by one to make a gap.
4. Sets the dragged task's `sortorder` to the gap position.

The tasks are iterated in descending order before shifting to avoid unique-constraint collisions during sequential updates.

### linkService

`src/services/linkService.ts` is straightforward CRUD backed by Supabase:

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

## Building the Express backend

`src/server.ts` is a thin HTTP layer over the services. It delegates every route to the appropriate service and uses a shared error handler:

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

The `PUT /tasks/:id` handler destructures `target` out of the request body before forwarding `taskFields` to `taskService.updateTask`. `target` is only present when the Gantt signals a drag-and-drop reorder.

## Creating the API layer

`src/api.ts` is identical to the base TanStack Query demo - plain `fetch` wrappers that throw on non-2xx responses. One small difference: `updateTask`, `deleteTask`, `updateLink`, and `deleteLink` now return the server response JSON (the updated/deleted row) instead of discarding it. The returned `id` is used by mutations to register pending operations for deduplication.

## Zustand store changes

The store (`src/store.ts`) gains two additions compared to the base tutorial:

**Extended config** with Gantt options for drag-and-drop reordering:

```ts
config: {
  zoom: defaultZoomLevels,
  open_tree_initially: true,
  order_branch: true,       // enables drag reorder within the same parent
  order_branch_free: true,  // enables drag reorder across parents
  cascade_delete: false,
  root_id: '0',
},
```

**`diffSnapshots` utility** that computes the minimal diff between two snapshots:

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

`diffSnapshots` is used by `applySnapshotDiff` in `GanttComponent.tsx` to persist undo/redo operations to the server.

## Building the Gantt component

`src/components/GanttComponent.tsx` extends the base tutorial with three significant additions: Realtime subscriptions, `batchSave`, and persistence-aware undo/redo.

### Imports and refs

```tsx
import { supabaseClient } from '../db/supabaseClient';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { type Snapshot, diffSnapshots, useGanttStore } from '../store';

// ...inside the component:
const pendingOperationsRef = useRef<Set<string>>(new Set());
const isUndoRedoRef = useRef(false);
const prevSnapshotRef = useRef<Snapshot | null>(null);
```

- `pendingOperationsRef` tracks operations initiated by the local user so their Realtime echoes can be ignored.
- `isUndoRedoRef` suppresses cache invalidation during undo/redo batches to avoid a server round-trip that would clobber the in-progress optimistic rollback.
- `prevSnapshotRef` holds the snapshot taken just before `batchSave` fires, used as the `from` state for `diffSnapshots`.

### Tracking the pre-mutation snapshot

```tsx
useEffect(() => {
  if (!isUndoRedoRef.current) {
    prevSnapshotRef.current = makeSnapshot();
  }
}, [makeSnapshot]);
```

This effect runs after every render while not in an undo/redo operation. It keeps `prevSnapshotRef` up to date so that when `batchSave` fires it always has the correct baseline to push onto the undo stack.

### Realtime subscriptions

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

Supabase sends a Postgres CDC (Change Data Capture) event for every row change. The cleanup function removes both channels when the component unmounts to avoid duplicate listeners on hot reload.

### Deduplicating own-change echoes

Every time the local user triggers a mutation, the mutation's `onSuccess` callback registers the operation in `pendingOperationsRef`:

```tsx
const createOperationKey = useCallback((action: string, id: string) => {
  pendingOperationsRef.current.add(`${action}-${id}`);
}, []);

const createTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: (data) => {
    createOperationKey(OperationType.INSERT, data.id);
    if (!isUndoRedoRef.current) queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  onError,
});
// ... same pattern for other mutations
```

The `postgresChangesHandler` checks whether the arriving event matches a pending key and, if so, silently consumes it instead of triggering a refetch:

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

Without this pattern, every local mutation would trigger two refetches: one from `onSuccess` and one from the Realtime echo. With it, local changes invalidate the cache exactly once, and only changes from other clients cause an additional refetch.

:::note
Drag-and-drop reorders update `sortorder` on multiple rows server-side. Only the primary task is registered in `pendingOperationsRef`; the side-effect `sortorder` updates on other tasks produce untracked Realtime events that slip through to `invalidateQueries`. This is harmless — `sortorder` is server-only state, and TanStack Query deduplicates rapid invalidations into a single background refetch.
:::

### batchSave instead of save

This demo uses `data.batchSave` instead of `data.save`. `batchSave` groups all changes that result from a single user interaction (for example, a drag-and-drop that moves a task and updates its parent simultaneously) into one callback invocation:

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

Key differences from `save`:

- A single undo entry covers the entire batch, not individual sub-operations.
- The snapshot recorded is `prevSnapshotRef.current` — the state captured just before `batchSave` fired — so undo always reverts the complete interaction.
- The Gantt calls `batchSave` once per user gesture even if that gesture produces multiple database writes.

For more about `batchSave` see [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md).

### Persistence-aware undo/redo

In the base TanStack Query tutorial, `handleUndo` and `handleRedo` write a snapshot into the client cache with `setQueryData` and that is it — changes are not persisted until the user makes the next manual edit.

In this demo, undo/redo must also persist the rollback to Supabase so that other connected clients see it. This is done with `applySnapshotDiff`:

```tsx
const applySnapshotDiff = useCallback(
  async (from: Snapshot, to: Snapshot) => {
    const diff = diffSnapshots(from, to);
    isUndoRedoRef.current = true;

    // Links must be deleted before tasks (FK), tasks must be created before links (FK)
    diff.links.deleted.forEach((id) => mutations.push(deleteLinkMutation.mutateAsync(id)));
    diff.links.updated.forEach((link) => mutations.push(updateLinkMutation.mutateAsync(link)));
    await Promise.allSettled(/* batch 1 */);

    diff.tasks.deleted.forEach((id) => mutations.push(deleteTaskMutation.mutateAsync(id)));
    diff.tasks.created.forEach((task) => mutations.push(createTaskMutation.mutateAsync(task)));
    diff.tasks.updated.forEach((task) => mutations.push(updateTaskMutation.mutateAsync(task)));
    await Promise.allSettled(/* batch 2 */);

    diff.links.created.forEach((link) => mutations.push(createLinkMutation.mutateAsync(link)));
    await Promise.allSettled(/* batch 3 */);

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
    queryClient.setQueryData(['data'], snapshot);   // instant optimistic update
    applySnapshotDiff(current, snapshot);           // persists to Supabase
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

The three-batch execution order is critical:

1. **Batch 1** – delete and update links first (they reference tasks, so tasks cannot be deleted while links exist).
2. **Batch 2** – delete, create, and update tasks.
3. **Batch 3** – create links last (their referenced tasks must exist).

`isUndoRedoRef.current = true` during this process prevents each individual mutation's `onSuccess` from calling `invalidateQueries`, which would cause a refetch that overwrites the optimistic `setQueryData` before the server confirms the changes.

## Zoom handling

In the base tutorial `handleZoom` records a snapshot before changing the zoom level. In this demo zoom changes are not persisted (zoom is a purely local UI preference) so no snapshot is needed:

```tsx
const handleZoom = (level: ZoomLevel) => {
  setZoom(level);
};
```

The toolbar uses shadcn/ui `ToggleGroup` instead of MUI `ButtonGroup`:

```tsx
<ToggleGroup type="single" value={currentZoom} onValueChange={(value) => value && onZoom?.(value as ZoomLevel)}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```

## Running the demo

Start the Express backend:

```bash
npm run start:server
```

Start the Vite dev server:

```bash
npm run dev
```

Open **http://localhost:3000**. To see real-time sync in action, open the same URL in a second browser tab - every change in one tab appears immediately in the other.

## Summary

Compared to the base TanStack Query tutorial, this demo adds:

| Feature | Base tutorial | This demo |
|---|---|---|
| Backend storage | Local JSON file | Supabase (PostgreSQL) |
| Real-time sync | None | Supabase Realtime subscriptions |
| Change grouping | `data.save` (per item) | `data.batchSave` (per gesture) |
| Undo/redo persistence | Client-side only | Persisted via `applySnapshotDiff` |

The key architectural pattern is the **pending-operations set**: local mutations register their expected Realtime echoes before they arrive, so the handler can tell the difference between a remote change (trigger refetch) and the echo of a local change (ignore).

## GitHub demo repository

The complete working project is [available on GitHub](https://github.com/dhtmlx/dhx-react-gantt-tanstack-supabase-demo).

## What's next

- Revisit the core data binding concepts in [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Compare with the simpler local-storage version in [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md)
- Explore Realtime sync with a different backend in [Firebase Integration](integrations/react/firebase-integration.md)
