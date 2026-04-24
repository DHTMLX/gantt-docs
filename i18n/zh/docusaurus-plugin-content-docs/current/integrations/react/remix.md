---
title: Remix 结合 React Gantt
sidebar_label: Remix

---

# Remix 与 React Gantt

**Remix 快速入门**

您应熟悉 [React](https://react.dev/) 和 [Remix](https://remix.run/) 的基本概念。若尚未熟悉，请在开始本指南前参考他们的官方文档。

在本教程中，我们将创建一个简单的 Remix 应用并在页面上渲染一个甘特图。

## 创建一个项目

在创建新项目之前，请确保已安装 [Node.js](https://nodejs.org/)。

由于 Remix 现已作为 **React Router v7** 的一部分打包，推荐的搭建项目方式是：

~~~bash
npx create-react-router@latest
~~~

在提示时，请选择：
- Project name: **react-gantt-remix-quick-start**
- Use the default template (React, TypeScript, TailwindCSS, SSR)
- **Install dependencies**: Yes

然后进入你的项目文件夹：

~~~bash
cd react-gantt-remix-quick-start
~~~

并启动开发服务器：

~~~bash
npm run dev
~~~

你的应用程序将可在 `http://localhost:5173` 访问。

## 第一步。安装 React Gantt 包

按照 [React Gantt 安装指南](integrations/react/installation.md) 的说明安装 React Gantt。

在本教程中，我们使用评估版包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或者

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和 imports 中将 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

安装完成后，我们可以准备数据和组件。

## 第2步。准备演示数据

在 `app/` 文件夹中，创建一个新的 `data/` 目录，并添加 `demoData.ts` 文件，包含初始数据集：

~~~ts title="data/demoData.ts"
import type { Task, Link } from '@dhtmlx/trial-react-gantt';

export const tasks: Task[] = [
  { id: 1, text: "Office itinerancy", type: "project", start_date: new Date(2025, 3, 2), duration: 17, progress: 0.4, parent: 0, open: true },
  { id: 2, text: "Office facing", type: "project", start_date: new Date(2025, 3, 2), duration: 8, progress: 0.6, parent: 1, open: true },
  { id: 3, text: "Furniture installation", type: "project", start_date: new Date(2025, 3, 11), duration: 8, progress: 0.6, parent: 1, open: true },
  // ...
];

export const links: Link[] = [
  { id: 2, source: 2, target: 3, type: "0" },
  { id: 3, source: 3, target: 4, type: "0" },
  // ...
];
~~~

这组数据将传递给我们的 Gantt 组件。

### 第3步。创建 Gantt 组件

Remix 允许通过标准的 React 架构使用客户端组件。我们将创建一个专门的组件来渲染 Gantt 图。

创建 `app/components/Gantt/` 文件夹。在其中创建 `Gantt.tsx` 文件。打开新创建的文件并插入以下代码：

~~~tsx title="app/components/Gantt/Gantt.tsx"
import { useMemo, useRef } from 'react';
import Gantt, { type ReactGanttRef, type Task, type Link, type GanttConfig } from '@dhtmlx/trial-react-gantt';
import '@dhtmlx/trial-react-gantt/dist/react-gantt.css';


export interface GanttProps {
  tasks: Task[];
  links: Link[];
}


export default function GanttChart({ tasks, links }: GanttProps) {
  const ganttRef = useRef<ReactGanttRef>(null);


  const config: GanttConfig = useMemo(
    () => ({
      grid_width: 500,
      scale_height: 90,
      scales: [
        { unit: 'year', step: 1, date: '%Y' },
        { unit: 'month', step: 1, date: '%M' },
        { unit: 'day', step: 1, date: '%d %M' },
      ],
    }),
    []
  );


  return (
    <Gantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
      config={config}
      data={{
        save: (entity: string, action: string, data: Task | Link, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~

这个组件初始化甘特图并为其提供配置、初始数据以及用于未来 API 调用的 `ref`。`config` 对象定义了布局和刻度，而 `tasks` 和 `links` 属性则为图表提供数据集。

在 `data` 属性中的 `save` 函数用于跟踪对甘特图中任务和链接所作的更新。在本教程中，我们添加了一个简单的占位处理程序来跟踪变更。如果你想将更新发送到后端或绑定到 React 状态，可以参考官方数据绑定 [指南](integrations/react/overview.md#bindingdata)。


## 第4步。在 Remix 路由上渲染 Gantt

打开主页面路由 - `app/routes/home.tsx`。
用以下内容替换其内容：

~~~tsx title="app/routes/home.tsx"
import GanttChart from '~/components/Gantt/Gantt';
import type { Route } from './+types/home';
import { tasks, links } from '~/data/demoData';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Gantt | Remix (React Router) Quick Start' },
  ];
}


export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GanttChart tasks={tasks} links={links} />
    </div>
  );
}
~~~

现在甘特图将显示在 `/` 路由。

## 第5步。启动应用

启动开发服务器：

~~~bash
npm run dev
~~~

然后在浏览器中打开 `http://localhost:5173`。现在你应该能看到带有示例数据集的可用甘特图。

## 总结

你已经创建了一个包含 DHTMLX React Gantt 的最小 Remix 应用，添加了演示数据，并渲染了一个完全交互的甘特图。这是开始所需的最小设置，并且与生产环境中将使用的设置相同。

## GitHub 演示仓库

一个遵循本教程的完整可运行项目已在 GitHub 上提供：[GitHub](https://github.com/dhtmlx/react-gantt-remix-starter)。

从这里开始，你可以继续探索：

- [React 驱动的数据流](integrations/react/overview.md#bindingdata).
- [React Gantt 模板文档](integrations/react/configuration-props.md).