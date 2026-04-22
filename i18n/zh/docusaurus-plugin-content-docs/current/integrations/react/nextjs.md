---
title: 使用 Next.js 的 React Gantt
sidebar_label: Next.js

---

# 使用 Next.js 的 React Gantt

**Next.js 快速入门**

您应熟悉 [React](https://react.dev/) 与 [Next.js](https://nextjs.org/docs) 的基本概念。若不了解，请在开始本指南前参考它们的官方文档。

DHTMLX React Gantt 与 Next.js 兼容。在本教程中，我们将创建一个简单的 Next.js 应用，并在页面上渲染一个甘特图。

## 创建项目

在创建新项目之前，请安装 Node.js。

要搭建一个 Next.js 应用，请运行：

~~~bash
npx create-next-app@latest
~~~

运行后系统会提示，请选择：
- 项目名称: **react-gantt-nextjs-quick-start**
- 使用默认模板（TypeScript、ESLint、Tailwind CSS、App Router、Turbopack）

Next.js 将创建项目结构并安装基本依赖项。

安装完成后，进入项目目录：

~~~bash
cd react-gantt-nextjs-quick-start
~~~


## 第 1 步：安装 React Gantt 包

按照 [React Gantt 安装指南](integrations/react/installation.md) 的描述安装 React Gantt。

在本教程中，我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-gantt
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中把 `@dhtmlx/trial-react-gantt` 替换为 `@dhx/react-gantt`。

安装完成后，我们可以设置数据并创建 Gantt 组件。

## 第 2 步：准备演示数据

在项目根目录创建一个 `data/` 文件夹。在其中添加一个 `demoData.ts` 文件，包含初始任务和连线：

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


### 第 3 步：创建 Gantt 组件

Next.js 默认使用 Server Components，但在大多数实际场景中，React Gantt 应在 Client Component 中渲染。

在以下情况下需要这样做：

- 使用 `ref` 访问 Gantt 实例
- 传递回调（事件、模板、数据处理器）
- 使用 ReactGantt `hooks`
- 提供动态配置或 React 元素

因此，我们的 Gantt 组件将以 "use client" 开头。

在 `components/Gantt/Gantt.tsx` 创建一个新文件

~~~tsx title="components/Gantt/Gantt.tsx"
"use client";

import { useRef } from "react";
import Gantt, { ReactGanttRef, Task, Link, GanttConfig } from "@dhtmlx/trial-react-gantt";
import "@dhtmlx/trial-react-gantt/dist/react-gantt.css";

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


该组件初始化 Gantt 图并为其提供配置、初始数据，以及用于未来 API 调用的 `ref`。`config` 对象定义了布局和刻度，而 `tasks` 与 `links` 属性则为图表提供数据集。

在 `data` 属性中的 `save` 函数用于跟踪对 Gantt 内部任务和连线所做的更新。在本教程中，我们添加一个简单的占位处理程序来跟踪变更。如果你想将更新发送到后端或者绑定到 React 状态，可以参考正式的数据绑定 [guide](integrations/react/overview.md#bindingdata)。


## 第 4 步：将 Gantt 添加到页面

打开 `app/page.tsx`，在主页上渲染 Gantt 图：

~~~tsx title="app/page.tsx"
import Gantt from "../components/Gantt/Gantt";
import { tasks, links } from "../data/demoData";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Gantt tasks={tasks} links={links} />
    </div>
  );
}
~~~

现在该页面将显示一个全屏 Gantt 图。

## 第 5 步：启动应用程序

运行开发服务器：

~~~bash
npm run dev
~~~

然后在浏览器中打开 `http://localhost:3000`。你现在应该会看到一个在 Next.js 应用中使用 React Gantt 渲染的工作中的 Gantt 图。

## 总结

你已经创建了一个最小的 Next.js 项目，集成 DHTMLX React Gantt，添加了演示数据，并渲染了一个完全可交互的 Gantt 图。这是入门所需的最小设置，并且与生产环境中使用的设置相对应。

## GitHub 演示仓库

一个遵循本教程的完整可工作项目已在 GitHub 提供。

从这里开始，你可以继续探索：

- [基于 React 的数据流](integrations/react/overview.md#bindingdata).
- [React Gantt 模板文档](integrations/react/configuration-props.md).