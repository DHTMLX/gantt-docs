---
title: 使用 React Gantt 与 Jotai
sidebar_label: Jotai
description: "如何将 Gantt 任务、连线和资源存储在 Jotai 原子中，并通过 save 回调进行更新。为 React Gantt 提供一个最小、灵活的状态管理方案。"
---

# React Gantt - Jotai 教程

本教程将引导你创建一个使用 Vite 的 React TypeScript 应用，集成 DHTMLX React Gantt 组件，并使用 Jotai 管理状态。

## 前提条件

- 具备 React、TypeScript、Vite 与 Jotai 的基础知识
- 推荐：阅读 [](integrations/react/state/state-management-basics.md) 以理解数据绑定模式以及本教程基于的 `data.save` 回调。

## 快速入门 - 创建项目

在开始之前，请先安装 [Node.js](https://nodejs.org/en/)。

创建一个 Vite React + TypeScript 项目：

~~~bash  
npm create vite@latest react-gantt-jotai-demo -- --template react-ts  
cd react-gantt-jotai-demo  
~~~

现在让我们安装所需的依赖。

* 对于 **npm**: 

~~~bash
npm install jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**:

~~~bash
yarn add jotai @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

然后我们需要安装 React Gantt 包。

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

如果你已经使用 Professional 套件，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。


现在你可以启动开发服务器：

~~~bash
npm run dev 
~~~

现在你应该可以在 `http://localhost:5173` 上看到正在运行的 React 项目。

:::note
为了让 Gantt 占满整个页面，请移除 `src` 文件夹中的 `App.css` 的默认样式，并添加如下样式：

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

现在，让我们在 `src/components/Toolbar.tsx` 中添加一个 **Toolbar** 组件。

该组件为用户提供对常用 Gantt 控件的快速访问，例如在 *day*、*month*、和 *year* 视图之间进行缩放，以及执行 **undo/redo** 操作。

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

我们使用 Material UI 组件（Button、ButtonGroup、Divider 及图标）来创建一个简单、干净的工具栏布局，为 Gantt 图提供直观的控件。

该工具栏接受以下可选属性，便于与我们基于 Jotai 的存储进行无缝集成：

- `onUndo` 和 `onRedo` — 回调，用于触发撤销/重做逻辑
- `onZoom` — 回调，在用户点击缩放按钮时更新缩放级别
- `currentZoom` — 指示当前活动的缩放级别，允许工具栏高亮显示所选按钮

“Day”、“Month”和“Year”的按钮分别调用 `onZoom('day')`、`onZoom('month')`、或 `onZoom('year')`。被选中的缩放级别按钮使用 `variant="contained"`，其他按钮则为 `outlined`，为当前状态提供清晰的视觉提示。 

在完整示例中，这些回调函数连接到处理缩放和历史更新的 Jotai 写入原子。

## 创建主 Gantt 组件

让我们构建承载 Gantt 图的主组件，使用 Jotai 进行状态管理。创建 `src/components/GanttComponent.tsx`。

首先，我们导入必要的 React 钩子、以及来自 DHTMLX 的主 ReactGantt 组件和类型。对于状态管理，我们使用 Jotai 的原子方法：

~~~tsx
import { useEffect, useMemo, useRef } from 'react';  
import ReactGantt, {  
  type ReactGanttRef,  
  type ReactGanttProps,  
  type Link,  
  type SerializedTask,  
} from '@dhtmlx/trial-react-gantt';  
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';

import { useAtom, useSetAtom } from 'jotai';  
import {  
  ganttStateAtom,  
  undoAtom,  
  redoAtom,  
  setZoomAtom,  
  addTaskAtom,  
  updateTaskAtom,  
  deleteTaskAtom,  
  addLinkAtom,  
  updateLinkAtom,  
  deleteLinkAtom,  
} from '../store';

import Toolbar from './Toolbar';
~~~

`useAtom` 和 `useSetAtom` 钩子将组件连接到原子状态。

现在，让我们设置组件并将其连接到我们的 Jotai 原子：

~~~tsx
export default function DemoJotai() {  
  const ganttRef = useRef<ReactGanttRef>(null);

  const [ganttState] = useAtom(ganttStateAtom);  
  const { tasks, links, config } = ganttState;  
  const setZoomLevel = useSetAtom(setZoomAtom);  
  const undo = useSetAtom(undoAtom);  
  const redo = useSetAtom(redoAtom);  
  const addTask = useSetAtom(addTaskAtom);  
  const updateTask = useSetAtom(updateTaskAtom);  
  const deleteTask = useSetAtom(deleteTaskAtom);  
  const addLink = useSetAtom(addLinkAtom);  
  const updateLink = useSetAtom(updateLinkAtom);  
  const deleteLink = useSetAtom(deleteLinkAtom);

  useEffect(() => {  
    document.title = 'DHTMLX React Gantt | Jotai';  
  }, []);
}
~~~

- `ganttRef` 提供对 Gantt 实例的直接访问，用于命令式操作  
- 我们使用 `useAtom` 读取完整的 gantt 状态，使用 `useSetAtom` 进行单独的操作  
- 每个操作（setZoom、undo、redo 等）都是独立的原子，可以单独使用  
- `useEffect` 设置组件挂载时的文档标题

让我们配置 Gantt 图的模板，定义日期格式化与解析，以实现一致的数据处理：

:::note
自 v9.1.3 版本起，Gantt 会自动检测 ISO 日期字符串，这些模板覆盖不再需要。这里为了兼容早期版本的 Gantt，仍然展示它们。
See [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)。
:::

~~~tsx
const templates: ReactGanttProps['templates'] = useMemo(
  () => ({
    format_date: (date: Date) => date.toISOString(),
    parse_date: (value: string) => new Date(value),
  }),
  []
);
~~~

最关键的部分是将 Gantt 数据变更连接到我们的 Jotai 原子：

~~~tsx
const data: ReactGanttProps['data'] = useMemo(  
  () => ({  
    save: (entity, action, item, id) => {  
      if (entity === 'task') {  
        const task = item as SerializedTask;  
        if (action === 'create') return addTask(task);  
        else if (action === 'update') updateTask(task);  
        else if (action === 'delete') deleteTask(id);  
      } else if (entity === 'link') {  
        const link = item as Link;  
        if (action === 'create') return addLink(link);  
        else if (action === 'update') updateLink(link);  
        else if (action === 'delete') deleteLink(id);  
      }  
    },  
  }),  
  [addTask, addLink, updateTask, updateLink, deleteTask, deleteLink]  
);
~~~

- `data.save` 回调处理来自 Gantt 图的所有数据修改  
- 它将不同的操作（创建、更新、删除）路由到相应的 Jotai 原子设定器  
- 每个原子设定器独立更新其特定的状态片段  
- 依赖数组确保当原子设定器更改时回调也会更新

如果你需要对这个回调有更深入的解释，请参阅 Basics 指南中的 [Handling changes with data.save](integrations/react/state/state-management-basics.md#handlingchangeswithdatasave)。

最后，我们渲染完整组件：

~~~tsx
return (  
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>  
    <Toolbar onUndo={undo} onRedo={redo} currentZoom={config.zoom.current} onZoom={setZoomLevel} />  
    <ReactGantt ref={ganttRef} tasks={tasks} links={links} config={config} templates={templates} data={data} />  
  </div>  
);  
~~~

- `Toolbar` 接收用于撤销/重做和缩放控件的原子设定器  
- 每个属性（`tasks`、`links`、`config`）在相应原子更改时会自动更新

然后更新你的 `src/App.tsx` 以使用我们的 Gantt 组件：

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

## 创建用于状态管理的 Jotai 原子

现在让我们使用 Jotai 创建我们的状态管理方案。创建 `src/store.ts`：

~~~tsx
import { atom, type Getter, type Setter } from 'jotai';  
import type { Link, GanttConfig, SerializedTask } from '@dhtmlx/trial-react-gantt';  
import { seedTasks, seedLinks, defaultZoomLevels } from './seed/Seed';  
import type { ZoomLevel } from './seed/Seed';

interface GanttState {  
  tasks: SerializedTask[];  
  links: Link[];  
  config: GanttConfig;  
}
~~~

我们引入 Jotai 的 `atom`、`Getter` 和 `Setter` 类型，并为我们的 Gantt 状态结构定义 TypeScript 接口。

让我们定义保存我们 Gantt 数据的主状态原子：

~~~ts
export const ganttStateAtom = atom<GanttState>({  
  tasks: seedTasks,  
  links: seedLinks,  
  config: { zoom: defaultZoomLevels },  
});

const maxHistory = 50;

export const pastAtom = atom<GanttState[]>([]);  
export const futureAtom = atom<GanttState[]>([]);
~~~

- `ganttStateAtom` 保存当前的 Gantt 状态，包括任务、连线和配置  
- `pastAtom` 与 `futureAtom` 管理撤销/重做的历史栈  
- 为了避免内存问题，我们设置了一个最大历史记录长度

在这里，我们用 Jotai 的派生原子实现撤销/重做功能：

~~~ts
const pushHistory = (get: Getter, set: Setter, state: GanttState) => {  
  const past = [...get(pastAtom), state];  
  if (past.length > maxHistory) past.shift();  
  set(pastAtom, past);  
  set(futureAtom, []);  
};

export const undoAtom = atom(null, (get, set) => {  
  const past = get(pastAtom);  
  if (past.length === 0) return;  
  const previous = past[past.length - 1];  
  set(pastAtom, past.slice(0, -1));  
  set(futureAtom, [get(ganttStateAtom), ...get(futureAtom)]);  
  set(ganttStateAtom, previous);  
});

export const redoAtom = atom(null, (get, set) => {  
  const future = get(futureAtom);  
  if (future.length === 0) return;  
  const next = future[0];  
  set(futureAtom, future.slice(1));  
  set(pastAtom, [...get(pastAtom), get(ganttStateAtom)]);  
  set(ganttStateAtom, next);  
});
~~~

- `pushHistory` 会创建当前状态的快照并更新历史栈  
- `undoAtom` 与 `redoAtom` 是写入型原子，负责状态转换  
- Jotai 的 `get` 与 `set` 函数提供对其他原子的访问
- 每次历史操作都保持过去和未来栈的完整性

让我们用 Jotai 原子实现任务的 CRUD 操作：

~~~ts
export const addTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: [...get(ganttStateAtom).tasks, { ...task, id: `DB_ID:${task.id}` }],  
  });  
  return { ...task, id: `DB_ID:${task.id}` };  
});

export const updateTaskAtom = atom(null, (get, set, task: SerializedTask) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.map((t) => (String(t.id) === String(task.id) ? { ...t, ...task } : t)),  
  });  
});

export const deleteTaskAtom = atom(null, (get, set, id: string | number) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    tasks: get(ganttStateAtom).tasks.filter((task) => String(task.id) !== String(id)),  
  });  
});
~~~

- 每个原子都遵循 `atom(null, (get, set, payload) => { ... })` 的写入型模式
- `addTaskAtom` 使用模拟数据库的 ID 创建新任务
- `updateTaskAtom` 更新现有任务
- `deleteTaskAtom` 根据 ID 删除任务
- 所有操作在进行更改前都会自动推送历史
- 这也是实现链接 CRUD 所采用的相同模式

实现缩放级别配置：

~~~ts
export const setZoomAtom = atom(null, (get, set, level: ZoomLevel) => {  
  pushHistory(get, set, get(ganttStateAtom));  
  set(ganttStateAtom, {  
    ...get(ganttStateAtom),  
    config: { ...get(ganttStateAtom).config, zoom: { ...get(ganttStateAtom).config.zoom, current: level } },  
  });  
});
~~~

`setZoomAtom` 处理带有完整历史记录跟踪的缩放级别变更。

## 运行应用

最后，我们可以运行开发服务器并测试我们的应用：

~~~bash
npm run dev
~~~

或：

~~~bash
yarn dev 
~~~ 

## 总结

在本教程中你已经完成了：

- 创建了一个 Vite + React 项目
- 添加了 React Gantt，并将其连接到一组 Jotai 原子
- 将任务、连线和缩放配置建模在单一的 `ganttStateAtom` 中
- 实现了基于快照的撤销/重做，使用 `pastAtom`/`futureAtom`，并共享 `pushHistory` 助手
- 通过 Jotai 状态驱动缩放配置、任务和连线
- 使用 `data.save` 回调，使 Gantt 图中的每次变更都应用于 Jotai 写入原子

这使 Gantt 组件保持完全声明式，而所有变更逻辑与历史处理都封装在你的 Jotai 存储中。

## GitHub 演示仓库

一个遵循本教程的完整工作项目已在 [GitHub](https://github.com/dhtmlx/react-gantt-jotai-starter) 上提供。

## 下一个步骤

若要进一步深入：

- 重新查看此示例背后的概念 [](integrations/react/state/state-management-basics.md)
- 在 [React Gantt 概览](integrations/react/overview.md) 中，将 Jotai 驱动的状态与高级配置和模板相结合
- 在其他状态管理器中探索相同的模式：
  - [使用 Redux Toolkit 的 React Gantt](integrations/react/state/redux-toolkit.md)
  - [使用 MobX 的 React Gantt](integrations/react/state/mobx.md)
  - [使用 XState 的 React Gantt](integrations/react/state/xstate.md)
  - [使用 Zustand 的 React Gantt](integrations/react/state/zustand.md)
  - [使用 Valtio 的 React Gantt](integrations/react/state/valtio.md)