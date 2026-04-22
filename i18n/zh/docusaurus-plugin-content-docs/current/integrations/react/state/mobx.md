---
title: 将 React Gantt 与 MobX 一起使用
sidebar_label: MobX
description: "在 MobX 可观察状态下集成 React Gantt。涵盖设置可观察模型、对 Gantt 更新做出反应，以及通过保存处理程序保持图表同步。"
---


# React Gantt - MobX 教程

本教程将引导你创建一个使用 Vite 的 React TypeScript 应用程序，集成 DHTMLX React Gantt 组件，并使用 MobX 管理状态。

## 前置条件

- 具备基本的 React、TypeScript、Vite 和 MobX 知识
- 推荐：阅读 [](integrations/react/state/state-management-basics.md) 以了解数据绑定模式以及本教程构建的 `data.save` 回调

## 快速设置 - 创建项目

在开始之前，请安装 Node.js。

创建一个 Vite React + TypeScript 项目：

~~~bash
npm create vite@latest react-gantt-mobx-demo -- --template react-ts  
cd react-gantt-mobx-demo  
~~~

现在让我们安装所需的依赖。

* 对于 **npm**：

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**：

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

我们使用 `mobx-react-lite` 而不是完整的 `mobx-react` 包，因为我们的应用程序使用函数组件。该“lite”版本专门针对函数组件和钩子进行了优化，在保持所需的 MobX-React 集成功能的同时，提供更小的打包体积。

接下来我们需要安装 React Gantt 包。

### 安装 React Gantt

按照 [React Gantt installation guide](integrations/react/installation.md) 中的说明安装 React Gantt。

在本教程中使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或者

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

现在你可以启动开发服务器：

~~~bash
npm run dev 
~~~

现在你应该可以在 `http://localhost:5173` 看到你的 React 项目在运行。

:::note
为了使 Gantt 占满 body 的整个空间，需要移除 `src` 文件夹中的 `App.css` 的默认样式，并添加如下样式：

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## 设置示例数据与配置

在 `src/seed/Seed.ts` 中创建示例数据，用于 Gantt 图的初始数据：

~~~tsx
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = { 
  current: 'day', 
  levels: [ 
  { name: 'day', scale_height: 27, min_column_width: 80, scales: [{ unit: 'day', step: 1, format: '%d %M' }] }, 
  { name: 'month', scale_height: 50, min_column_width: 120, scales: [{ unit: 'month', format: '%F, %Y' }, { unit: 'week', format: 'Week #%W' }] }, 
  { name: 'year', scale_height: 50, min_column_width: 30, scales: [{ unit: 'year', step: 1, format: '%Y' }] }, 
  ], 
};

export const seedTasks: SerializedTask[] = [ 
  { id: 1, text: 'Office itinerancy', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 17, progress: 0.4, parent: 0, open: true }, 
  { id: 2, text: 'Office facing', type: 'project', start_date: new Date(2025, 3, 2).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 3, text: 'Furniture installation', type: 'project', start_date: new Date(2025, 3, 11).toISOString(), duration: 8, progress: 0.6, parent: 1, open: true }, 
  { id: 4, text: 'The employee relocation', type: 'project', start_date: new Date(2025, 3, 13).toISOString(), duration: 5, progress: 0.5, parent: 1, priority: 3, open: true }, 
  { id: 5, text: 'Interior office', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 1 }, 
  { id: 6, text: 'Air conditioners check', type: 'task', start_date: new Date(2025, 3, 3).toISOString(), duration: 7, progress: 0.6, parent: 2, priority: 2 }, 
  { id: 7, text: 'Workplaces preparation', type: 'task', start_date: new Date(2025, 3, 12).toISOString(), duration: 8, progress: 0.6, parent: 3 }, 
  { id: 8, text: 'Preparing workplaces', type: 'task', start_date: new Date(2025, 3, 14).toISOString(), duration: 5, progress: 0.5, parent: 4, priority: 1 }, 
  { id: 9, text: 'Workplaces importation', type: 'task', start_date: new Date(2025, 3, 21).toISOString(), duration: 4, progress: 0.5, parent: 4 }, 
  { id: 10, text: 'Workplaces exportation', type: 'task', start_date: new Date(2025, 3, 27).toISOString(), duration: 3, progress: 0.5, parent: 4, priority: 2 }
];

export const seedLinks: Link[] = [ 
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  { id: 7, source: 8, target: 9, type: '0' }
]; 
~~~

## 构建控制工具栏组件

现在，让我们在 `src/components/Toolbar.tsx` 中添加一个 **Toolbar** 组件。

该组件为用户提供对 Gantt 常用控制的快速访问，例如在 *day*、*month* 和 *year* 视图之间进行缩放，以及执行 **undo/redo** 操作。

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from '../seed/Seed';

export interface ToolbarProps {  
  onUndo?: () => void;  
  onRedo?: () => void;  
  onZoom?: (level: ZoomLevel) => void;  
  currentZoom?: ZoomLevel;  
}

export default function Toolbar({ onUndo, onRedo, onZoom, currentZoom = 'month' }: ToolbarProps) {  
  return (  
    <div style={{ display: 'flex', justifyContent: 'start', padding: '10px 10px 20px', gap: '10px' }}>  
      <ButtonGroup>  
        <Button onClick={() => onUndo?.()}>  
          <UndoIcon />  
        </Button>  
        <Button onClick={() => onRedo?.()}>  
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
~~~

我们使用 Material UI 组件（Button、ButtonGroup、Divider 和图标）来创建一个简洁、直观的工具栏布局，为 Gantt 图提供直观的控件。

工具栏接受以下可选属性，以实现与 MobX 存储的无缝集成：

- `onUndo` 和 `onRedo` - 用于撤销/重做操作的回调函数。
- `onZoom` - 点击缩放按钮时更新存储中的缩放级别的回调。
- `currentZoom` - 指示当前活动的缩放级别，允许工具栏高亮显示所选按钮。

“Day”、“Month”和“Year”的按钮分别调用 `onZoom('day')`、`onZoom('month')`、或 `onZoom('year')`。所选缩放级别的按钮使用 `variant="contained"`，其他按钮为 `outlined`，为当前状态提供清晰的视觉提示。

工具栏直接连接到 MobX 存储的操作：

- 缩放控件：当用户点击“Day”时，我们从 MobX 存储中调用 `setZoom('day')`，这会自动更新 Gantt 图的配置并触发重新渲染  
- 撤销按钮将触发存储的 `undo()` 方法以回退到先前的状态  
- 重做按钮将调用 `redo()` 以重新应用更改  
- 所有状态变更（任务编辑、删除、缩放调整等）都在我们的自定义历史系统中跟踪，并可无缝地撤销或重新应用

## 创建主 Gantt 组件

现在，让我们从构建将承载 Gantt 图的主组件开始。创建 `src/components/GanttComponent.tsx`。

首先，我们从 React 导入 `useEffect`、`useMemo`，并导入 Gantt 包中的主组件和类型，以及我们自定义的 `Toolbar` 组件，以及稍后将创建的 MobX 存储实例：

~~~tsx
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import ReactGantt, { type ReactGanttProps, type SerializedTask, type Link } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { store } from '../store';
~~~

现在，让我们设置组件并将其连接到我们的 MobX 存储：

~~~tsx
const DemoMobXBasic: React.FC = observer(() => {  
  const {  
    tasks,  
    links,  
    config,  
    setZoom,  
    addTask,  
    upsertTask,  
    deleteTask,  
    addLink,  
    upsertLink,  
    deleteLink,  
    undo,  
    redo,  
  } = store;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | MobX';  
  }, []);
}
~~~

我们使用 `observer()` 来自 `mobx-react-lite` 包装组件，以自动跟踪可观察状态的变化。这确保了当相关的存储属性（tasks、links、config）发生变化时，组件会重新渲染。

- 我们通过一次解构直接从 MobX 存储中提取状态和操作
- `useEffect` 在组件挂载时设置文档标题

让我们配置 Gantt 图的模板，用于一致的数据处理中的日期格式化和解析：

:::note
自 v9.1.3 起，Gantt 会自动检测 ISO 日期字符串，这些模板覆盖不再需要。这里显示它们是为了兼容较早版本的 Gantt。请参阅 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)。
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

最关键的部分 - 将 Gantt 的数据变更连接到我们的 MobX 存储：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(
  () => ({
    save: (entity, action, item, id) => {
      if (entity === 'task') {
        const task = item as SerializedTask;
        if (action === 'create') return addTask(task);
        if (action === 'update') return upsertTask(task);
        if (action === 'delete') return deleteTask(id);
      }
      if (entity === 'link') {
        const link = item as Link;
        if (action === 'create') return addLink(link);
        if (action === 'update') return upsertLink(link);
        if (action === 'delete') return deleteLink(id);
      }
    },
  }),
  [addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink]
);
~~~

- `data.save` 回调处理来自 Gantt 图的所有数据修改  
- 它将不同的操作（create、update、delete）路由到相应的存储操作  
- 依赖项数组确保当存储操作变化时回调会更新

如果你需要对这个回调有更深入的解释，请参阅 Basics 指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整组件：

~~~tsx
return (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  

export default DemoMobXBasic;
~~~

- `Toolbar` 接收撤销/重做和缩放控件的处理程序  
- `ReactGantt` 组件接收所有数据、配置和回调

然后更新你的 `src/App.tsx`，使用我们的 Gantt 组件：

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ width: '95vw', height: '100vh' }}>  
      <GanttComponent />  
    </div>  
  );  
}  
export default App;
~~~

## 设置 MobX 存储

现在让我们使用 MobX 创建状态管理解决方案。创建 `src/store.ts`：

~~~ts
import { makeAutoObservable } from 'mobx';  
import type { Task, Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export class GanttStore {  
  tasks: SerializedTask[] = seedTasks;  
  links: Link[] = seedLinks;  
  config: GanttConfig = {  
    zoom: defaultZoomLevels,  
  };  
  past: Snapshot[] = [];  
  future: Snapshot[] = [];  
  maxHistory: number = 50;

  constructor() {  
    makeAutoObservable(this, {}, { autoBind: true });  
  }
}
~~~

- 我们定义了一个 `GanttStore` 类，封装了与 Gantt 相关的所有状态与逻辑  
- 存储管理 `tasks`、`links` 与 `config` —— Gantt 的核心数据结构  
- `past` 与 `future` 数组实现撤销/重做的历史记录  
- `makeAutoObservable` 会自动将字段标记为可观察、将 getter 标记为计算值、将方法标记为动作  
- `autoBind: true` 选项确保方法保持正确的 `this` 上下文

现在实现处理状态更新和历史管理的存储方法：

~~~ts
_snapshot(): Snapshot {  
  return {  
    tasks: JSON.parse(JSON.stringify(this.tasks)),  
    links: JSON.parse(JSON.stringify(this.links)),  
    config: JSON.parse(JSON.stringify(this.config)),  
  };  
}

_saveToHistory() {  
  this.past.push(this._snapshot());  
  if (this.past.length > this.maxHistory) this.past.shift();  
  this.future = [];  
}

undo() {  
  if (this.past.length === 0) return;  
  const previous = this.past.pop();  
  if (previous) {  
    this.future.unshift(this._snapshot());  
    this.tasks = previous.tasks;  
    this.links = previous.links;  
    this.config = previous.config;  
  }  
}

redo() {  
  if (this.future.length === 0) return;  
  const next = this.future.shift();  
  if (next) {  
    this.past.push(this._snapshot());  
    this.tasks = next.tasks;  
    this.links = next.links;  
    this.config = next.config;  
  }  
}
~~~

- `_snapshot()` 为历史记录创建当前状态的深拷贝  
- `_saveToHistory()` 在修改前保存当前状态并清空重做栈  
- `undo()` 从 `past` 中恢复最近的状态并将当前状态移动到 `future`  
- `redo()` 从 `future` 重新应用下一个状态并将当前状态保存到 `past`

现在让我们实现 Gantt 特定的操作：

~~~ts
setZoom(level: ZoomLevel) {  
  this._saveToHistory();  
  this.config = { ...this.config, zoom: { ...this.config.zoom, current: level } };  
}

addTask(task: SerializedTask) {  
  this._saveToHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  this.tasks.push(newTask);  
  return newTask;  
}

upsertTask(task: SerializedTask) {  
  this._saveToHistory();  
  const index = this.tasks.findIndex((t) => String(t.id) === String(task.id));  
  if (index !== -1) this.tasks[index] = { ...this.tasks[index], ...task };  
}

deleteTask(id: string | number) {  
  this._saveToHistory();  
  this.tasks = this.tasks.filter((t) => String(t.id) !== String(id));  
}

addLink(l: Link) {  
  this._saveToHistory();  
  const newLink = { ...l, id: `DB_ID:${l.id}` };  
  this.links.push(newLink);  
  return newLink;  
}

upsertLink(l: Link) {  
  this._saveToHistory();  
  const index = this.links.findIndex((link) => String(link.id) === String(l.id));  
  if (index !== -1) this.links[index] = { ...this.links[index], ...l };  
}

deleteLink(id: string | number) {  
  this._saveToHistory();  
  this.links = this.links.filter((l) => String(l.id) !== String(id));  
}  

export const store = new GanttStore();
~~~

- `setZoom` 在保持历史的同时更新缩放级别  
- `addTask` 使用模拟数据库 ID 创建新任务并跟踪操作  
- `upsertTask` 通过 ID 更新现有任务，同时保留历史  
- `deleteTask` 按 ID 删除任务并进行历史追踪  
- 链接操作（`addLink`、`upsertLink`、`deleteLink`）使用相同的模式

每个修改操作在执行更改之前都会调用 `this._saveToHistory()`，以确保每一次状态转换都被记录并可逆。

## 运行应用程序

最后，我们可以启动开发服务器并测试应用程序：

~~~bash
npm run dev
~~~

或：
~~~bash
yarn dev 
~~~  

## 小结

在本教程中，你已经完成了：

- 创建了一个 Vite + React 项目
- 添加了 React Gantt 并将其连接到 MobX 存储
- 在 `GanttStore` 中使用 `past`/`future` 历史数组实现基于快照的撤销/重做
- 完全由可观察的 MobX 状态驱动缩放、任务和链接
- 使用 `data.save` 回调，使 Gantt 图中的每一次更改都转化为存储中的操作

这使 Gantt 组件保持完全声明式，而所有变更逻辑和历史处理都封装在 MobX 状态中。

## GitHub 演示仓库

一个完整的工作项目遵循本教程的示例已在 GitHub 上提供。

## 下一步

进一步了解：

- 重新查看本示例背后的概念 [](integrations/react/state/state-management-basics.md)
- 将 store 驱动的状态与高级配置和模板结合在一起，参阅 [React Gantt overview](integrations/react/overview.md)
- 使用其他状态管理器探索同样的模式：
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)