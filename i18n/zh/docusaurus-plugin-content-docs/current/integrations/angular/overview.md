---
title: Angular Gantt 概览
sidebar_label: 概览
description: "关于 Angular Gantt 的体系架构级概览：功能、数据流、事件、生命周期和自定义模式。"
---

# Angular Gantt 概览

Angular Gantt 是 DHTMLX Gantt 的官方 Angular 封装。它将甘特图作为一个 Angular 组件（`<dhx-gantt>`）暴露，具备类型化的输入/输出，并保留对底层 Gantt 实例的访问权限。

如果你需要先了解安装和项目设置，请从 [Angular Gantt 快速入门](integrations/angular/quick-start.md) 开始。

:::tip AI-assisted development
如果你使用 AI 编码助手， [DHTMLX Angular Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) 能帮助它遵循正确的封装集成模式，并避免常见错误，如 CSS 导入不匹配、容器高度缺失、Angular 状态与 Gantt `instance` 之间的混合所有权、以及通过 `data.save` / `data.batchSave` 进行不稳定的日期序列化。若需要实时 API 参考，请连接 [DHTMLX MCP 服务器](integrations/ai-tools/mcp-server.md)。
:::

## Core Capabilities

封装适用于简单和高级的 Angular 集成：

- 通过输入 `config`、`templates`、`plugins`、`theme`、`locale` 进行声明式设置。
- 对 `tasks`/`links` 以及高级集合（`resources`、`resourceAssignments`、`baselines`）进行数据同步。
- 通过单一的 `events` 输入映射实现动态事件连线。
- 通过 `(ready)` 信号获取已初始化的 Gantt 实例的生命周期。
- 通过 `templateComponent(...)` 在模板中渲染 Angular 组件。
- 通过 `customLightbox`、`groupTasks`、`filter`、`calendars`、`markers` 和 `resourceFilter` 实现高级功能。
  
## 基本封装用法

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttDataConfig,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 600px;">
      <dhx-gantt
        [tasks]="tasks"
        [links]="links"
        [config]="config"
        [data]="dataConfig">
      </dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [
    { id: 1, text: 'Project', type: 'project', open: true, start_date: new Date(2026, 1, 2).toISOString(), duration: 5, parent: 0 },
    { id: 2, text: 'Planning', start_date: new Date(2026, 1, 2).toISOString(), duration: 2, parent: 1 },
  ];

  links = [{ id: 1, source: 1, target: 2, type: '0' }];

  config = {
    columns: [
      { name: 'text', tree: true, width: '*' },
      { name: 'start_date', align: 'center' },
      { name: 'duration', align: 'center' },
      { name: 'add', width: 44 },
    ],
  };

  dataConfig: AngularGanttDataConfig = {
    save: (entity, action, data, id) => {
      console.log('[data.save]', entity, action, data, id);
    },
  };
}
~~~

## 基于属性的同步模型与权衡

封装会监视输入变化并将其同步到当前的 Gantt 实例中。

- `tasks` 与 `links` 会为常规的新增/更新/删除变更进行增量同步。
- 对于较大结构性变更，封装可以重置并重新解析数据。
- `resources`、`resourceAssignments`、`baselines` 通过相关的数据存储进行同步。
- `config`、`templates`、`plugins`、`locale`、`theme` 在运行时生效。
- 如果 `config.layout` 的形状改变，封装可能会重新初始化 Gantt 布局以应用新结构。

请参考 [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) 获取完整的数据所有权指南。

## `events` 映射 与 `(ready)`

Angular Gantt 使用一个 `events` 映射来处理 [Gantt 事件处理程序](api/overview/events-overview.md)，并使用单独的 `(ready)` 输出来进行一次性的生命周期访问。

~~~ts
import { Component } from '@angular/core';
import {
  DhxGanttComponent,
  type AngularGanttEvents,
  type GanttStatic,
} from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [events]="events" (ready)="onReady($event)"></dhx-gantt>`,
})
export class DemoComponent {
  events: AngularGanttEvents = {
    onTaskCreated: (task) => {
      console.log('task created', task);
      return true;
    },
    onBeforeLightbox: (taskId) => {
      console.log('before lightbox', taskId);
      return true;
    },
  };

  onReady({ instance }: { instance: GanttStatic }): void {
    console.log('ready', instance);
  }
}
~~~

请使用 `events` 来实现交互行为。使用 `(ready)` 处理需要已初始化实例的逻辑。

## ViewChild 访问与命令式边界

当输入不足以覆盖需求时，可以通过 `@ViewChild` 访问封装实例，然后使用 `.instance`。

~~~ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  standalone: true,
  imports: [DhxGanttComponent],
  template: `<dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>`,
})
export class DemoComponent implements AfterViewInit {
  @ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

  tasks = [];
  links = [];

  ngAfterViewInit(): void {
    this.ganttCmp?.instance?.showDate(new Date());
  }
}
~~~

边界规则：如果你直接通过 `instance` 修改了 tasks 或 links，请确保你的 Angular 状态输入保持同步。否则，下一次输入更新可能会覆盖图表端的更改。

## 高级扩展点

### 自定义 lightbox 组件

使用 `customLightbox` 替换内置的任务编辑器为一个 Angular 组件。

~~~ts
import { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
};
~~~

你的自定义组件应接受 `data`、`onSave`、`onCancel` 和 `onDelete` 输入。

### 模板中的 Angular 组件

在 `templates`、列模板 (`template`)、列标签 (`label`) 或其他支持模板的插槽中使用 `templateComponent(...)`。

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskTextTemplateComponent, {
      task,
      onIconClick: () => this.toggleTask(task),
    }),
};
~~~

这让 Angular 能在 Gantt 管理的 DOM 区域内渲染组件。

### 过滤

使用 `filter` 输入来指定应显示哪些任务：

~~~ts
import type { TaskFilter } from '@dhtmlx/trial-angular-gantt';

taskFilter: TaskFilter = null;

showCompleted(): void {
  this.taskFilter = (task) => !!task.completed;
}

resetFilter(): void {
  this.taskFilter = null;
}
~~~

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [filter]="taskFilter">
</dhx-gantt>
~~~

要在 [资源面板](guides/resource-management.md) 中过滤资源，请使用 `resourceFilter` 输入：

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [resourceFilter]="resourceFilter"
  [config]="config">
</dhx-gantt>
~~~

### 分组、日历和标记

使用 `groupTasks`、`calendars` 和 `markers` 以在没有命令式设置代码的情况下实现高级时间线场景。

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [groupTasks]="groupConfig"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

### 行内编辑说明

封装不暴露一个单独的 Angular 专用 `inlineEditors` 输入。在需要网格编辑时，请使用核心 Gantt 的行内编辑配置 `config.columns[].editor`（以及其他核心行内编辑 API）。

## 公共示例场景地图

公开的 Angular 示例覆盖了以下封装场景：

- `basic-initialization`: 基线输入和 `data.save`。
- `configs-and-templates`: 运行时 `config`/`templates` 更新、标记、插件。
- `template-components`: `templateComponent(...)`、`filter`、`ready`、网格/任务模板中的动态 UI。
- `custom-form`: `customLightbox` 集成。
- `resource-panel`: 资源、分配、资源布局、`resourceFilter`、`(ready)` 实例访问。
- `calendars`: `calendars`、`templates`、locale、工作时间高亮。
- `auto-scheduling`: 插件激活与批量数据变更。
- `state-management`: 使用 RxJS store 驱动的更新，配合 `data.batchSave` 与撤销/重做。
- `inline-editors`: 通过 `config` 配置的核心 Gantt 行内编辑。

## 相关文档

- [安装](integrations/angular/installation.md)
- [快速上手](integrations/angular/quick-start.md)
- [配置参考](integrations/angular/configuration-props.md)
- [数据绑定与状态管理基础](integrations/angular/state/state-management-basics.md)
- [RxJS 状态管理教程](integrations/angular/state/rxjs.md)
- [DHTMLX Gantt 指南](guides.md)