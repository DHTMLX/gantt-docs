--- 
title: "Angular Gantt"
sidebar_label: Angular Gantt
description: "在 Angular 中使用官方包装器安装、配置并使用 DHTMLX Gantt。"
---

Angular Gantt 是 DHTMLX Gantt 的官方 Angular 包装器。它为甘特图提供了一个 Angular 组件 API，同时保留对完整 Gantt 引擎的访问。

:::tip AI-assisted development
如果你使用 AI 编码助手，[DHTMLX Angular Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) 可以帮助它遵循正确的包装器集成模式——匹配 CSS 导入、提供显式高度链、选择数据所有权模型、在 `data.save` / `data.batchSave` 周围对日期进行标准化，以及通过 Gantt CSS 变量将应用主题映射。要获取实时 API 参考，请连接 [DHTMLX MCP server](integrations/ai-tools/mcp-server.md)。
:::

## 包装器提供的功能

- 用于声明性输入的 `tasks`、`links`、`config`、`templates`、`plugins`、`theme` 和 `locale`。
- 针对任务/链接更新的增量同步，遇到较大变更时提供回退重新解析。
- 通过 `data.load`、`data.save` 和 `data.batchSave` 提供数据传输回调。
- 通过 `events` 映射进行事件注册，并通过 `(ready)` 进行生命周期访问。
- 通过 `templateComponent(...)` 在 Gantt 模板内部渲染 Angular 组件。
- 对高级数据集和特性的支持（`resources`、`resourceAssignments`、`baselines`、`calendars`、`markers`、`groupTasks`、`resourceFilter`）。

~~~ts
import { Component } from '@angular/core';
import { DhxGanttComponent } from '@dhtmlx/trial-angular-gantt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DhxGanttComponent],
  template: `
    <div style="height: 520px;">
      <dhx-gantt [tasks]="tasks" [links]="links"></dhx-gantt>
    </div>
  `,
})
export class AppComponent {
  tasks = [{ id: 1, text: 'Task', start_date: '2026-02-02 00:00', duration: 3, parent: 0 }];
  links = [];
}
~~~

如果你想先了解全部功能，请从 [Angular Gantt Overview](integrations/angular/overview.md) 开始。

## 推荐的学习路径

如果你是包装器的新手，请按以下顺序进行：

1. [安装](integrations/angular/installation.md)：选择正确的包通道和导入语句。
2. [快速开始](integrations/angular/quick-start.md)：在一个独立的 Angular 应用中渲染你的第一张图表。
3. [配置参考](integrations/angular/configuration-props.md)：了解每个输入、输出和回调契约。
4. [数据绑定与状态管理基础](integrations/angular/state/state-management-basics.md)：选择你的数据拥有权模型。
5. [RxJS 状态管理教程](integrations/angular/state/rxjs.md)：使用 `BehaviorSubject` 与 `AsyncPipe` 实现一个存储驱动的模式。

## 示例

浏览公开的 Angular Gantt 示例，查看可运行的包装器演示：

- [在线演示](https://dhtmlx.github.io/angular-gantt-examples/)
- [GitHub 仓库](https://github.com/DHTMLX/angular-gantt-examples)

如果你正在评估 Angular Gantt，评估页面在评估期间提供技术支持。请参阅 [安装](integrations/angular/installation.md)。