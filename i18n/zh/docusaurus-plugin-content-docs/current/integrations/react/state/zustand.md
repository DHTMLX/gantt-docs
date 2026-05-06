---
title: 在 Zustand 中使用 React Gantt
sidebar_label: Zustand
description: "了解如何使用轻量级 Zustand store 管理甘特图数据，将选择器连接到组件，并在可预测、最小化样板代码的 boilerplate 设置中通过 save 回调处理更新。"
---


# React Gantt - Zustand 教程

本教程将引导你使用 Vite 创建一个 React TypeScript 应用，集成 DHTMLX React Gantt 组件，并使用 Zustand 管理状态。

## 先决条件

- 具备 React、TypeScript、Vite 和 Zustand 的基本知识
- 建议：[阅读](integrations/react/state/state-management-basics.md) 以了解数据绑定模式以及本教程所构建的 `data.save` 回调的基础用法。

## 快速设置 - 创建项目

在开始之前，请先安装 [Node.js](https://nodejs.org/en/)。

创建一个 Vite React + TypeScript 项目：

~~~bash  
npm create vite@latest react-gantt-zustand-demo -- --template react-ts  
cd react-gantt-zustand-demo  
~~~

现在让我们安装所需的依赖。

* 对于 **npm**： 

~~~bash
npm install zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**：

~~~bash
yarn add zustand @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

接着我们需要安装 React Gantt 包。 

### 安装 React Gantt

按照 [React Gantt 安装指南](integrations/react/installation.md) 中的说明安装。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或者

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中把 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。
现在你可以启动开发服务器：

~~~bash
npm run dev 
~~~

现在你应该可以在 `http://localhost:5173` 看到你的 React 项目正在运行。

:::note
若要使 Gantt 占满 body 的全部空间，你需要移除 `src` 文件夹下的 `App.css` 中的默认样式，并添加以下样式：

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

在 `src/seed/Seed.ts` 中创建用于 Gantt 图的示例数据：初始数据将包含如下内容：

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

现在，让我们在 `src/components/Toolbar.tsx` 中添加一个 **Toolbar** 组件。

该组件为用户提供对常用 Gantt 控件的快速访问，例如在 *day*、*month* 和 *year* 视图之间切换，以及执行 **undo/redo** 操作。

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

我们使用 Material UI 的组件（Button、ButtonGroup、Divider 以及图标）来创建一个简单、整洁的工具栏布局，为甘特图提供直观的控件。

工具栏接收以下可选属性，以实现与我们的 Zustand 存储的无缝集成：

- `onUndo` 和 `onRedo` - 撤销/重做操作的回调函数。  
- `onZoom` - 在用户点击缩放按钮时更新 Zustand 存储中的缩放级别的回调。  
- `currentZoom` - 指示当前活动的缩放级别，使工具栏能够高亮显示所选按钮。  
- “Day”、“Month”和“Year” 按钮分别调用 `onZoom('day')`、`onZoom('month')` 或 `onZoom('year')`。被选中的缩放级别按钮使用 `variant="contained"`，其他按钮使用 `outlined`，为当前状态提供清晰的视觉提示。  

工具栏直接连接到 Zustand 存储的操作：

- 缩放控件：当用户点击 “Day” 时，我们从 Zustand 存储中调用 `setZoom('day')`，这会自动更新 Gantt 图的配置并触发重新渲染  
- 撤销按钮将触发存储的 `undo()` 方法以回滚到之前的状态  
- 重做按钮将调用 `redo()` 以重新应用更改  
- 所有状态变更（任务编辑、删除、缩放调整等）都记录在我们的自定义历史系统中，可以无缝地回退或重新应用

## 构建主 Gantt 组件

让我们从构建承载 Gantt 图的主组件开始。在 `src/components/GanttComponent.tsx` 中创建。

首先，我们从 React 导入 `useEffect`、`useMemo` 和 `useRef`，从 Gantt 包导入主组件及相关类型，导入自定义的 `Toolbar` 组件，以及 Zustand 存储中的 `useGanttStore` 钩子：

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, { ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { useGanttStore } from '../store';
~~~

现在，设置组件并连接到 Zustand 存储：

~~~tsx
export default function DemoZustand() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const { tasks, links, config, setZoom, addTask, upsertTask, deleteTask, addLink, upsertLink, deleteLink, undo, redo } = useGanttStore();

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Zustand';  
  }, []);
~~~

- `ganttRef` 提供对 Gantt 实例的直接访问，以进行命令式操作  
- 我们在一次解构中直接提取状态和动作  
- `useEffect` 在组件挂载时设置文档标题

让我们配置 Gantt 图的模板，定义日期格式化和解析，以实现对数据的统一处理：

:::note
自 v9.1.3 以来，Gantt 会自动检测 ISO 日期字符串，这些模板覆盖不再需要。此处仅为向后兼容早期 Gantt 版本而显示。请参阅 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)。
:::

~~~ts
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);
~~~

最关键的部分 – 将 Gantt 数据的变更连接到 Zustand 存储：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') upsertTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') upsertLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, upsertTask, upsertLink, deleteTask, deleteLink]  
);
~~~

- `data.save` 回调处理来自 Gantt 图的所有数据修改  
- 它将不同的操作（创建、更新、删除）路由到相应的存储操作  
- 依赖项数组确保回调在存储操作变化时更新

如果你需要更深入地了解此回调，可以参阅 Basics 指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整组件：

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoom} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` 接收撤销/重做和缩放控件的处理程序  
- `ReactGantt` 组件接收所有数据、配置信息和回调函数

接着更新你的 `src/App.tsx`，以使用我们的 Gantt 组件：

~~~tsx
import './App.css';  
import GanttComponent from './components/GanttComponent';

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  );  
}

export default App;
~~~

## 设置 Zustand 存储

现在让我们使用 Zustand 构建我们的状态管理解决方案。创建 `src/store.ts`：

~~~ts
import { create } from 'zustand';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

type Snapshot = { tasks: SerializedTask[]; links: Link[]; config: GanttConfig };  
type State = {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
  recordHistory: () => void;  
  undo: () => void;  
  redo: () => void;

  setZoom: (level: ZoomLevel) => void;  
  addTask: (task: SerializedTask) => SerializedTask;  
  upsertTask: (task: SerializedTask) => void;  
  deleteTask: (id: string | number) => void;  
  addLink: (l: Link) => Link;  
  upsertLink: (l: Link) => void;  
  deleteLink: (id: string | number) => void;  
};
~~~

在这里我们声明了：

- **tasks**、**links** 和 **config** - 由存储管理的主 Gantt 数据  
- **past** 和 **future** - 用于 **撤销/重做历史** 的数组  
- **recordHistory()** - 在每次变更之前创建快照的辅助函数  
- **setZoom**、**addTask**、**upsertTask**、**deleteTask** 等 - 对任务和链接进行状态修改的操作

现在我们需要实现存储操作，以处理状态更新：

~~~ts
export const useGanttStore = create<State>((set, get) => ({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },

  past: [],  
  future: [],  
  maxHistory: 50,

  recordHistory: () => {  
    const { tasks, links, config, past, maxHistory } = get();  
    const snapshot = {  
      tasks: JSON.parse(JSON.stringify(tasks)),  
      links: JSON.parse(JSON.stringify(links)),  
      config: JSON.parse(JSON.stringify(config)),  
    };  
    set({  
      past: [...past.slice(-maxHistory + 1), snapshot],  
      future: [],  
    });  
  },

  undo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (past.length === 0) return;  
    const previous = past[past.length - 1];  
    set({  
      tasks: previous.tasks,  
      links: previous.links,  
      past: past.slice(0, -1),  
      future: [{ tasks, links, config }, ...future],  
      config: previous.config,  
    });  
  },

  redo: () => {  
    const { past, future, tasks, links, config } = get();  
    if (future.length === 0) return;  
    const next = future[0];  
    set({  
      tasks: next.tasks,  
      links: next.links,  
      past: [...past, { tasks, links, config }],  
      config: next.config,  
      future: future.slice(1),  
    });  
  },

  setZoom: (level) => {  
    get().recordHistory();  
    set({  
      config: { ...get().config, zoom: { ...get().config.zoom, current: level } },  
    });  
  },

  addTask: (task) => {  
    get().recordHistory();  
    const newTask = { ...task, id: `DB_ID:${task.id}` };  
    set({ tasks: [...get().tasks, newTask] });  
    return newTask;  
  },

  upsertTask: (task) => {  
    get().recordHistory();  
    const tasks = get().tasks;  
    const index = tasks.findIndex((x) => String(x.id) === String(task.id));  
    if (index !== -1) {  
      set({  
        tasks: [...tasks.slice(0, index), { ...tasks[index], ...task }, ...tasks.slice(index + 1)],  
      });  
    }  
  },

  deleteTask: (id) => {  
    get().recordHistory();  
    set({ tasks: get().tasks.filter((t) => String(t.id) !== String(id)) });  
  },

  addLink: (l) => {  
    get().recordHistory();  
    const newLink = { ...l, id: `DB_ID:${l.id}` };  
    set({ links: [...get().links, newLink] });  
    return newLink;  
  },

  upsertLink: (l) => {  
    get().recordHistory();  
    const links = get().links;  
    const index = links.findIndex((x) => String(x.id) === String(l.id));  
    if (index !== -1) {  
      set({  
        links: [...links.slice(0, index), { ...links[index], ...l }, ...links.slice(index + 1)],  
      });  
    }  
  },

  deleteLink: (id) => {  
    get().recordHistory();  
    set({ links: get().links.filter((l) => String(l.id) !== String(id)) });  
  },  
}));
~~~

- `set` 函数直接更新状态  
- `get` 函数用于访问当前状态值  
- `setZoom` 更新甘特图配置中的缩放级别  
- `addTask` 使用模拟数据库 ID 创建新任务  
- `upsertTask` 通过 ID 处理对现有任务的更新  
- `deleteTask` 根据 ID 移除任务  
- 链路操作也采用类似模式

### 历史管理（撤销/重做）

为了启用撤销和重做功能，我们定义了 **recordHistory**、**undo** 和 **redo**：

- *recordHistory()* 在修改之前创建当前甘特状态的深拷贝（“快照”）。  
- *undo()* 回滚到最近的快照并将当前状态保存在 `future` 中。  
- *redo()* 将 `future` 中的下一个快照重新应用到存储中。  

这些方法允许用户在最近的甘特状态变更之间来回移动。  

每个修改操作在执行更改之前都会调用 `recordHistory()`，以确保每次状态转变都被存储并可逆。

## 运行应用程序

最后，我们可以启动开发服务器并测试应用：

~~~bash
npm run dev
~~~

或：
~~~bash
yarn dev 
~~~ 

## 小结

在本教程中你已经：

- 创建了一个 Vite + React 项目  
- 添加了 React Gantt 并将其连接到 Zustand 存储  
- 在存储中实现基于快照的撤销/重做，使用 `past`/`future` 历史数组  
- 通过 Zustand 状态驱动缩放配置、任务和链接  
- 使用 `data.save` 回调，使 Gantt 图中的每一次更改都转化为存储操作

这使 Gantt 组件保持完全声明式，而所有变更逻辑和历史处理都封装在 Zustand 存储中。

## GitHub 示例仓库

遵循本教程的一个完整可运行项目已在 GitHub 提供：
https://github.com/dhtmlx/react-gantt-zustand-starter

## 后续步骤

如需继续深入学习，可以：

- 回顾此示例背后的概念 [](integrations/react/state/state-management-basics.md)
- 将存储驱动的状态与高级配置和模板结合，在 [React Gantt 总览](integrations/react/overview.md) 中查看
- 将同样的模式应用于其他状态管理器：
  - [Using React Gantt with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)