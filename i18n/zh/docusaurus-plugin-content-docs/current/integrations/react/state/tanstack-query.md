---
title: 使用 React Gantt 与 TanStack Query
sidebar_label: TanStack Query
description: '了解如何使用 TanStack Query 管理 Gantt 服务器端状态，将 mutations 绑定到 data.save 回调，并与一个轻量级的 Zustand 存储结合来实现撤销/重做历史和 UI 配置。'
---

# React Gantt - TanStack Query 教程

本教程将引导你使用 Vite 构建一个带有 TypeScript 的 React 应用，集成 DHTMLX React Gantt 组件，并使用 TanStack Query 管理服务器端状态。一个小型的 Zustand 存储处理本地 UI 状态 —— 撤销/重做历史与缩放配置。

本教程的重点是**客户端集成**：TanStack Query 如何获取数据、mutations 如何绑定到 Gantt 的 `data.save` 回调，以及查询缓存如何作为 Gantt 数据的唯一来源。在演示中，后端设计故意保持精简 —— 使用一个本地 JSON 文件作为存储，而不是真实数据库。这足以演示一个可工作的 REST API，而不需要引入无关的基础设施。在生产应用中，你可以将其替换为你选择的任意持久存储解决方案。

## 前提条件

- 具备 React、TypeScript、Vite 和 TanStack Query 的基础知识
- 建议：阅读 integr.../state-management-basics.md 以了解数据绑定模式以及本教程所依赖的 `data.save` 回调。

## 快速设置 - 创建项目

在开始之前，请安装 [Node.js](https://nodejs.org/en/)。

创建一个 Vite React + TypeScript 项目：

```bash
npm create vite@latest react-gantt-tanstack-query-demo -- --template react-ts
cd react-gantt-tanstack-query-demo
```

现在让我们安装所需的依赖。

- 对于 **npm**：

```bash
npm install @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

- 对于 **yarn**：

```bash
yarn add @tanstack/react-query zustand @mui/material @mui/icons-material @emotion/react @emotion/styled express cors
```

我们还需要一些开发依赖来带 TypeScript 运行 Express 后端服务器：

- 对于 **npm**：

```bash
npm install -D tsx nodemon @types/express @types/node
```

- 对于 **yarn**：

```bash
yarn add -D tsx nodemon @types/express @types/node
```

接着我们需要安装 React Gantt 包。

### 安装 React Gantt

按 [React Gantt 安装指南](integrations/react/installation.md) 的说明安装 React Gantt。

在本教程中我们使用评估包：

```bash
npm install @dhtmlx/trial-react-gantt
```

或

```bash
yarn add @dhtmlx/trial-react-gantt
```

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

在 `package.json` 中添加以下脚本，以便你可以分别启动后端和前端：

```json
"scripts": {
  "dev": "vite",
  "start:server": "nodemon --exec tsx src/server.ts"
}
```

:::note
为了让 Gantt 占满整个文档主体空间，你需要移除 `src` 文件夹中的 `App.css` 和 `index.css` 的默认样式，并在 `index.css` 中添加以下样式：

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

## 设置示例数据与配置

创建 `src/seed/Seed.ts`，包含 Gantt 的缩放配置：

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

也创建 `src/seed/data.json`，其中包含后端将提供的初始任务和链接数据：

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

## 构建后端服务器

:::note
下面的服务器示例仅用于演示便利性，并非生产级推荐。它把所有数据存储在一个 JSON 文件中，使你可以在不设置数据库的情况下完成整套教程。当你构建生产应用时，请将其替换为任何真实的持久化层——PostgreSQL、MongoDB、云端 API 等。客户端的 TanStack Query 集成无论后端使用何种后端都保持一致。
:::

创建 `src/server.ts`。这个轻量级的 Express 服务器读取并写入一个 JSON 文件，以模拟真正的 REST API：

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

// 启动时将种子数据复制到运行时位置，以使种子数据保持原样
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

该服务器暴露了以下端点：

| 方法 | 路径         | 作用                                      |
| ------ | ------------ | -------------------------------------- |
| GET    | `/data`      | 返回所有任务和链接                         |
| POST   | `/tasks`     | 创建任务，分配一个稳定的 DB id               |
| PUT    | `/tasks/:id` | 更新任务                                      |
| DELETE | `/tasks/:id` | 删除任务                                      |
| POST   | `/links`     | 创建链接，分配一个稳定的 DB id                 |
| PUT    | `/links/:id` | 更新链接                                      |
| DELETE | `/links/:id` | 删除链接                                      |

当创建一个任务或链接时，服务器会将客户端生成的 id 前缀为 `DB_ID:` 并返回新记录。Gantt 组件使用返回的 id 来更新其内部引用。

## 创建 API 层

创建 `src/api.ts`，其中包含 TanStack Query 将调用的纯 `fetch` 基函数：

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

每个函数在遇到非 2xx 响应时都会抛出错误，这样 TanStack Query 就可以捕获错误并触发其 `onError` 处理程序。

## 构建控制工具栏组件

在 `src/components/Toolbar.tsx` 中新增一个 **Toolbar** 组件：

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

该工具栏接受以下属性：

- `canUndo` / `canRedo` - 基于历史记录栈长度的布尔标志，用于启用或禁用撤销/重做按钮。
- `onUndo` / `onRedo` - 在父组件中触发撤销/重做逻辑的回调。
- `onZoom` - 用户点击缩放按钮时更新缩放级别的回调。
- `currentZoom` - 表示活动的缩放级别，以便正确的按钮显示为 `contained`。

## 在 main.tsx 中设置 TanStack Query

用 `QueryClientProvider` 将应用包裹起来，使每个组件都可以访问 TanStack Query 客户端：

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

`QueryClient` 在渲染树之外只创建一次，以防止在每次渲染时重新创建。

## 创建主 Gantt 组件

创建 `src/components/GanttComponent.tsx`。在这里，TanStack Query 负责驱动所有数据操作。

### 导入与初始设置

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

### 使用 useQuery 获取数据

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

`useQuery` 会在组件挂载时从服务器获取所有任务和链接。结果会在 TanStack Query 的缓存中以 `['data']` 为键进行存储。

- `isLoading` —— 初始获取时为真
- `isError` / `error` —— 获取失败时会填充
- 使用空数组作为回退 (`fetchedData || { tasks: [], links: [] }`) 确保 Gantt 在第一次响应到来之前也能接收有效的 props

### 读取 Zustand 状态

```tsx
const { undo, redo, setZoom, config, recordHistory, past, future } = useGanttStore();
```

只有 UI 相关的状态来自 Zustand —— 缩放配置和撤销/重做历史栈。任务和链接则存放在 TanStack Query 缓存中，而不是 Zustand。

### 创建快照辅助函数

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

`makeSnapshot` 会把当前的任务、链接和配置做成一个深拷贝，作为一个单独的 `Snapshot` 对象。在每次变动之前都会调用它，以便撤销时能够恢复到变更之前的状态。

### 定义变更操作 (Mutations)

每个 CRUD 操作都被包装在一个 `useMutation` 钩子中。六个变更都共享同样的三个生命周期钩子：

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

- **`onMutate`** —— 在 API 调用前同步触发。我们在这里记录快照，以便撤销栈能够在变化发生前立即捕获状态。
- **`onSuccess`** —— 调用 `queryClient.invalidateQueries`，将 `['data']` 缓存标记为过期并触发后台重新获取。重新获取完成后，Gantt 将使用新鲜的服务器响应重新绘制。
- **`onError`** —— 记录失败。你可以将其扩展为显示通知或回滚乐观更新。

### 通过 data.save 将 mutations 连接到 Gantt

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
自 v9.1.3 版本起，Gantt 会自动检测 ISO 日期字符串，且不再需要 `templates` 覆盖。这里仍然展示它们以兼容早期版本的 Gantt。请参阅 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)。
:::

`data.save` 回调是 Gantt 图和 TanStack Query 之间的桥梁。每当用户拖动任务、编辑文本、创建链接，或执行任何其他变动时：

1. Gantt 使用实体类型 (`task` 或 `link`)、动作 (`create`、`update`、`delete`)、完整项有效载荷以及其 id 调用 `data.save`。
2. 我们将其路由到相应的 mutation。
3. 该 mutation 调用 API 函数并在成功时使缓存失效。

如果你需要对这个回调有更深的理解，请参阅 Basics 指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

### 撤销、重做与缩放处理程序

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

- `handleUndo` 将当前快照传给 Zustand 的 `undo` 动作（以便将其推送到 `future`），并接收先前的快照作为返回。随后通过 `setQueryData` 将该快照直接写入 TanStack Query 缓存。React 立即使用还原后的数据重新渲染 Gantt —— 无需服务器往返。
- `handleRedo` 的工作方式与之相同，只是顺序相反。
- `handleZoom` 会先记录一条历史快照，然后调用 Zustand 的 `setZoom` 动作来更新 `config.zoom`。

这一模式使撤销/重做保持快速且离线，因为它完全在客户端缓存上操作。

### 渲染

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

- 在图表渲染前处理加载与错误状态。
- `canUndo` 与 `canRedo` 来自 Zustand 的历史栈长度，因此当没有可撤销或可重做的操作时，工具栏按钮将被禁用。
- `tasks` 和 `links` 始终来自 TanStack Query 缓存；`config` 始终来自 Zustand。

### 更新 App.tsx

将 `src/App.tsx` 更新为使用 Gantt 组件：

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

## 设置 Zustand 存储

Zustand 仅管理本地 UI 状态：缩放配置与撤销/重做历史栈。任务和链接由 TanStack Query 管理。

创建 `src/store.ts`：

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

### 存储所管理的内容

- **`config`** - 直接传递给 `<ReactGantt>` 的 `config` 属性的 Gantt 缩放配置。
- **`past` / `future`** - 撤销与重做的快照栈。每个快照都包含 `tasks`、`links` 与 `config`，从而一次性完整回滚。 
- **`maxHistory`** - 将历史记录限制在最近 50 条快照。

### 为什么撤销和重做会接受一个快照参数

在纯 Zustand 的教程中，存储包含任务和链接，因此 `undo()` 可以直接把前一个快照交换进来。在这里，任务和链接保存在 TanStack Query 缓存中。为了让存储与 TanStack Query 保持解耦，每次撤销/重做调用：

1. 从组件接收当前快照作为参数（以便存储把它推送到相对的栈，而不需要了解 TanStack Query）。
2. 返回目标快照，以便组件使用 `queryClient.setQueryData` 将其写入缓存中。

这种清晰的分离意味着 Zustand 只负责历史记录的处理，而 TanStack Query 仍然是服务器数据的唯一真实源。

## 运行应用

在一个终端启动 Express 后端：

```bash
npm run start:server
```

或：

```bash
yarn start:server
```

然后在另一个终端启动 Vite 开发服务器：

```bash
npm run dev
```

或：

```bash
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000)。Gantt 图从后端加载数据，且你所做的每一个修改都会自动持久化到服务器。

## 总结

在本教程中，你已经完成了：

- 使用 Vite + React + TypeScript 与 TanStack Query 和 Zustand 的搭建
- 创建一个 Express REST 后端，作为 JSON 的服务端数据持久化
- 使用 `useQuery` 在加载时从服务器获取所有 Gantt 数据
- 定义六个 `useMutation` 钩子（每个 CRUD 操作一个），并将它们绑定到 `data.save` 回调
- 通过在 Zustand 中存储历史并通过 `queryClient.setQueryData` 将快照写入 TanStack Query 缓存，实现基于快照的撤销/重做

这一设计保持 Gantt 组件的完全声明性：服务器端状态由 TanStack Query 所拥有，UI 状态由 Zustand 拥有，`data.save` 回调将用户交互与变更连接起来，而组件本身不需要了解任何持久化逻辑。

## GitHub 演示仓库

一个遵循本教程的完整工作示例项目已在 GitHub 提供：https://github.com/dhtmlx/react-gantt-tanstack-query-starter

## 下一步

要进一步深入，可参考以下内容：

- 重新查看本示例背后的概念：[](integrations/react/state/state-management-basics.md)
- 在 [React Gantt 概览](integrations/react/overview.md) 中结合 store 驱动的状态与高级配置/模板
- 将相同模式应用到其他状态管理器：
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)