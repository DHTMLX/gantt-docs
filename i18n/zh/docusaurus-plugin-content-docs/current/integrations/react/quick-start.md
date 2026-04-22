--- 
title: React Gantt 快速入门
sidebar_label: 快速入门
description: "使用 React Gantt 组件的逐步指南"
---

# React Gantt 快速入门

:::note
本教程涵盖 DHTMLX Gantt 的 **商业版、企业版和 Ultimate 版**中包含的 React 包装器。
如果您使用的是 **Individual** 或 **GPL** 版，请参阅替代指南：
[如何开始使用 React](integrations/react/js-gantt-react.md)。
:::

**React Gantt** 组件是 **DHTMLX Gantt** 的官方包装器。
本指南将带你创建一个小型 React 应用并使用评估包渲染一个基本的甘特图。

如果你是 React 新手，请从官方 [React 文档](https://react.dev/learn) 开始。查看 [在 GitHub 上完整的、遵循本教程的工作示例项目](https://github.com/dhtmlx/react-gantt-quick-start)。

## 版本要求

- React **18 或更高版本**

## 创建一个新的 React 项目

要创建一个 React 项目并进入项目目录，请运行以下命令：

~~~bash
npm create vite@latest react-gantt-quick-start -- --template react-ts
cd react-gantt-quick-start
~~~

### 安装 React Gantt

按照 [React Gantt 安装指南](integrations/react/installation.md) 的说明安装 React Gantt。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

## 添加演示数据

我们将在此示例中使用静态数据。创建一个名为 `src/demoData.ts` 的文件：

~~~ts
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  ...
];
~~~

## 创建一个 Gantt 组件

要添加一个 Gantt 组件，请创建 `src/components/Gantt/Gantt.tsx` 文件，内容如下：

~~~tsx
import Gantt, {
  ReactGanttRef,
  Task,
  Link,
  GanttConfig
} from '@dhtmlx/trial-react-gantt';

import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';
import { useRef } from 'react';

export interface GanttProps {
  tasks: Task[];
  links: Link[];
}

export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);

  const config: GanttConfig = {
    grid_width: 500,
    scale_height: 90,
    scales: [
      { unit: "year", step: 1, date: "%Y" },
      { unit: "month", step: 1, date: "%M" },
      { unit: "day", step: 1, date: "%d %M" }
    ]
  };

  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{ 
        save: (entity, action, data, id) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        }
      }}
    />
  );
}
~~~


## 在应用中渲染 Gantt

要显示 Gantt，请用以下代码替换 `src/App.tsx` 的内容：

~~~tsx
import GanttChart from './components/Gantt/Gantt';
import { tasks, links } from './demoData';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

之后，使用下面的命令运行应用：

~~~bash
npm run dev
~~~

此时，您已经拥有一个 **功能完备的 React + DHTMLX Gantt 应用**。

该设置代表实现以下功能所需的 **最低配置**：

- 渲染一个甘特图
- 显示任务和链接
- 应用一个基本的刻度配置
- 通过 React ref 附加 Gantt 实例
- 通过 `data.save` 回调接收事件

这是在 [GitHub 演示项目](https://github.com/dhtmlx/react-gantt-quick-start) 中使用的同一个最小示例。

从这里开始，您可以通过添加更多高级功能来继续：

- 将数据与 React 状态同步
- 从后端加载/保存数据
- 添加模板和自定义渲染
- 启用插件（自动排程、关键路径）
- 添加资源、日历或分组

接下来的各节将逐一介绍这些能力。


## 将 React 状态作为数据源（推荐用于大多数 React 应用）
在实际应用中，任务和链接通常来自 React 状态。下面是一个完整示例，其中 Gantt 通过 `data.save` 回调将更改发送回 React。

~~~tsx
import { useState } from "react";
import Gantt from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";
import { tasks as initialTasks, links as initialLinks } from "./demoData";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [links, setLinks] = useState(initialLinks);

  return (
    <div style={{ height: "100vh" }}>
      <Gantt
        tasks={tasks}
        links={links}
        data={{
          save: (entity, action, item, id) => {
            if (entity === "task") {
              if (action === "create") setTasks(tasks => [...tasks, item]);
              if (action === "update") setTasks(tasks => tasks.map(x => x.id === id ? item : x));
              if (action === "delete") setTasks(tasks => tasks.filter(x => x.id !== id));
            }
            if (entity === "link") {
              if (action === "create") setLinks(links => [...links, item]);
              if (action === "update") setLinks(links => links.map(x => x.id === id ? item : x));
              if (action === "delete") setLinks(links => links.filter(x => x.id !== id));
            }
          }
        }}
      />
    </div>
  );
}
~~~

### 为什么选择这种模式

- React 总是看到与 Gantt UI 相同的数据  
- 与 Redux / Zustand / Jotai / MobX 完美协同  
- 便于与后端 API 同步


## 替代模式：Gantt 作为数据源
（适用于非常大的数据集或大量自动排程）

在此模式下，React 不拥有任务/链接的数据。

~~~tsx
<Gantt
  data={{
    load: "/api/gantt-data",
    save: "/api/gantt-data"
  }}
/>
~~~

### 何时更应选择此模式

- 上万条任务  
- 需要大量自动排程更新  
- 你希望最小化 React 渲染开销  


## 使用模板 
（从模板函数返回 React 元素）

模板几乎可以自定义图表的每个部分。

~~~tsx
const templates = {
  task_text: (start, end, task) => (
    <span style={{ color: "red" }}>#{task.id}: {task.text}</span>
  )
};

<Gantt templates={templates} />
~~~

### 更多细节

请参阅完整章节： [React Gantt 模板文档](integrations/react/configuration-props.md)。


## GitHub 演示仓库

一个遵循本教程的完整可运行项目已在 GitHub 上提供。

## 下一步

- 研究所有可用的 [React Gantt 属性](integrations/react/configuration-props.md)
- 在 [Guides](guides.md) 中探索高级的 Gantt 功能