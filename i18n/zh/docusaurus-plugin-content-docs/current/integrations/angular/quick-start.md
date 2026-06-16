---
title: 使用 Angular Gantt 的快速入门
sidebar_label: 快速入门
description: "逐步在一个独立的 Angular 应用中渲染官方的 Angular Gantt 包装器。"
---

# 使用 Angular Gantt 的快速入门

本快速入门使用一个独立的 Angular 应用和官方包装包。它在一个专用的 Angular 组件中创建 Gantt，并将该组件挂载到 `AppComponent` 中，因此示例保持简洁，同时更贴近实际应用结构。

## 1. 创建一个 Angular 项目

创建一个独立的 Angular 应用（Angular CLI）：

~~~bash
ng new angular-gantt-quick-start --standalone --routing=false --style=css
cd angular-gantt-quick-start
~~~

如果尚未安装 Angular CLI，请先安装（`npm install -g @angular/cli`）。

## 2. 安装 Angular Gantt

按照 [Angular Gantt 安装指南](integrations/angular/installation.md) 中的说明安装 React Gantt。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-angular-gantt
~~~

或

~~~bash
yarn add @dhtmlx/trial-angular-gantt
~~~

如果你已经使用 Professional 包，请在命令和导入中把 `@dhtmlx/trial-angular-gantt` 替换为 `@dhx/angular-gantt`。

## 3. 添加全局样式

打开 `src/styles.css` 并添加 Gantt 样式：

~~~css title='src/styles.css'
@import "@dhtmlx/trial-angular-gantt/dist/angular-gantt.css";

html,
body {
  height: 100%;
  margin: 0;
}

app-root {
  display: block;
  height: 100vh;
}
~~~

此次快速入门使用全局 CSS 导入（`src/styles.css`），因此在 `AppComponent` 中不需要 `ViewEncapsulation.None`。

如果你以后将 Gantt CSS 导入（或对内部 Gantt 类如 `.dhx-gantt-root` 的覆盖）移动到某个组件样式表中，Angular 的默认样式封装可能会将这些选择器进行作用域化。在这种情况下，请在该组件上设置 `encapsulation: ViewEncapsulation.None`，或将样式保持全局。

## 4. 添加 Demo 数据

创建 `src/app/demo-data.ts`。

包装器导出 `SerializedTask` 和 `SerializedLink` - 它们是放在甘特外部的任务/链接数据的推荐类型。日期可以是字符串或 `Date` 对象。

~~~ts
import type { SerializedTask, SerializedLink } from '@dhtmlx/trial-angular-gantt';

export const tasks: SerializedTask[] = [
  {
    id: 1,
    text: 'Office itinerancy',
    type: 'project',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 10,
    progress: 0.4,
    open: true,
    parent: 0,
  },
  {
    id: 2,
    text: 'Planning',
    start_date: new Date(2026, 1, 2).toISOString(),
    duration: 4,
    progress: 0.6,
    parent: 1,
  },
  {
    id: 3,
    text: 'Implementation',
    start_date: new Date(2026, 1, 6).toISOString(),
    duration: 5,
    progress: 0.2,
    parent: 1,
  },
];

export const links: SerializedLink[] = [{ id: 1, source: 2, target: 3, type: '0' }];
~~~

## 5. 创建一个 Gantt 组件

创建 `src/app/gantt-chart.component.ts`：

~~~ts title='src/app/gantt-chart.component.ts'
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

import { links, tasks } from './demo-data';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [DhxGanttComponent],
  host: { style: 'display:block;height:100%;' },
  template: `
    <dhx-gantt
      style="display:block;height:100%;"
      [tasks]="tasks"
      [links]="links"
      [config]="config"
      [data]="dataConfig">
    </dhx-gantt>
  `,
})
export class GanttChartComponent {
  tasks = tasks;
  links = links;

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', label: 'Start', align: 'center' },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, item, id) => {
      console.log('save', { entity, action, item, id });
    },
  };
}
~~~

## 6. 在应用 Shell 中渲染 Gantt

替换 `src/app/app.component.ts`：

~~~ts title='src/app/app.component.ts'
import { Component } from '@angular/core';
import { GanttChartComponent } from './gantt-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GanttChartComponent],
  template: `<app-gantt-chart></app-gantt-chart>`,
})
export class AppComponent {}
~~~

## 7. 启动应用

~~~bash
ng serve
~~~

打开 `http://localhost:4200`。你应该看到一个工作中的 Gantt 图表，并通过 `data.save` 记录编辑日志。

如果你要把 Gantt 添加到现有应用中，请保留当前的 `AppComponent`，并将 `<app-gantt-chart>` 放在目标页面/组件中。确保父布局为 Gantt 区域提供高度。

## 可选：最小本地保存处理

作为下一步，在 `src/app/gantt-chart.component.ts` 中，用本地数组同步来替代日志记录：

~~~ts title='src/app/gantt-chart.component.ts'
dataConfig: AngularGanttDataConfig = {
  save: (entity, action, item, id) => {
    if (entity === 'task') {
      if (action === 'create') this.tasks = [...this.tasks, item];
      if (action === 'update') {
        this.tasks = this.tasks.map((task) => String(task.id) === String(id) ? { ...task, ...item } : task);
      }
      if (action === 'delete') {
        this.tasks = this.tasks.filter((task) => String(task.id) !== String(id));
      }
    }

    if (entity === 'link') {
      if (action === 'create') this.links = [...this.links, item];
      if (action === 'update') {
        this.links = this.links.map((link) => String(link.id) === String(id) ? { ...link, ...item } : link);
      }
      if (action === 'delete') {
        this.links = this.links.filter((link) => String(link.id) !== String(id));
      }
    }
  },
};
~~~

对于多变更操作（例如自动排程），请优先使用 `data.batchSave`，并对分组更新进行处理，而不是逐一回调。

## 继续阅读

- [Angular Gantt 概览](integrations/angular/overview.md)
- [配置参考](integrations/angular/configuration-props.md)
- [数据绑定与状态管理基础](integrations/angular/state/state-management-basics.md)