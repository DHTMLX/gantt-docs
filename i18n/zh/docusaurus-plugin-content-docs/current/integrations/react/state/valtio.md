---
title: 使用 React Gantt 与 Valtio
sidebar_label: Valtio
description: "将 React Gantt 与 Valtio 代理状态集成的指南。展示如何将响应式快照暴露给组件，并在一个地道的 Valtio 工作流中通过 save 回调应用更新。"
---

# React Gantt - Valtio 教程

本教程将带你创建一个 React + TypeScript 应用，集成 DHTMLX React Gantt 组件，并使用 Valtio 管理状态。

## 前提条件

- 具备 React、TypeScript、Vite 和 Valtio 的基础知识
- 建议阅读 [](integrations/react/state/state-management-basics.md) 以了解数据绑定模式以及本教程所基于的 `data.save` 回调。

## 快速设置 - 创建项目

在开始之前，请安装 [Node.js](https://nodejs.org/en/)。

创建一个 Vite React + TypeScript 项目：

~~~bash  
npm create vite@latest react-gantt-valtio-demo -- --template react-ts  
cd react-gantt-valtio-demo  
~~~

现在让我们安装所需的依赖项。

* 对于 **npm**：

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**：

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

然后我们需要安装 React Gantt 包。

### 安装 React Gantt

按照 [React Gantt 安装指南](integrations/react/installation.md) 的描述安装 React Gantt。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

现在你可以启动开发服务器：

~~~bash
npm run dev 
~~~

你现在应该可以在 `http://localhost:5173` 上看到你的 React 项目。

:::note
为了让 Gantt 占满整个 body 的空间，需要移除 `src` 文件夹中的 `App.css` 的默认样式，并添加以下样式：  

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

~~~ts
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

现在，在 `src/components/Toolbar.tsx` 中添加一个 **Toolbar** 组件。

该组件为用户提供对常用 Gantt 控制的快速访问，例如在 *day*、*month* 和 *year* 视图之间缩放，以及执行 **undo/redo** 操作。

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

我们使用 Material UI 的组件（Button、ButtonGroup、Divider 以及图标）来创建一个简单、整洁的工具栏布局，为 Gantt 图提供直观的控制。

工具栏接受以下可选属性，使其易于连接到我们的 Valtio 存储：

- `onUndo` 和 `onRedo` - 在 Valtio 动作中触发撤销/重做逻辑的回调函数。
- `onZoom` - 在用户点击缩放按钮时更新缩放级别的回调
- `currentZoom` - 指示当前处于活动状态的缩放级别，允许工具栏突出显示所选按钮

“Day”、“Month”和“Year”的按钮分别调用 `onZoom('day')`、`onZoom('month')` 或 `onZoom('year')`。所选缩放级别的按钮使用 `variant="contained"`，其他则为 `outlined`，为当前状态提供清晰的视觉提示。

在完整示例中，我们将 `actions.undo`、`actions.redo` 和 `actions.setZoom` 作为道具传递给这些属性，这样工具栏就可以在不了解存储实现细节的情况下控制历史记录和缩放。

## 创建主 Gantt 组件

让我们构建承载 Gantt 图并使用 Valtio 进行状态管理的主组件。创建 `src/components/GanttComponent.tsx`。

在状态管理方面，我们使用 Valtio 的基于代理的响应式存储，它提供自动快照跟踪：

~~~tsx
import { useEffect, useMemo } from 'react';  
import ReactGantt, { type ReactGanttProps, type Link, type SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';  
import { useSnapshot } from 'valtio';  
import { ganttState, actions } from '../store';

import Toolbar from './Toolbar';
~~~

`useSnapshot` 将组件连接到 Valtio 的代理状态，并在状态变化时自动重新渲染。

现在，让我们设置组件并将其连接到我们的 Valtio 存储：

~~~tsx
export default function DemoValtio() {  
  const snap = useSnapshot(ganttState);  
  const { tasks, links, config } = snap;  
  const { addTask, updateTask, deleteTask, addLink, updateLink, deleteLink, undo, redo, setZoom } = actions;

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Valtio';  
  }, []);
}
~~~

- `useSnapshot` 读取来自 Valtio 代理的响应式状态
- `actions` 包含所有修改状态的操作（addTask、updateTask、undo、redo 等）
- `useEffect` 在挂载时设置文档标题

让我们配置 Gantt 图的模板，这些模板定义日期格式化和解析，以实现一致的数据处理：

:::note
自 v9.1.3 以来，Gantt 能自动检测 ISO 日期字符串，因此这些模板覆盖不再需要。此处仅为兼容早期 Gantt 版本而展示。请参阅 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)。
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

最关键的部分是将 Gantt 数据的变更连接到我们由 Valtio 驱动的状态：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, updateTask, deleteTask, addLink, updateLink, deleteLink]  
);
~~~

- `data.save` 回调处理 Gantt 图触发的所有数据修改  
- 每个操作（创建、更新、删除）都会转发到相应的 Valtio 动作  
- Valtio 内部会更新代理状态，`useSnapshot` 确保 UI 自动重新渲染

如果你需要更深入地解释此回调，请参阅基础指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整组件：

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={undo}  
      onRedo={redo}  
      currentZoom={config.zoom.current}  
      onZoom={setZoom}  
    />  
    <ReactGantt tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` 接收来自 Valtio 的撤销/重做和缩放控制的动作  
- 当 Valtio 状态变化时，`tasks`、`links` 和 `config` 的属性会自动更新

然后将你的 `src/App.tsx` 更新为使用我们的 Gantt 组件：

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

## 使用 Valtio 创建状态管理存储

现在让我们使用 Valtio 创建状态管理解决方案。创建 `src/store.ts`：

~~~ts
import { proxy } from 'valtio';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

- 我们导入 Valtio 的 `proxy` 函数以创建响应式状态对象  
- 定义用于状态结构和历史快照的 TypeScript 接口  
- 从种子数据文件导入示例数据和默认配置

在这里定义使用 Valtio 的代理创建的主响应式状态对象：

~~~ts
export const ganttState = proxy<{  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: { ...defaultZoomLevels } },  
  past: [],  
  future: [],  
  maxHistory: 50,  
});
~~~

- `ganttState` 是一个自动跟踪状态变化的响应式代理对象  
- 此状态包含任务、链接、配置，以及撤销/重做历史堆栈  
- 我们设置了一个最大历史记录限制以防止内存问题

使用 Valtio 实现撤销/重做功能：

~~~ts
const recordHistory = () => {  
  const { tasks, links, config, past, maxHistory } = ganttState;  
  const snapshot = {  
    tasks: JSON.parse(JSON.stringify(tasks)),  
    links: JSON.parse(JSON.stringify(links)),  
    config: JSON.parse(JSON.stringify(config)),  
  };  
  ganttState.past = [...past.slice(-maxHistory + 1), snapshot];  
  ganttState.future = [];  
};

export const actions = {  
  undo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    ganttState.tasks = previous.tasks;  
    ganttState.links = previous.links;  
    ganttState.config = previous.config;  
    ganttState.past = past.slice(0, -1);  
    ganttState.future = [{ tasks, links, config }, ...future];  
  },  
  redo() {  
    const { past, future, tasks, links, config } = ganttState;  
    if (future.length === 0) return;  
    const next = future[0];  
    ganttState.tasks = next.tasks;  
    ganttState.links = next.links;  
    ganttState.config = next.config;  
    ganttState.past = [...past, { tasks, links, config }];  
    ganttState.future = future.slice(1);  
  },
}
~~~

- `recordHistory` 会创建当前状态的深拷贝以用于历史快照  
- `undo` 和 `redo` 在历史堆栈之间管理状态转换  
- Valtio 的更新会自动触发响应性

现在，让我们为任务和链接实现增删改（CRUD）操作：

~~~ts
addTask(task: SerializedTask) {  
  recordHistory();  
  const newTask = { ...task, id: `DB_ID:${task.id}` };  
  ganttState.tasks = [...ganttState.tasks, newTask];  
  return newTask;  
},

updateTask(task: SerializedTask) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));  
},

deleteTask(id: string | number) {  
  recordHistory();  
  ganttState.tasks = ganttState.tasks.filter((t) => String(t.id) !== String(id));  
},

addLink(link: Link) {  
  recordHistory();  
  const newLink = { ...link, id: `DB_ID:${link.id}` };  
  ganttState.links = [...ganttState.links, newLink];  
  return newLink;  
},

updateLink(link: Link) {  
  recordHistory();  
  ganttState.links = ganttState.links.map((l) => (l.id === link.id ? { ...l, ...link } : l));  
},

deleteLink(id: string | number) {  
  recordHistory();  
  ganttState.links = ganttState.links.filter((l) => String(l.id) !== String(id));  
},  
~~~

- 每个操作在修改前调用 `recordHistory`  
- `addTask, addLink` 会创建带有模拟数据库 ID 的新任务和新链接  
- `updateTask/updateLink` 与 `deleteTask/deleteLink` 使用常用数组方法进行更新

`setZoom` 直接修改缩放配置，同时保持自动响应性：

~~~ts
setZoom(level: ZoomLevel) {  
  recordHistory();  
  ganttState.config.zoom.current = level;  
},
~~~

## 运行应用

最后，我们可以运行开发服务器并测试我们的应用：

~~~bash
npm run dev
~~~

或者：
~~~bash
yarn dev 
~~~

## 小结

在本教程中你已经：

- 创建了一个 Vite + React 项目
- 添加了 React Gantt 并将其连接到 Valtio 代理存储
- 将任务、链接和缩放配置建模在单一的 `ganttState` 代理中
- 实现了基于快照的撤销/重做机制，使用 `past`/`future` 堆栈和共享的 `recordHistory` 助手
- 完全由 Valtio 状态驱动缩放配置、任务和链接
- 使用 `data.save` 回调，使 Gantt 图的每一次改动都通过 Valtio 动作处理

这使 Gantt 组件保持完全声明式，而所有变更逻辑和历史处理都封装在你的 Valtio 存储中。

## GitHub 演示仓库

按照本教程构建的完整可运行项目已在 GitHub 提供：https://github.com/dhtmlx/react-gantt-valtio-starter。

## 下一步

要深入了解：

- 回顾此示例背后的概念，请参阅 [](integrations/react/state/state-management-basics.md)
- 将存储驱动的状态与高级配置和模板结合起来，参见 [React Gantt 概览](integrations/react/overview.md)
- 将同样的模式应用于其他状态管理器：
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)