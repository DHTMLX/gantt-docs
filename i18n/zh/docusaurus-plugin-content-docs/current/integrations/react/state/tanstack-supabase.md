---
title: 使用 React Gantt 与 TanStack Query 和 Supabase
sidebar_label: TanStack Query + Supabase
description: '了解如何为由 TanStack Query 驱动的 React Gantt 添加实时多用户同步。本指南涵盖 Supabase Realtime 订阅、pending-operations 去重模式、batchSave 批量保存以提升 CRUD 效率、服务器端 sortorder 管理，以及基于持久化的撤销/重做。'
---

# React Gantt - TanStack Query + Supabase 教程

本教程在 [使用 React Gantt 与 TanStack Query](integrations/react/state/tanstack-query.md) 的基础上，将本地 JSON 后端替换为 **Supabase**（PostgreSQL + Realtime）并新增实时多用户同步。当一个用户创建、编辑或删除任务时，改动会立即在所有其他打开的标签页中反映出来——无需刷新页面。

本指南聚焦于与基础 TanStack Query 教程相比的新颖之处与差异：

- Supabase 数据库设置
- 实时订阅
- 使用 `batchSave` 代替 `save` 进行变更分组
- 服务器端 `sortorder` 的管理以实现持久化的任务排序
- 服务端 XSS 防护清理
- 通过 `applySnapshotDiff` 实现的持久化撤销/重做

如果你对基础设置（Vite + React + TypeScript、TanStack Query、Zustand、基础 CRUD 变更、基于快照的撤销/重做）不熟悉，请先阅读 [TanStack Query 教程](integrations/react/state/tanstack-query.md)。

## 先决条件

- 已完成（或已阅读）[TanStack Query 教程](integrations/react/state/tanstack-query.md)
- 一个包含 Project URL 与 anon key 的 [Supabase](https://supabase.com) 项目
- Node.js 16 及以上

## 项目设置

```bash
npm create vite@latest react-gantt-tanstack-supabase-demo -- --template react-ts
cd react-gantt-tanstack-supabase-demo
```

安装依赖。本演示使用 **shadcn/ui**（Tailwind 基于的 UI 方案）而非 MUI：

```bash
npm install @tanstack/react-query zustand @supabase/supabase-js \
  express cors dotenv \
  tailwindcss @tailwindcss/vite lucide-react \
  radix-ui class-variance-authority clsx tailwind-merge
```

开发依赖：

```bash
npm install -D tsx nodemon @types/express @types/cors @types/node
```

安装 React Gantt：

```bash
npm install @dhtmlx/trial-react-gantt
```

在 `package.json` 中添加脚本：

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

## 配置 Supabase 环境变量

创建 `.env`（基于 `.env.example`）：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

前缀 `VITE_` 会暴露变量给 Vite 的前端打包。未加前缀的变量在运行时由 Express 后端通过 `dotenv` 使用。

## 设置数据库

在 Supabase 的 **SQL Editor** 中运行来自 `setup.sql` 的迁移脚本：

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

关键设计要点：

- `sortorder` 是由服务器管理的整型值，用于在 Gantt 网格中保留任务的视觉排序。
- `links.source` 与 `links.target` 均使用 `ON DELETE CASCADE`，因此删除任务时会自动移除任何相关的依赖链接。
- `tasks.parent` 也会级联删除，所以删除父任务时其所有子任务也会被删除。

Supabase 实时服务必须对这两个表启用。进入 Supabase 仪表板，依次访问 Database → Replication，将 `tasks` 和 `links` 表添加到 replication publication。

## 双客户端 Supabase

演示使用两个独立的 Supabase 客户端实例，因为前端和后端运行在不同的环境中。

`src/db/supabaseClient.ts` - 浏览器端客户端，环境变量通过 `import.meta.env` 读取：

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrlClient = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyClient = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrlClient || !supabaseAnonKeyClient) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient: SupabaseClient = createClient(supabaseUrlClient, supabaseAnonKeyClient);
```

`src/db/supabaseServer.ts` - 服务器端客户端，环境变量通过 `process.env`（由 `dotenv` 加载）：

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

`supabaseClient` 专门用于 `GanttComponent.tsx` 中的 Realtime 订阅。所有数据库写入操作都通过 Express 层的 `supabaseServer` 进行。

:::note
此示例中使用的是服务器端的 **anon key**，因为演示的架构没有行级安全策略（RLS），也没有身份认证。在生产环境中若启用认证和 RLS，应该让服务器端持有服务密钥（service role key，放在前端之外）以绕过对受信任操作的 RLS。
:::

## TypeScript 类型

`src/types/types.ts` 定义了数据库行数据结构与服务接口：

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

`ITaskService.updateTask` 接受一个可选的 `target` 参数。它是由 Gantt 在用户通过拖放重新排序时发送的 drop 目标任务 id，用于触发服务器端的重新排序逻辑。

## 构建后端服务

### ganttDataService

`src/services/ganttDataService.ts` 获取按 `sortorder` 排序的所有任务：

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

`parent` 在数据库中以 `NULL` 存储作为根级任务的标记。Gantt 读取时需要用字符串 `'0'` 来表示同样的含义，因此该服务在读取时进行归一化。

### sanitize helper

`src/services/sanitize.ts` 在进入数据库前对文本字段进行 HTML 转义：

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

每次写入操作都会在插入或更新前调用 `sanitize()`。当数据库模式新增更多用户可编辑文本列时，请在 `TEXT_FIELDS` 中添加字段名。

### taskService - sortorder 管理

`src/services/taskService.ts` 是最复杂的服务，因为它负责持久化的任务排序：

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

该 `reorder` 方法实现如下流程：

1. 读取拖放目标的 `sortorder`。
2. 如果目标字符串以 `next:` 为前缀，则被拖动的任务应放在目标之后，因此将排序值自增 1。
3. 将所有 `sortorder` ≥ 目标排序值的任务往下挪一位，以为新任务腾出空位。
4. 将被拖动任务的 `sortorder` 设置到新空位的位置。

为了避免在顺序更新过程中出现唯一性约束冲突，任务是以降序方式遍历然后再执行更新。

### linkService

`src/services/linkService.ts` 是一个基于 Supabase 的简单 CRUD 服务：

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

## 构建 Express 后端

`src/server.ts` 是对服务的一个精简 HTTP 层。它将每个路由委托给相应的服务，并使用一个公用的错误处理器：

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

// ... link 路由遵循相同模式

function handleError(error: Error, res: Response, message: string) {
  console.error(error);
  res.status(500).json({ error: message });
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

`PUT /tasks/:id` 路由处理器在把请求体转发给 `taskService.updateTask` 之前，解构出 `target`，只有当 Gantt 提示执行拖放重新排序时才会包含该字段。

## 创建 API 层

`src/api.ts` 与基础 TanStack Query 演示类似——使用简单的 `fetch` 包装来抛出非 2xx 的响应。关键区别在于：每次变更现在都会返回服务器响应的 JSON（更新/删除的行数据），而不是被忽略。返回的 `id` 将被变更用于注册待处理操作以实现去重。

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

前端请求和 Vite 开发服务器同源 `(http://localhost:3000)`，在 `vite.config.ts` 中设置了代理，将 `/data`、`/tasks`、`/links` 转发到位于端口 3001 的 Express 后端：

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

## Zustand 存储变更

与基础教程相比，Store 增加了两处：

1) 扩展的配置项，包含用于拖放重新排序的 Gantt 选项：

```ts
config: {
  zoom: defaultZoomLevels,
  open_tree_initially: true,
  order_branch: true,       // 允许同一父节点内的拖放排序
  order_branch_free: true,  // 允许跨父节点的拖放排序
  cascade_delete: false,
  root_id: '0',
},
```

2) `diffSnapshots` 工具，用于计算两个快照之间的最小差异：

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

`diffSnapshots` 由 `applySnapshotDiff` 在 `GanttComponent.tsx` 中用于将撤销/重做操作持久化到服务器。

## 构建 Gantt 组件

`src/components/GanttComponent.tsx` 在基础教程基础上增加了三项重要的改动：实时订阅、`batchSave` 以及基于持久化的撤销/重做。

### 导入与引用
```tsx
import { supabaseClient } from '../db/supabaseClient';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { type Snapshot, diffSnapshots, useGanttStore } from '../store';

// ...组件内部
const pendingOperationsRef = useRef<Set<string>>(new Set());
const isUndoRedoRef = useRef(false);
const prevSnapshotRef = useRef<Snapshot | null>(null);
```

- `pendingOperationsRef` 用于跟踪本地用户发起的操作，以便忽略其 Realtime 回声。  
- `isUndoRedoRef` 在撤销/重做的批处理中抑制缓存失效，以避免在服务器确认变更前将乐观回滚覆盖。  
- `prevSnapshotRef` 保存执行 `batchSave` 之前的快照，用作 `diffSnapshots` 的 `from` 状态。

### 记录变更前的快照

```tsx
useEffect(() => {
  if (!isUndoRedoRef.current) {
    prevSnapshotRef.current = makeSnapshot();
  }
}, [makeSnapshot]);
```

该副作用在非撤销/重做操作的每次渲染后执行，确保在 `batchSave` 触发时始终具备正确的基线以压入撤销栈。

### 实时订阅

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

Supabase 对每一行变更发送 Postgres CDC（Change Data Capture）事件。清理函数在组件卸载时移除两个通道，避免热重载时监听重复。

### 去重自身变更回声

每当本地用户触发变更时，变更的 `onSuccess` 回调会将操作登记到 `pendingOperationsRef`：

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
// ... 对其他变更同样模式
```

`postgresChangesHandler` 会检查到达的事件是否匹配待处理的键，如果匹配则静默消费以避免触发重取（refetch）：

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

如果没有这个模式，任何本地变更都会触发两次重取：一次来自 `onSuccess`，一次来自 Realtime 回声。使用该模式后，只有其他客户端的变更才会导致额外的重取，而本地变更只会进行一次无状态回刷。

:::note
拖放导致的排序更新在服务器端对多行同时进行。只有主任务会被登记在 `pendingOperationsRef`；其他任务的 `sortorder` 更新会产生未被跟踪的 Realtime 事件，通过 `invalidateQueries` 进入缓存，产生的影响是无害的 —— `sortorder` 只在服务器端维护状态，且 TanStack Query 会将快速的无效化合并为一次后台重取。
:::

### 使用 batchSave 而非 save

本示例使用 `data.batchSave` 代替 `data.save`。`batchSave` 会将单次用户交互（例如一次拖放移动任务并同时更新其父任务）所产生的所有变更分组到一个回调中执行：

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

与 `save` 的主要区别：

- 一个撤销条目覆盖整个批次中的所有操作，而非单独的子操作。  
- 记录的快照是 `prevSnapshotRef.current` —— just before batchSave 触发的状态，因此撤销始终回滚整个交互过程。  
- Gantt 在每次用户手势中仅调用一次 `batchSave`，即使该手势会产生多次数据库写入。

想了解更多关于 `batchSave` 的信息，请参阅 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)。

### 与撤销/重做相关的持久化

在基础的 TanStack Query 教程中，`handleUndo` 与 `handleRedo` 通过 `setQueryData` 将快照写入客户端缓存，仅在用户进行下一次手动编辑时才会持久化更改。

在本演示中，撤销/重做也必须将回滚持久化到 Supabase，以便其他连接的客户端能够看到变化。这通过 `applySnapshotDiff` 实现：

```tsx
const applySnapshotDiff = useCallback(
  async (from: Snapshot, to: Snapshot) => {
    const diff = diffSnapshots(from, to);

    const mutations: Promise<unknown>[] = [];
    const mutateAsync = <T,>(fn: (arg: T) => Promise<unknown>, arg: T) => {
      mutations.push(fn(arg));
    };

    isUndoRedoRef.current = true;

    // 先删除链接（FK 约束）再删除/创建/更新任务（先创建再触及 FK 的依赖）
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
    queryClient.setQueryData(['data'], snapshot);   // 即时乐观更新
    applySnapshotDiff(current, snapshot);           // 持久化到 Supabase
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

这三段批处理的执行顺序至关重要：

1. Batch 1 —— 先删除再更新链接（因为链接引用了任务，删除任务前需要先移除链接）。
2. Batch 2 —— 删除、创建和更新任务。
3. Batch 3 —— 最后创建链接（链接引用的任务必须已经存在）。

在该过程中，`isUndoRedoRef.current = true`，以防止每个单独变更的 `onSuccess` 触发 `invalidateQueries`，从而在服务器确认变更前覆盖乐观的 `setQueryData`。

## 缩放处理

在基础教程中，`handleZoom` 在改变缩放等级之前就记录了一个快照。本演示中，缩放仅是本地 UI 偏好，因此不需要持久化快照：

```tsx
const handleZoom = (level: ZoomLevel) => {
  setZoom(level);
};
```

工具栏使用 shadcn/ui 的 `ToggleGroup`，而不是 MUI 的 `ButtonGroup`：

```tsx
<ToggleGroup type="single" value={currentZoom} onValueChange={(value) => value && onZoom?.(value as ZoomLevel)}>
  <ToggleGroupItem value="day">Day</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="year">Year</ToggleGroupItem>
</ToggleGroup>
```

## 运行演示

启动 Express 后端：

```bash
npm run start:server
```

启动 Vite 开发服务器：

```bash
npm run dev
```

打开 `http://localhost:3000`。若要看到实时同步的效果，请在另一个浏览器标签页中打开相同的地址——任一标签页的变更会立即在另一标签页中显示。

## 总结

与基础的 TanStack Query 教程相比，本演示新增了：

| 功能 | 基础教程 | 本演示 |
|---|---|---|
| 后端存储 | 本地 JSON 文件 | Supabase（PostgreSQL） |
| 实时同步 | 无 | Supabase Realtime 订阅 |
| 变更分组 | `data.save`（逐项） | `data.batchSave`（按手势） |
| 撤销/重做持久化 | 客户端本地 | 通过 `applySnapshotDiff` 持久化 |

关键的架构模式是 **pending-operations 集合**：本地变更在 Real-time 回声到达之前就注册其预期的回声，这样处理程序就能区分远程变更（触发重取）与本地变更的回声（忽略）。

## GitHub 演示代码仓库

完整的可运行项目位于 [GitHub](https://github.com/dhtmlx/react-gantt-tanstack-supabase-starter)。

## 下一步

这是 React Gantt 状态管理序列中的第三个教程：

1) [Zustand](integrations/react/state/zustand.md) - 本地内存状态管理
2) [TanStack Query](integrations/react/state/tanstack-query.md) - 以 JSON 文件后端实现的服务端状态
3) **TanStack Query + Supabase** - 实时多用户同步（你现在就在这里）

从这里开始，你可以：

- 参考 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md) 深入理解数据绑定概念
- 与本地后端版本进行对比，参阅 [Using React Gantt with TanStack Query](integrations/react/state/tanstack-query.md)
- 了解在不同后台实现的 Realtime 同步，参阅 [Firebase Integration](integrations/react/firebase-integration.md)