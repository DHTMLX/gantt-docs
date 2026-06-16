--- 
title: Использование React Gantt с TanStack Query и Supabase
sidebar_label: TanStack Query + Supabase
description: 'Узнайте, как добавить синхронизацию в реальном времени между несколькими пользователями для React Gantt, работающего на TanStack Query. Это руководство охватывает подписки Supabase Realtime, паттерн дедупликации pending-operations, batchSave для эффективных CRUD, управление порядком сортировки на стороне сервера и сохранение Undo/Redo с учетом состояния.'
--- 

# React Gantt - TanStack Query + Supabase Руководство

Это руководство расширяет [Using React Gantt with TanStack Query], заменяя локальный JSON-бэкенд на **Supabase** (PostgreSQL + Realtime) и добавляя синхронизацию в реальном времени между несколькими пользователями. Когда один пользователь создаёт, изменяет или удаляет задачу, изменение мгновенно отражается во всех остальных открытых вкладках — перезагрузка страницы не требуется.

Руководство фокусируется на том, что нового и чем отличается от базового туториала по TanStack Query:

- настройка базы данных Supabase
- подписки в реальном времени
- `batchSave` вместо `save` для группировки мутаций
- управление `sortorder` на стороне сервера для устойчивого упорядочивания задач
- XSS-санитизация на серверной стороне
- Undo/Redo с учётом сохранения через `applySnapshotDiff`

Если вы не знакомы с базовой конфигурацией (Vite + React + TypeScript, TanStack Query, Zustand, базовые CRUD-мутаторы, снимки как основа Undo/Redo), сначала прочтите [TanStack Query tutorial].

## Prerequisites

- Завершённый (или прочитанный) [TanStack Query tutorial]
- Проект[Supabase](https://supabase.com) со URL проекта и anon‑ключом
- Node.js 16+

## Project setup

```bash
npm create vite@latest react-gantt-tanstack-supabase-demo -- --template react-ts
cd react-gantt-tanstack-supabase-demo
```

Установите зависимости. Этот демо-проект использует **shadcn/ui** (на основе Tailwind) вместо MUI:

```bash
npm install @tanstack/react-query zustand @supabase/supabase-js \
  express cors dotenv \
  tailwindcss @tailwindcss/vite lucide-react \
  radix-ui class-variance-authority clsx tailwind-merge
```

Dev зависимости:

```bash
npm install -D tsx nodemon @types/express @types/cors @types/node
```

Установите React Gantt:

```bash
npm install @dhtmlx/trial-react-gantt
```

Добавьте скрипты в `package.json`:

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

## Configuring Supabase environment variables

Создайте `.env` (на основе `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Префикс `VITE_` делает переменные доступными во frontend-бандле Vite. Не имеющиеся префиксом переменные используются бэкендом Express во время выполнения через `dotenv`.

## Setting up the database

В Supabase **SQL Editor** запустите миграцию из `setup.sql`:

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

Ключевые моменты дизайна:

- `sortorder` — это серверно управляемое целое число, сохраняющее визуальный порядок задач в гриде Gantt.
- И `links.source`, и `links.target` имеют `ON DELETE CASCADE`, чтобы удаление задачи автоматически удаляло связанные зависимости.
- `tasks.parent` тоже каскадирует, поэтому удаление родителя удаляет всех детей.

Supabase Realtime должен быть включён для обеих таблиц. В панели Supabase перейдите в Database → Replication и добавьте таблицы `tasks` и `links` в публикацию репликации.

## Dual Supabase clients

Демо использует два отдельных клиента Supabase, потому что frontend и backend работают в разных окружениях.

`src/db/supabaseClient.ts` - браузерный клиент, читает переменные окружения через `import.meta.env`:

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrlClient = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyClient = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrlClient || !supabaseAnonKeyClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrlClient, supabaseAnonKeyClient);
```

`src/db/supabaseServer.ts` - серверный клиент, читает переменные окружения через `process.env` (загружает через `dotenv`):

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

`supabaseClient` используется исключительно для подписок в Realtime в `GanttComponent.tsx`. Все записи в базу данных пишутся через `supabaseServer` в слое Express.

:::note
Этот стартовый проект использует серверный anon key, потому что схема демо не содержит политик уровней доступа на уровне строк (RLS) и аутентификации нет. В проде с аутентификацией и RLS сервер должен держать **service role key** (не на фронтенде), чтобы обходить проверки доступа для доверенных операций.
:::

## TypeScript types

`src/types/types.ts` определяет формы строк таблиц базы данных и сервисные интерфейсы:

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

`ITaskService.updateTask` принимает необязательный параметр `target`. Это идентификатор задачи-приёмника, переданный Gantt при повторном порядке-draggable, и он запускает серверную логику перестановки.

## Building the backend services

### ganttDataService

`src/services/ganttDataService.ts` получает все задачи, отсортированные по `sortorder`:

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

`parent` хранится в базе как `NULL` для задач на верхнем уровне. Gantt ожидает строку `'0'` для той же роли, поэтому сервис нормализует значение при чтении.

### sanitize helper

`src/services/sanitize.ts` HTML-экранирует текстовые поля перед записью в базу данных:

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

Каждый сервис записи вызывает `sanitize()` перед вставкой или обновлением. Добавляйте имена полей в `TEXT_FIELDS`, когда схема содержит новые текстовые столбцы, редактируемые пользователем.

### taskService - sortorder management

`src/services/taskService.ts` — самый сложный сервис, потому что он управляет постоянным порядком задач.

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

Метод `reorder`:

1. Считывает `sortorder` целевой задачи.
2. Если целевая строка начинается с `next:`, перетаскиваемая задача должна оказаться после целевой, поэтому порядок инкрементируется на единицу.
3. Сдвигает все задачи, у которых `sortorder` ≥ `targetOrder`, вниз на один, чтобы освободить место.
4. Устанавливает перетаскиваемой задаче `sortorder` на позицию в освободившемся месте.

Задачи итерируются в порядке убывании перед сдвигом, чтобы избежать коллизий уникального ограничения при последовательном обновлении.

### linkService

`src/services/linkService.ts` — простые CRUD-операции на базе Supabase:

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

`src/server.ts` — тонкий HTTP-слой над сервисами. Он делегирует каждый маршрут соответствующему сервису и использует общий обработчик ошибок:

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

`PUT /tasks/:id` обработчик деструктурирует `target` из тела запроса перед передачей `taskFields` в `taskService.updateTask`. `target` присутствует только когда Gantt сигнализирует о повторном порядке перетаскивания.

## Creating the API layer

`src/api.ts` похож на базовый демо TanStack Query — простые обёртки fetch, которые выбрасывают ошибку при не-2xx ответах. Главная разница: каждое мутирование теперь возвращает JSON-ответ сервера (обновлённую/удалённую строку) вместо того, чтобы пропускать его. Возвращаемый `id` используется мутаторами для регистрации ожидаемых операций для дедупликации.

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

// createLink, updateLink, deleteLink follow the same pattern against /links
```

Frontend-запросы отправляются на тот же origin, что и Vite dev-сервер (`http://localhost:3000`); прокси в `vite.config.ts` перенаправляет `/data`, `/tasks` и `/links` на Express-бэкенд на порт 3001:

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

## Zustand store changes

Хранилище Zustand в этом примере дополняется двумя изменениями по сравнению с базовым туториалом:

**Расширенная конфигурация** с опциями Gantt для drag-and-drop reorder:

```ts
config: {
  zoom: defaultZoomLevels,
  open_tree_initially: true,
  order_branch: true,       // позволяет перетаскивать внутри одного родителя
  order_branch_free: true,  // позволяет перетаскивать между разными родителями
  cascade_delete: false,
  root_id: '0',
},
```

**`diffSnapshots` utility** — вычисляет минимальные различия между двумя снимками:

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

`diffSnapshots` используется функцией `applySnapshotDiff` в `GanttComponent.tsx` для сохранения undo/redo на сервере.

## Building the Gantt component

`src/components/GanttComponent.tsx` расширяет базовый туториал тремя значимыми дополнениями: подписки в реальном времени, `batchSave` и Undo/Redo с учётом сохранения.

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

- `pendingOperationsRef` отслеживает операции, инициированные локальным пользователем, чтобы их эхо в Realtime можно было игнорировать.
- `isUndoRedoRef` подавляет инвалидацию кэша во время пакетных операций undo/redo, чтобы избежать повторного обращения к серверу, которое могло бы затереть текущий откат.
- `prevSnapshotRef` хранит снимок, сделанный непосредственно перед срабатыванием `batchSave`, используется как состояние `from` для `diffSnapshots`.

### Tracking the pre-mutation snapshot

```tsx
useEffect(() => {
  if (!isUndoRedoRef.current) {
    prevSnapshotRef.current = makeSnapshot();
  }
}, [makeSnapshot]);
```

Этот эффект выполняется после каждого рендера, пока не выполняется операция undo/redo. Он держит `prevSnapshotRef` в актуальном состоянии, чтобы при срабатывании `batchSave` у него всегда была корректная базовая версия для добавления в стек Undo.

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

Supabase отправляет событие CDC (Change Data Capture) Postgres для каждой изменения строки. Функция очистки удаляет оба канала при размонтировании компонента, чтобы избежать дубликатов слушателей во время hot-reload.

### Deduplicating own-change echoes

Каждый раз, когда локальный пользователь инициирует мутацию, колбэк `onSuccess` регистрации Mutations заносит операцию в `pendingOperationsRef`:

```tsx
const createOperationKey = useCallback((action: string, id: string) => {
  pendingOperationsRef.current.add(`${action}-${id}`);
}, []);

// примеры мутаций
const createTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: (data) => {
    createOperationKey(OperationType.INSERT, data.id);
    if (!isUndoRedoRef.current) queryClient.invalidateQueries({ queryKey: ['data'] });
  },
  onError,
});
// ... та же схема для других мутаций
```

`postgresChangesHandler` проверяет, совпадает ли приходящее событие с ожидаемым ключом, и если да — безrefetch удаляет его из набора:

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

Без этого паттерна каждое локальное изменение вызывало бы две повторных загрузки: одна в `onSuccess` и одна — эхо Realtime. С этим паттерном локальные изменения инвалидируют кэш ровно один раз, а изменения от других клиентов вызывают дополнительную повторную загрузку.

:::note
Drag-and-drop reorder обновляет `sortorder` на стороне сервера в нескольких строках. В основном регистрируется только задача-источник в `pendingOperationsRef`; побочные обновления `sortorder` на других задачах порождают незарегистрированные Realtime-события, которые проходят к `invalidateQueries`. Это безвредно — `sortorder` является состоянием только на сервере, и TanStack Query дедуплицирует быстрые инвалидирования в единый фоновой рефetch.
:::

### batchSave instead of save

Это демо использует `data.batchSave` вместо `data.save`. `batchSave` группирует все изменения, которые получаются в рамках одного взаимодействия пользователя (например, перетаскивание, которое перемещает задачу и одновременно обновляет её родителя), в один вызов колбэка:

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

Ключевые различия по сравнению с `save`:

- Одна Undo-запись покрывает всю пакетную операцию целиком, а не каждую подоперацию.
- Снимок, записываемый перед выполнением, — это `prevSnapshotRef.current` — состояние, зафиксированное непосредственно перед срабатыванием `batchSave` — поэтому Undo всегда отменяет целое взаимодействие.
- Gantt вызывает `batchSave` один раз на каждое действие пользователя, даже если это действие приводит к нескольким записям в базе.

Для дополнительной информации о `batchSave` смотрите [Data Binding & State Management Basics].

### Persistence-aware undo/redo

В базовом туториале по TanStack Query `handleUndo` и `handleRedo` записывали снимок в кэш клиента с помощью `setQueryData` и всё — изменения сохранялись не позднее, чем при следующем ручном редактировании.

В этом демо Undo/Redo должны также сохраняться в Supabase, чтобы видеть их другими подключенными клиентами. Это достигается с помощью `applySnapshotDiff`:

```tsx
const applySnapshotDiff = useCallback(
  async (from: Snapshot, to: Snapshot) => {
    const diff = diffSnapshots(from, to);

    const mutations: Promise<unknown>[] = [];
    const mutateAsync = <T,>(fn: (arg: T) => Promise<unknown>, arg: T) => {
      mutations.push(fn(arg));
    };

    isUndoRedoRef.current = true;

    // Сначала удаляеми связи (LINK), потом задачи (TASK) (ПFK)
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
    queryClient.setQueryData(['data'], snapshot);   // немедленное оптимистическое обновление
    applySnapshotDiff(current, snapshot);           // сохраняется в Supabase
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

Трёхпакетный порядок выполнения критичен:

1. Блок 1 — удалить и обновить связи (LINK) в первую очередь (они ссылаются на задачи).
2. Блок 2 — удалить, создать и обновить задачи.
3. Блок 3 — создать ссылки последними (чтобы ссылки ссылались на существующие задачи).

`isUndoRedoRef.current = true` во время этого процесса предотвращает вызов `invalidateQueries` для каждой отдельной мутации, что привело бы к перезагрузке до подтверждения сервера и стиранию optimistic-обновления.

## Zoom handling

В базовом туториале `handleZoom` записывает снимок перед изменением уровня зума. В этом демо изменения зума не сохраняются (зум — сугубо локальная настройка UI), поэтому снимок не нужен:

```tsx
const handleZoom = (level: ZoomLevel) => {
  setZoom(level);
};
```

Панель инструментов использует `ToggleGroup` из shadcn/ui вместо MUI `ButtonGroup`:

```tsx
<ToggleGroup type="single" value={currentZoom} onValueChange={(value) => value && onZoom?.(value as ZoomLevel)}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```

## Running the demo

Запустите Express-бэкенд:

```bash
npm run start:server
```

Запустите Vite dev-сервер:

```bash
npm run dev
```

Откройте **http://localhost:3000**. Чтобы увидеть синхронизацию в реальном времени, откройте тот же URL во второй вкладке браузера — каждое изменение в одной вкладке сразу отображается в другой.

## Summary

По сравнению с базовым туториалом по TanStack Query этот демон добавляет:

| Фича | Базовый туториал | Этот демо |
|---|---|---|
| Хранение на бэкенде | Локальный JSON-файл | Supabase (PostgreSQL) |
| Синхронизация в реальном времени | Нет | Подписки Supabase Realtime |
| Группировка изменений | `data.save` (для каждого элемента) | `data.batchSave` (для каждого жеста) |
| Сохранение Undo/Redo | Только на клиенте | Сохранение через `applySnapshotDiff` |

Ключевая архитектурная идея — множество ожидающих операций (**pending-operations set**): локальные мутации регистрируют свои ожидаемые эхо-ответы в Realtime до их появления, чтобы обработчик мог различать удалённое изменение (вызывает повторную загрузку) и эхо локального изменения (игнорировать).

## GitHub demo repository

Полностью рабочий проект [доступен на GitHub](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter).

## Что дальше

Это третий туториал в последовательности по управлению состоянием в React Gantt:

1. [Zustand] (integrations/react/state/zustand.md) - локальное состояние в памяти
2. [TanStack Query](integrations/react/state/tanstack-query.md) - управляемое сервером состояние с бэкендом на JSON-файле
3. **TanStack Query + Supabase** - синхронизация в реальном времени для нескольких пользователей (вы находитесь здесь)

Далее можно:

- Вернуться к основам привязки данных, читай в [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- Сравнить с более простым локальным вариантом бэкенда в [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md)
- Исследовать Realtime-синхронизацию с другим бэкендом в [Firebase Integration](integrations/react/firebase-integration.md)