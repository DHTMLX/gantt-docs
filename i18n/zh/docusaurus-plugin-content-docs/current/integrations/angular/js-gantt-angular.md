---
title: dhtmlxGantt 与 Angular
sidebar_label: 底层集成
description: "逐步指南：在不使用官方 Angular 包裹的情况下，在 Angular 中使用 JS DHTMLX Gantt。"
---

# dhtmlxGantt 与 Angular

:::note
本教程展示如何在 Angular 应用中直接使用 JS DHTMLX Gantt，而无需官方封装。

如果你需要 Angular 的 inputs/outputs、包装器管理的同步，以及对 Angular 模板组件的支持，请改用 [Angular Gantt](integrations/angular.md)。
:::

你应当熟悉基本的 Angular 概念（组件、生命周期钩子、服务）。如果不熟悉，请先参考 [Angular 文档](https://angular.dev/overview)。

DHTMLX Gantt 与 Angular 兼容。你可以在 GitHub 上查看相关演示仓库：[DHTMLX Gantt with Angular Demo](https://github.com/DHTMLX/angular-gantt-demo)。

## 创建一个项目

在开始之前，请安装 [Node.js](https://nodejs.org/en/) 和 [Angular CLI](https://angular.dev/tools/cli)。

创建一个新的 Angular 应用：

~~~bash
ng new my-angular-gantt-app --standalone --routing=false --style=css
cd my-angular-gantt-app
~~~

首次启动应用以验证项目是否正常工作：

- npm: `npm start`
- yarn: `yarn start`
- 或 CLI: `ng serve`

应用应该在 `http://localhost:4200` 可用。

## 创建 Gantt

在安装 Gantt 包之前，先停止开发服务器（`Ctrl+C`）。

## 步骤 1. 包安装

JS Gantt 库的专业版通过私有 npm 提供。按照 [安装指南](guides/installation.md#npmevaluationandproversions) 获取访问权限。

评估构建（用于教程的公开包）：

- npm：

~~~bash
npm install @dhx/trial-gantt
~~~

- yarn：

~~~bash
yarn add @dhx/trial-gantt
~~~

专业构建（私有 npm）：

- npm：

~~~bash
npm install @dhx/gantt
~~~

- yarn：

~~~bash
yarn add @dhx/gantt
~~~

你也可以 [从本地文件夹安装 Gantt](guides/installation.md#installfromlocalfolder)，因为该包被构建为一个 npm 模块。

## 步骤 2. 创建一个 Gantt 组件

为直接的 JS Gantt 集成创建一个新组件：

~~~bash
ng generate component gantt --skip-tests
~~~

### 导入 Gantt 源文件

打开 `src/app/gantt/gantt.component.ts` 并导入 Gantt 包。

如果你安装了评估构建：

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';
~~~

如果你安装了专业构建：

~~~ts title="src/app/gantt/gantt.component.ts"
import { Gantt, type GanttStatic } from '@dhx/gantt';
~~~

在 `src/app/gantt/gantt.component.css` 中添加 Gantt 样式。

评估构建：

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";
~~~

专业构建：

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/gantt/dist/dhtmlxgantt.css";
~~~

### 在 Angular 生命周期钩子中初始化 Gantt

将 `src/app/gantt/gantt.component.ts` 替换为一个最小的直接集成：

~~~ts title="src/app/gantt/gantt.component.ts"
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Gantt, type GanttStatic } from '@dhx/trial-gantt';

@Component({
  selector: 'app-gantt',
  standalone: true,
  template: `<div #ganttHost class="gantt-chart"></div>`,
  styleUrl: './gantt.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class GanttComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ganttHost', { static: true }) ganttHost!: ElementRef<HTMLElement>;

  private gantt: GanttStatic | null = null;

  ngAfterViewInit(): void {
    const gantt = Gantt.getGanttInstance();
    gantt.init(this.ganttHost.nativeElement);
    this.gantt = gantt;
  }

  ngOnDestroy(): void {
    this.gantt?.destructor();
    this.gantt = null;
  }
}
~~~


在 `src/app/gantt/gantt.component.css` 中添加基本容器尺寸：

~~~css title="src/app/gantt/gantt.component.css"
@import "@dhx/trial-gantt/codebase/dhtmlxgantt.css";

.gantt-chart {
  width: 100%;
  height: 600px;
}
~~~


## 步骤 3. 将 Gantt 添加到应用中

替换 `src/app/app.component.ts` 以使应用渲染你的 Gantt 组件：

~~~ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
import { GanttComponent } from './gantt/gantt.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttComponent],
  template: `<app-gantt></app-gantt>`,
})
export class AppComponent {}
~~~

启动应用后，应该会看到一个空的 Gantt 图。

## 步骤 4. 提供数据

创建 `src/app/demo-data.ts`，包含一个小的数据集：

~~~ts title="src/app/demo-data.ts"
export function getData() {
  return {
    data: [
      {
        id: 10,
        text: 'Project #1',
        start_date: '2026-02-02 00:00',
        duration: 6,
        progress: 0.4,
        open: true,
      },
      {
        id: 1,
        text: 'Task #1',
        start_date: '2026-02-02 00:00',
        duration: 2,
        progress: 0.6,
        parent: 10,
      },
      {
        id: 2,
        text: 'Task #2',
        start_date: '2026-02-04 00:00',
        duration: 3,
        progress: 0.2,
        parent: 10,
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: '0' }],
  };
}
~~~


现在在 `GanttComponent` 中导入并解析数据：

~~~ts title="src/app/gantt/gantt.component.ts"
import { getData } from '../demo-data';

// ...inside ngAfterViewInit()
const gantt = Gantt.getGanttInstance();
gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.init(this.ganttHost.nativeElement);
gantt.parse(getData());
this.gantt = gantt;
~~~


如果重新加载应用，应该会看到一个包含任务和连线的 Gantt 图。

## 步骤 5. 保存数据

要捕获图表中的更改，请使用 [dataProcessor](api/method/dataprocessor.md)。它可以将更改发送到后端，或在构建集成时仅记录它们。

~~~ts title="src/app/gantt/gantt.component.ts"
 // ...inside ngAfterViewInit(), after gantt.init(...)
gantt.createDataProcessor((entity, action, data, id) => {
  console.log('[dp]', entity, action, data, id);
});
~~~

DHTMLX Gantt 接受来自 `dataProcessor` 处理程序的 Promise 响应。如果后端在创建时更改了 ID，请返回一个对象，例如 `{ id: newId }` 或 `{ tid: newId }`，以便 Gantt 可以重新映射记录。

有关完整后端模式，请参阅 [server-side integration](guides/server-side.md)。

## XSS、CSRF 与 SQL 注入攻击

Gantt 不会保护你的应用免受后端安全问题（SQL 注入、XSS、CSRF）的影响。后端的校验、授权和输出净化仍然是你需要负责的。

请阅读 [Application Security](guides/app-security.md) 了解主要风险领域及缓解指南。