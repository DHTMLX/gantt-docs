--- 
title: 在 XState 中使用 React Gantt
sidebar_label: XState
description: "了解如何将 React Gantt 集成到基于 XState 的架构中。涵盖在状态机中建模甘特数据、处理来自 save 回调的事件，以及协调 UI 与业务逻辑。"
---

# React Gantt - XState Tutorial

本教程将指导你使用 Vite 构建一个 React TypeScript 应用，集成 DHTMLX React Gantt 组件，并使用 XState 管理状态。

## 先决条件

- 对 React、TypeScript、Vite 和 XState 有基本了解
- 建议阅读 [integrations/react/state/state-management-basics.md] 以了解数据绑定模式以及本教程所基于的 `data.save` 回调。

## 快速设置 - 创建项目

在开始之前，请安装 Node.js。

创建一个 Vite React + TypeScript 项目：

~~~bash  
npm create vite@latest react-gantt-xstate-demo -- --template react-ts  
cd react-gantt-xstate-demo  
~~~

现在让我们安装所需的依赖。

* 对于 **npm**： 

~~~bash
npm install xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

* 对于 **yarn**：

~~~bash
yarn add xstate @xstate/react @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~  

然后我们需要安装 React Gantt 包。

### 安装 React Gantt

按照 [React Gantt 安装指南](integrations/react/installation.md) 的说明安装 React Gantt。

在本教程中，我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~  

或

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~  

如果你已经使用 Professional 包，请将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`，在命令和导入中。

现在可以启动开发服务器：

~~~bash
npm run dev 
~~~  

你现在应该可以在 `http://localhost:5173` 看到你的 React 项目。

:::note
为了让甘特图占满页面的整个空间，需要从 `src` 文件夹中的 `App.css` 移除默认样式，并添加以下样式：

~~~css  
#root { 
  margin: 0; 
  padding: 0; 
  height: 100%; 
  width: 100%; 
} 
~~~
:::

## 设置示例数据和配置

在 `src/seed/Seed.ts` 中创建甘特图的示例数据，将包含初始数据：

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

现在，让我们在 `src/components/Toolbar.tsx` 中添加一个 **Toolbar（工具栏）** 组件。

该组件为用户提供对常用甘特图控件的快速访问，例如在 Day、Month、Year 视图之间缩放，以及执行 **undo/redo** 操作。

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

我们使用 Material UI 组件（Button、ButtonGroup、Divider）和图标来创建一个简单、清晰的工具栏布局，为甘特图提供直观的控件。

工具栏接受以下可选属性，以便与我们的 XState 机器实现无缝集成：

- `onUndo` 和 `onRedo` - 将撤销/重做事件分派给状态机的回调函数。
- `onZoom` - 当用户单击缩放按钮时，将缩放更新事件发送给机器的回调。
- `currentZoom` - 指示当前活动的缩放级别，允许工具栏高亮显示选中的按钮。

“Day”、“Month”和“Year”按钮分别调用 `onZoom('day')`、`onZoom('month')`、`onZoom('year')`。被选中的缩放级别按钮使用 `variant="contained"`，其他按钮为 `outlined`，以清晰地指示当前状态。

工具栏直接通过事件派发连接到我们的 XState 机器：

- 缩放控件：当用户点击“Day”时，我们向状态机发送一个带有级别的 `SET_ZOOM` 事件，该事件通过预定义的操作来更新甘特图的配置  
- 撤销按钮向机器发送 `UNDO` 事件，触发撤销以回退到先前状态；重做按钮发送 `REDO` 事件以重新应用更改  
- 所有状态更改（任务编辑、删除、缩放调整等）都作为离散事件在状态机中处理，并且可以通过历史系统进行撤销或重新应用  

## 创建主 Gantt 组件

让我们从构建将承载甘特图的主组件开始。创建 `src/components/GanttComponent.tsx`。

首先，从 React 导入 `useEffect`、`useMemo` 和 `useRef`，导入甘特图包中的主组件 `ReactGantt` 及相关类型，导入自定义的 `Toolbar` 组件，以及从 XState 设置中导入 `ganttMachine` 的定义：

~~~tsx
import { useCallback, useEffect, useMemo } from 'react';
import { useMachine } from '@xstate/react';
import ReactGantt, {
  type ReactGanttRef,
  type ReactGanttProps,
  type Link,
  type SerializedTask,
} from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import Toolbar from './Toolbar';
import { ganttMachine } from '../machine';
import { type ZoomLevel } from '../seed/Seed';
~~~

现在，让我们设置该组件并将其与 XState 机器连接起来：

~~~tsx
export default function DemoXState() {  
  const [state, send] = useMachine(ganttMachine);  
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | XState';  
  }, []);
}
~~~

- 我们使用 `@xstate/react` 的 `useMachine` 钩子将组件连接到状态机  
- 钩子返回当前的 `state` 和用于向机器派发事件的 `send` 函数  
- `ganttRef` 提供对 Gantt 实例的直接访问，以进行命令式操作  
- `useEffect` 在组件挂载时设置文档标题

让我们配置 Gantt 图的模板，以定义日期格式化和解析，以实现数据处理和事件处理的一致性：

:::note
自 v9.1.3 版本起，Gantt 会自动检测 ISO 日期字符串，因此这里的模板覆盖不再需要。为了兼容早期的 Gantt 版本，本文仍然显示它们。请参阅 [ISO 格式日期加载](guides/loading.md#loading-dates-in-iso-format)。
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (d) => d.toISOString(),
    parse_date: (s) => new Date(s),
  }),
  []
);

const handleUndo = useCallback(() => {  
  send({ type: 'UNDO' });  
}, [send]);

const handleRedo = useCallback(() => {  
  send({ type: 'REDO' });  
}, [send]);

const handleZoom = useCallback(  
  (level: ZoomLevel) => {  
    send({ type: 'SET_ZOOM', level });  
  },  
  [send]  
);
~~~

我们使用 `useCallback` 来对撤销、重做和缩放操作的事件处理程序进行记忆化，避免组件更新时不必要的重新渲染。每个处理程序都向状态机派发特定的事件类型和所需的载荷。

将甘特图数据变更与 XState 机器连接的最关键部分：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') {  
          send({ type: 'ADD_TASK', task });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_TASK', task });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_TASK', id });  
        }  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') {  
          send({ type: 'ADD_LINK', link });  
        } else if (action === 'update') {  
          send({ type: 'UPSERT_LINK', link });  
        } else if (action === 'delete') {  
          send({ type: 'DELETE_LINK', id });  
        }  
      }  
    },  
  }),  
  [send]  
);
~~~

- `data.save` 回调处理来自甘特图的所有数据修改  
- 它通过 `send` 函数将不同的操作（创建、更新、删除）路由到相应的机器事件  
- 甘特图中的每个用户操作都会成为发送到状态机的离散事件  
- 依赖数组确保当 `send` 函数变化时回调会更新

如果你需要对该回调进行更深的解释，可以查看 Basics 指南中的 [通过 data.save 处理变更](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整的组件：

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar  
      onUndo={handleUndo}  
      onRedo={handleRedo}  
      currentZoom={state.context.config.zoom.current}  
      onZoom={handleZoom}  
    />  
    <ReactGantt  
      ref={ganttRef}  
      tasks={state.context.tasks}  
      links={state.context.links}  
      config={state.context.config}  
      templates={templates}  
      data={data}  
    />  
  </div>  
);  
~~~  

- 工具栏接收将 `UNDO`、`REDO` 和 `SET_ZOOM` 事件发送到状态机的事件处理程序  
- ReactGantt 组件从状态机的上下文中获取所有数据（`tasks`、`links`、`config`）

然后将我们的 Gantt 组件应用到 `src/App.tsx`：

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

## 设置 XState 机器

现在让我们使用 XState 构建状态管理解决方案。创建 `src/machine.ts`：

~~~ts
import { createMachine, assign } from 'xstate';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels, type ZoomLevel } from './seed/Seed';

export interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

export interface ContextType {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;

  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}
~~~  

- 我们为机器的上下文和快照结构定义 TypeScript 接口  
- `ContextType` 定义了所有与甘特相关的状态，包括任务、连线、配置和历史记录跟踪  
- `Snapshot` 接口表示撤销/重做功能所使用的状态结构

现在定义机器将处理的事件类型：

~~~ts
type SetZoomEvent = { type: 'SET_ZOOM'; level: ZoomLevel };  
type UndoEvent = { type: 'UNDO' };  
type RedoEvent = { type: 'REDO' };  
type AddTaskEvent = { type: 'ADD_TASK'; task: SerializedTask };  
type UpsertTaskEvent = { type: 'UPSERT_TASK'; task: SerializedTask };  
type DeleteTaskEvent = { type: 'DELETE_TASK'; id: string | number };  
type AddLinkEvent = { type: 'ADD_LINK'; link: Link };  
type UpsertLinkEvent = { type: 'UPSERT_LINK'; link: Link };  
type DeleteLinkEvent = { type: 'DELETE_LINK'; id: string | number };

type EventType =  
  | SetZoomEvent  
  | UndoEvent  
  | RedoEvent  
  | AddTaskEvent  
  | UpsertTaskEvent  
  | DeleteTaskEvent  
  | AddLinkEvent  
  | UpsertLinkEvent  
  | DeleteLinkEvent;
~~~  

- 每次用户交互都表示为具有特定类型和载荷的离散事件  
- 事件是强类型的，确保整个应用的类型安全

让我们创建状态机配置：

~~~ts
const createSnapshot = (ctx: ContextType): Snapshot => ({  
  tasks: structuredClone(ctx.tasks),  
  links: structuredClone(ctx.links),  
  config: structuredClone(ctx.config),  
});

export const ganttMachine = createMachine(  
  {  
    id: 'gantt',  
    types: {  
      context: {} as ContextType,  
      events: {} as EventType,  
    },  
    context: {  
      tasks: seedTasks,  
      links: seedLinks,  
      config: { zoom: defaultZoomLevels },  
      past: [],  
      future: [],  
      maxHistory: 50,  
    },  
    initial: 'ready',  
    states: {  
      ready: {  
        on: {  
          SET_ZOOM: { actions: ['pushHistory', 'setZoom'] },  
          UNDO: { actions: 'undo' },  
          REDO: { actions: 'redo' },

          ADD_TASK: { actions: ['pushHistory', 'addTask'] },  
          UPSERT_TASK: { actions: ['pushHistory', 'upsertTask'] },  
          DELETE_TASK: { actions: ['pushHistory', 'deleteTask'] },

          ADD_LINK: { actions: ['pushHistory', 'addLink'] },  
          UPSERT_LINK: { actions: ['pushHistory', 'upsertLink'] },  
          DELETE_LINK: { actions: ['pushHistory', 'deleteLink'] },  
        },  
      },  
    },  
  },  
)
~~~  

机器配置：

- 该机器只有一个 `ready` 状态，在此状态下可进行所有甘特相关操作  
- 每个事件都会触发一系列动作以更新机器的上下文  
- `context` 定义了带有示例数据的初始状态，以及空的历史记录数组  
- 事件处理程序指定接收到事件时应执行的操作

现在实现处理状态更新的动作：

~~~ts
{  
  actions: {  
    pushHistory: assign(({ context }) => {  
      const snap = createSnapshot(context);  
      const past = [...context.past, snap];  
      if (past.length > context.maxHistory) past.shift();

      return {  
        past,  
        future: [],  
      };  
    }),  
    setZoom: assign(({ context, event }) => ({  
      config: {  
        ...context.config,  
        zoom: { ...context.config.zoom, current: (event as SetZoomEvent).level },  
      },  
    })),

    undo: assign(({ context }) => {  
      if (context.past.length === 0) return {};

      const previous = context.past[context.past.length - 1];  
      const future = [createSnapshot(context), ...context.future];

      return {  
        ...previous,  
        past: context.past.slice(0, -1),  
        future,  
      };  
    }),

    redo: assign(({ context }) => {  
      if (context.future.length === 0) return {};

      const next = context.future[0];  
      const past = [...context.past, createSnapshot(context)];

      return {  
        ...next,  
        past,  
        future: context.future.slice(1),  
      };  
    }),
  }
}
~~~  

历史管理动作：

* `pushHistory` 会创建当前状态的快照并将其添加到历史记录栈中  
* `undo` 会从 `past` 数组中恢复先前的状态，并将当前状态移动到 `future`  
* `redo` 会从 `future` 重新应用下一个状态，并将当前状态保存到 `past`

让我们实现甘特特定的数据操作：

~~~ts
addTask: assign(({ context: ctx, event }) => ({  
  tasks: [...ctx.tasks, { ...(event as AddTaskEvent).task, id: `DB_ID:${(event as AddTaskEvent).task.id}` }],  
})),

upsertTask: assign(({ context: ctx, event }) => ({  
  tasks: ctx.tasks.map((task) =>  
    String(task.id) === String((event as UpsertTaskEvent).task.id)  
      ? { ...task, ...(event as UpsertTaskEvent).task }  
      : task  
  ),  
})),

deleteTask: assign(({ context, event }) => ({  
  tasks: context.tasks.filter((t) => String(t.id) !== String((event as DeleteTaskEvent).id)),  
})),

addLink: assign(({ context, event }) => ({  
  links: [...context.links, { ...(event as AddLinkEvent).link, id: `DB_ID:${(event as AddLinkEvent).link.id}` }],  
})),

upsertLink: assign(({ context, event }) => ({  
  links: context.links.map((l) =>  
    String(l.id) === String((event as UpsertLinkEvent).link.id) ? { ...l, ...(event as UpsertLinkEvent).link } : l  
  ),  
})),

deleteLink: assign(({ context, event }) => ({  
  links: context.links.filter((l) => String(l.id) !== String((event as DeleteLinkEvent).id)),  
})),  
~~~  

- `addTask` 使用模拟数据库 ID 创建新任务并将其添加到任务列表中  
- `upsertTask` 通过 ID 更新现有任务  
- `deleteTask` 通过 ID 从任务列表中删除任务  
- 链接操作同样遵循相同模式 (`addLink`、`upsertLink`、`deleteLink`)  
- 每个数据修改动作都与 `pushHistory` 配对，以确保撤销/重做功能  
- `assign` 函数用于不可变地更新机器的上下文

## 运行应用

最后，我们可以运行开发服务器并测试应用：

~~~bash
npm run dev
~~~  

或：

~~~bash
yarn dev 
~~~ 

## 小结

在本教程中你已经完成了：

- 创建了一个 Vite + React 项目  
- 添加了 React Gantt，并通过 `useMachine` 将它连接到 XState 机器  
- 在机器上下文中建模了任务、连线和缩放配置  
- 使用基于快照的撤销/重做实现，利用 `past`/`future` 历史数组和 `pushHistory` 动作  
- 使用 `data.save` 回调，使甘特图的每次变更都成为强类型的 XState 事件

这使得 Gantt 组件保持完全声明式，同时所有变更逻辑和历史处理都在状态机内部完成。

## GitHub 演示仓库

一个遵循本教程的完整可运行项目已在 GitHub 上提供：

[A complete working project that follows this tutorial is provided on GitHub](https://github.com/dhtmlx/react-gantt-xstate-starter).

## 下一步

要进一步深入：

- 重新审视此示例背后的概念，请参阅 [](integrations/react/state/state-management-basics.md)
- 将 XState 机器与高级配置和模板相结合，参阅 [React Gantt 概览](integrations/react/overview.md)
- 将此基于 XState 的架构与其他状态管理器进行比较：
  - [使用 Redux Toolkit 的 React Gantt](integrations/react/state/redux-toolkit.md)
  - [MobX 的 React Gantt](integrations/react/state/mobx.md)
  - [Zustand 的 React Gantt](integrations/react/state/zustand.md)
  - [Jotai 的 React Gantt](integrations/react/state/jotai.md)
  - [Valtio 的 React Gantt](integrations/react/state/valtio.md)