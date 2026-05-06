---
title: 使用 Redux Toolkit 的 React Gantt
sidebar_label: Redux Toolkit
description: "一步步指南，将 React Gantt 与 Redux Toolkit 集成。"
---

# React Gantt - Redux Toolkit 教程

本教程将引导你创建一个带有 TypeScript 的 React 应用，使用 Vite 构建，集成 DHTMLX React Gantt 组件，并通过 Redux Toolkit 来管理状态。

## 先决条件

- 具备基本的 React、TypeScript 与 Redux 知识
- 推荐：阅读 [](integrations/react/state/state-management-basics.md) 以了解数据绑定模式，以及本教程所依赖的 `data.save` 回调。`data.save` 中的标记和 API 名称保持不变。

## 快速入门 - 创建项目

在开始之前，请先安装 [Node.js](https://nodejs.org/en/)。

创建一个 Vite + React + TypeScript 项目：

~~~bash  
npm create vite@latest react-gantt-redux-demo -- --template react-ts  
cd react-gantt-redux-demo  
~~~

现在让我们安装所需的依赖。

* 对于 **npm**： 

~~~bash
npm install @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**：

~~~bash
yarn add @reduxjs/toolkit react-redux @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

接着我们需要安装 React Gantt 包。 

### 安装 React Gantt

按照 [React Gantt installation guide](integrations/react/installation.md) 中的说明进行安装。

在本教程中，我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。


现在可以启动开发服务器了：

~~~bash
npm run dev 
~~~

现在你的 React 项目应该在 `http://localhost:5173` 运行。

:::note
为了让 Gantt 占满整个页面区域，你需要移除 `src` 文件夹中的 `App.css` 的默认样式，并添加以下样式：

~~~css  
#root {  
  margin: 0;  
  padding: 0;  
  height: 100%;  
  width: 100%;  
}  
~~~
:::

## 配置 Redux 存储 

创建 `src/redux/store.ts`。这会把 `gantt` slice 连接到 Redux 存储：

~~~ts
import { configureStore } from '@reduxjs/toolkit';  
import ganttReducer from './ganttSlice';

export const store = configureStore({  
  reducer: {  
    gantt: ganttReducer,  
  },  
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
~~~

`configureStore` 以直观的默认设置来配置 Redux（DevTools、thunk）。将 `RootState` 和 `AppDispatch` 进行类型化，便于在整个应用中给 `useSelector` 和 `useDispatch` 使用类型。 

## 创建 Redux Slice

创建 `src/redux/ganttSlice.ts`，处理所有与 Gantt 相关的数据：任务、 links（依赖关系）以及诸如缩放级别之类的配置。

这个切片还引入 **撤销/重做 功能**，通过快照历史记录实现，允许用户在图表中回退或重新应用先前的修改。 

~~~ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';  
import type { SerializedTask, Task, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';  
import { defaultZoomLevels, seedLinks, seedTasks, type ZoomLevel } from '../common/Seed';  
import { type WritableDraft } from 'immer';

interface Snapshot {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
  past: Snapshot[];  
  future: Snapshot[];  
  maxHistory: number;  
}

const initialState: GanttState = {  
  tasks: seedTasks,  
  links: seedLinks,  
  config: {  
    zoom: defaultZoomLevels,  
  },  
  past: [],  
  future: [],  
  maxHistory: 50,  
};

const createSnapshot = (state: GanttState): WritableDraft<Snapshot> => ({  
  tasks: JSON.parse(JSON.stringify(state.tasks)),  
  links: JSON.parse(JSON.stringify(state.links)),  
  config: JSON.parse(JSON.stringify(state.config)),  
});

const pushHistory = (state: GanttState) => {  
  state.past.push(createSnapshot(state) as Snapshot);  
  if (state.past.length > state.maxHistory) state.past.shift();  
  state.future = [];  
};

const ganttSlice = createSlice({  
  name: 'gantt',  
  initialState,  
  reducers: {  
    undo(state) {  
      if (state.past.length > 0) {  
        const previous = state.past[state.past.length - 1];  
        const newFuture = createSnapshot(state as GanttState);

        state.tasks = previous.tasks;  
        state.links = previous.links;  
        state.config = previous.config;  
        state.past = state.past.slice(0, -1);  
        state.future = [newFuture, ...state.future];  
      }  
    },  
    redo(state) {  
      if (state.future.length > 0) {  
        const next = state.future[0];  
        const newPast = createSnapshot(state as GanttState);

        state.tasks = next.tasks;  
        state.links = next.links;  
        state.config = next.config;  
        state.future = state.future.slice(1);  
        state.past = [...state.past, newPast];  
      }  
    },

    updateTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      const updatedTask = action.payload;  
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);  
      if (index !== -1) {  
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };  
      }  
    },  
    createTask(state, action: PayloadAction<SerializedTask>) {  
      pushHistory(state);

      state.tasks.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteTask(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.tasks = state.tasks.filter((task) => String(task.id) !== action.payload);  
    },  
    updateLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      const updatedLink = action.payload;  
      const index = state.links.findIndex((link) => link.id === updatedLink.id);  
      if (index !== -1) {  
        state.links[index] = { ...state.links[index], ...updatedLink };  
      }  
    },  
    createLink(state, action: PayloadAction<Link>) {  
      pushHistory(state);

      state.links.push({ ...action.payload, id: `DB_ID:${action.payload.id}` });  
    },  
    deleteLink(state, action: PayloadAction<string>) {  
      pushHistory(state);

      state.links = state.links.filter((link) => String(link.id) !== action.payload);  
    },  
    setZoom(state, action: PayloadAction<ZoomLevel>) {  
      pushHistory(state);

      state.config.zoom.current = action.payload;  
    },  
  },  
});

export const { undo, redo, updateTask, createTask, deleteTask, updateLink, createLink, deleteLink, setZoom } =  
  ganttSlice.actions;  
export default ganttSlice.reducer;
~~~

`GanttState` 包含三个新字段：`past`、`future` 和 `maxHistory`，共同实现用于撤销/重做操作的**时间旅行机制**。

为了支持撤销/重做，使用了两个辅助函数：

- **`createSnapshot(state)`** - 对当前 Gantt 数据进行深拷贝，以在某一时刻完整保存任务、链接和配置的副本。

- **`pushHistory(state)`** - 在任何修改操作前，将当前快照保存到 `past` 数组中，并清空 `future` 栈（以便重做仅应用于最近的一次撤销序列）。

下面对 `ganttSlice.ts` 的解释。  
`createSlice` 函数会自动生成：

1. The **reducers**（修改状态的函数）。  
2. The **action creators**（你可以从 UI 派发的函数）。

每个 reducer 都会更新 Gantt 状态的特定部分：

- **updateTask**：更新现有任务的数据（例如在编辑名称、日期或持续时间时）。  
- **createTask**：向状态中添加一个新任务。伪造的 `DB_ID:` 前缀模拟后端在保存到数据库后分配唯一 ID 的方式。  
- **deleteTask**：基于其 ID 将任务从存储中移除。  
- **updateLink, createLink, deleteLink**：这些与任务相关 reducer 的工作方式相同，但作用于 **links**（任务间的依赖关系）。  
- **setZoom**：在配置对象中更新当前缩放级别，并进行历史记录。  
- **undo**：从 `past` 恢复先前的快照，并将当前状态移动到未来。  
- **redo**：通过将快照从 `future` 移回到 `past`，重新应用先前撤销的状态。

每个修改操作在执行前都会调用 `pushHistory(state)`，这意味着用户可以对任何任务、链接或配置变更进行安全的撤销或重做。

## 设置示例数据和配置

在 `src/common/Seed.ts` 中创建示例数据，用于 Gantt 图表的初始数据：

~~~ts
import type { SerializedTask, Link, GanttConfig } from '@dhtmlx/trial-react-gantt';

export type ZoomLevel = 'day' | 'month' | 'year';

export const defaultZoomLevels: NonNullable<GanttConfig['zoom']> = {
  current: 'day',
  levels: [
    { 
      name: 'day',
      scale_height: 27,
      min_column_width: 80,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }],
    },
    {
      name: 'month',
      scale_height: 50,
      min_column_width: 120,
      scales: [
        { unit: 'month', format: '%F, %Y' },
        { unit: 'week', format: 'Week #%W' },
      ],
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 30,
      scales: [{ unit: 'year', step: 1, format: '%Y' }],
    },
  ],
};

export const seedTasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2025, 3, 2).toISOString(),
    duration: 17,
    progress: 0.4,
    parent: 0,
    open: true,
  }
  // ...
];

export const seedLinks: Link[] = [
  { id: 2, source: 2, target: 3, type: '0' },
  { id: 3, source: 3, target: 4, type: '0' },
  // ...
];
~~~

## 构建控制工具栏组件

接下来，在 `src/common/Toolbar.tsx` 中添加一个 **Toolbar** 组件。  

此组件为用户提供对常用 Gantt 控件的快速访问，例如在 *day*、*month*、*year* 视图之间切换，以及执行 **undo/redo** 操作。  

~~~tsx
import Divider from '@mui/material/Divider';  
import ButtonGroup from '@mui/material/ButtonGroup';  
import UndoIcon from '@mui/icons-material/Undo';  
import RedoIcon from '@mui/icons-material/Redo';  
import Button from '@mui/material/Button';  
import type { ZoomLevel } from './Seed';

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

我们使用 **Material UI 组件**（`Button`、`ButtonGroup`、`Divider` 和图标）来创建一个简洁、清晰的工具栏布局。

该工具栏接受以下可选属性：

- `onUndo` 和 `onRedo` - 撤销/重做操作的回调函数。  
- `onZoom` - 用户点击缩放按钮时触发的回调。  
- `currentZoom` - 指示工具栏当前处于哪个缩放级别，以便高亮显示选中的按钮。 

“Day”、“Month”、“Year” 按钮分别调用 `onZoom('day')`、`onZoom('month')`、`onZoom('year')`。被选中的缩放级别按钮使用 `variant="contained"`，其余为 `outlined`，为当前状态提供清晰的视觉提示。 

在本教程后续部分，我们将把这个工具栏与我们的存储操作连接起来：

- 当用户点击“Day”时，我们会从我们的存储中调用 `setZoom('day')`  
- 撤销按钮将触发存储的 `undo()` 方法，回退到前一个状态  
- 重做按钮将调用 `redo()` 以重新应用修改  
- 所有状态变更（任务编辑、删除、缩放调整等）都被记录在我们自定义的历史系统中，可以无缝地撤销或重新应用

这会将 Gantt 图的配置更新到全局状态中，UI 将自动使用新的缩放级别重新渲染。

让我们在 `src/components/GanttComponent.tsx` 中创建核心组件，把 DHTMLX React Gantt 与 Redux Toolkit 状态管理整合起来。这个组件将成为应用的核心，处理所有 Gantt 图表的交互与状态更新。

我们使用 `useMemo` 和 `useCallback` 钩子来通过避免不必要的重渲染来优化性能。`useMemo` 会缓存计算出的值（如配置对象），而 `useCallback` 会对回调函数进行记忆化。这样只有在依赖项发生变化时，这些对象和函数才会被重新创建。

接下来创建主组件并设置 Redux 集成：

~~~tsx
import React, { useRef, useEffect, useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';  
import ReactGantt, { GanttConfig, ReactGanttProps, Link, ReactGanttRef, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import {  
  undo,  
  redo,  
  updateTask,  
  createTask,  
  deleteTask,  
  updateLink,  
  createLink,  
  deleteLink,  
  setZoom,  
} from '../redux/ganttSlice';

import type { RootState, AppDispatch } from '../redux/store';  
import Toolbar from '../common/Toolbar';  
import { type ZoomLevel } from '../common/Seed';

const ReactGanttExample: React.FC = () => {  
  const ganttRef = useRef<ReactGanttRef>(null);  
  const dispatch = useDispatch<AppDispatch>();  
  const { tasks, links, config } = useSelector((state: RootState) => state.gantt);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Redux Toolkit';  
  }, []);
}
~~~

- `ganttRef` 让我们直接访问 Gantt 实例，以便调用撤销/重做等方法  
- `dispatch` 是向 Redux 存储发送动作的函数  
- 我们使用 `useSelector` 钩子从 Redux 状态中提取任务、链接和配置  
- `useEffect` 在组件挂载时设置文档标题

组件需要处理来自工具栏和 Gantt 图本身的用户操作。我们使用 `useCallback` 来对这些处理函数进行记忆化：  
~~~tsx
const handleUndo = useCallback(() => {  
  dispatch(undo());  
}, [dispatch]);

const handleRedo = useCallback(() => {  
  dispatch(redo());  
}, [dispatch]);

const handleZoomIn = useCallback(  
  (newZoom: ZoomLevel) => {  
    dispatch(setZoom(newZoom));  
  },  
  [dispatch]  
);
~~~

- `handleZoomIn` 派发一个动作以更新 Redux 状态中的缩放级别  
- `handleUndo` 和 `handleRedo` 派发切片中的 `undo`/`redo` 动作，从 `past` 或 `future` 恢复先前的状态  
- 这些函数作为回调传给 `Toolbar` 组件

现在我们使用 `useMemo` 来缓存配置对象，从而对 Gantt 图进行配置：

:::note
Since v9.1.3, Gantt automatically detects ISO date strings and these template overrides are no longer needed. They are shown here for compatibility with earlier Gantt versions. See [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).
:::

~~~tsx
const ganttConfig: GanttConfig = useMemo(() => ({ ...config }), [config]);

const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (date: string) => new Date(date),
  }),
  []
);
~~~

我们还需要处理 Gantt 图中的所有数据变更：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, payload, id) => {  
      if (entity === 'task') {  
        const task = payload as SerializedTask;  
        if (action === 'update') {  
          dispatch(updateTask(task));  
        } else if (action === 'create') {  
          dispatch(createTask(task));  
        } else if (action === 'delete') {  
          dispatch(deleteTask(String(id)));  
        }  
      } else if (entity === 'link') {  
        const link = payload as Link;  
        if (action === 'update') {  
          dispatch(updateLink(link));  
        } else if (action === 'create') {  
          dispatch(createLink(link));  
        } else if (action === 'delete') {  
          dispatch(deleteLink(String(id)));  
        }  
      }  
    },  
  }),  
  [dispatch]  
);
~~~

`data.save` 回调在 Gantt 图中发生任何变更时都会被调用。

它接收四个参数：  
  - `entity`：表示是 'task' 还是 'link'  
  - `action`：操作类型（'create'、'update'、'delete'）  
  - `payload`：被修改的实际数据  
  - `id`：被修改项的标识符  

根据实体和操作，我们派发相应的 Redux 动作。这在 Gantt 图的内部状态与我们的 Redux 存储之间创建了无缝连接。

如果你需要对这个回调有更深入的解释，请参阅 Basics 指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整组件：

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={handleUndo} onRedo={handleRedo} onZoom={handleZoomIn} currentZoom={config.zoom.current} />

    <ReactGantt tasks={tasks} links={links} config={ganttConfig} templates={templates} data={data} ref={ganttRef} />  
  </div>  
);  
~~~

## 集成 Redux Provider

更新你的 `src/main.tsx`，将 Redux 提供者加入应用：  

~~~tsx
import React from 'react';  
import { createRoot } from 'react-dom/client';  
import { Provider } from 'react-redux';  
import { store } from './redux/store';  
import './index.css';  
import App from './App';

createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>  
    <Provider store={store}>  
      <App />  
    </Provider>  
  </React.StrictMode>  
);
~~~

然后更新你的 `src/App.tsx`，使用我们实现的 Gantt 组件：

~~~tsx
import './App.css'  
import GanttComponent from './components/GanttComponent'

function App() {  
  return (  
    <div style={{ height: '100vh', width: '95vw' }}>  
      <GanttComponent />  
    </div>  
  )  
}

export default App
~~~

最后，我们可以启动开发服务器并测试应用： 

~~~bash
npm run dev
~~~

或： 
~~~bash
yarn dev  
~~~  

## 总结

本教程你已经完成了：

- 创建了一个 Vite + React 项目
- 添加了 React Gantt，并将其接入 Redux Toolkit 存储
- 在 `ganttSlice` 中实现了基于快照的撤销/重做
- 将 Material UI 工具栏与缩放和历史操作连接
- 使用 `data.save` 回调，使 Gantt 图中的每一次任务/链接变更成为 Redux 动作

结果是一个甘特图，其任务、链接和配置都被 Redux 状态完全驱动。

## GitHub 演示仓库

一个遵循本教程的完整可运行项目已在 GitHub 提供：[GitHub 演示仓库](https://github.com/dhtmlx/react-gantt-redux-starter)。

## 接下来怎么做

要继续深入了解，请参考以下内容：

- 回顾此示例背后的概念 [](integrations/react/state/state-management-basics.md)
- 将 Redux 驱动的状态与高级配置和模板结合，在 [React Gantt 概览](integrations/react/overview.md)
- 使用其他状态管理器探索同样的模式：
  - [Using React Gantt with Zustand](integrations/react/state/zustand.md)
  - [Using React Gantt with MobX](integrations/react/state/mobx.md)
  - [Using React Gantt with XState](integrations/react/state/xstate.md)
  - [Using React Gantt with Jotai](integrations/react/state/jotai.md)
  - [Using React Gantt with Valtio](integrations/react/state/valtio.md)