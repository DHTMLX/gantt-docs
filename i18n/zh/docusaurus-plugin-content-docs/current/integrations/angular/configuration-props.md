--- 
title: 在 Angular Gantt 中使用 DHTMLX Gantt 属性
sidebar_label: 配置
description: "Angular Gantt 输入、输出、回调契约以及针对 Angular 的模板/自定义助手的完整参考。"
--- 

# 在 Angular Gantt 中使用 DHTMLX Gantt 属性

本文档记录了 `@dhtmlx/trial-angular-gantt` 与 `@dhx/angular-gantt` 的公共包装表面。

## 可用输入

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tasks</td>
      <td>any[]</td>
      <td>图表/网格中渲染的任务集合。必填。</td>
    </tr>
    <tr>
      <td>links</td>
      <td>any[]</td>
      <td>依赖关系集合。必填。</td>
    </tr>
    <tr>
      <td>resources</td>
      <td>any[] | null</td>
      <td>用于资源布局与资源 API 方法的资源数据集。</td>
    </tr>
    <tr>
      <td>resourceAssignments</td>
      <td>any[] | null</td>
      <td>资源分配数据集。</td>
    </tr>
    <tr>
      <td>baselines</td>
      <td>any[] | null</td>
      <td>基线数据集。</td>
    </tr>
    <tr>
      <td>config</td>
      <td>Partial&lt;GanttConfigOptions&gt; | null</td>
      <td>合并到 <code>gantt.config</code>。</td>
    </tr>
    <tr>
      <td>templates</td>
      <td>AngularGanttTemplates | null</td>
      <td>合并到 <code>gantt.templates</code>；模板函数可以返回 Angular 模板描述符。</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>Record&lt;string, any&gt; | null</td>
      <td>插件激活映射（例如：[critical_path](/guides/critical-path/)，[auto_scheduling](/guides/auto-scheduling/)）。</td>
    </tr>
    <tr>
      <td>calendars</td>
      <td>Calendar[] | null</td>
      <td>按 <code>id</code> 同步的工作日历定义。</td>
    </tr>
    <tr>
      <td>markers</td>
      <td>Marker[] | null</td>
      <td>按 <code>id</code> 同步的垂直时间线标记。</td>
    </tr>
    <tr>
      <td>locale</td>
      <td>string | null</td>
      <td>传递给 <code>gantt.i18n.setLocale(...)</code> 的区域设定名称。</td>
    </tr>
    <tr>
      <td>theme</td>
      <td>string | null</td>
      <td>在可用时传递给 <code>gantt.setSkin(...)</code> 的皮肤名称。</td>
    </tr>
    <tr>
      <td>data</td>
      <td>AngularGanttDataConfig | null</td>
      <td>传输回调：<code>load</code>、<code>save</code>、<code>batchSave</code>。</td>
    </tr>
    <tr>
      <td>events</td>
      <td>AngularGanttEvents | null</td>
      <td>用于 Gantt 事件的事件名称到处理程序映射。</td>
    </tr>
    <tr>
      <td>customLightbox</td>
      <td>CustomLightboxConfig | null</td>
      <td>用 Angular 组件替换内置的 lightbox。</td>
    </tr>
    <tr>
      <td>groupTasks</td>
      <td>any</td>
      <td>传递给 <code>gantt.groupBy(...)</code> 的分组配置；使用 <code>false</code> 来禁用。</td>
    </tr>
    <tr>
      <td>filter</td>
      <td>TaskFilter</td>
      <td>用于过滤 Gantt 任务的函数。</td>
    </tr>
    <tr>
      <td>resourceFilter</td>
      <td>ResourceFilter</td>
      <td>用于在已配置的资源数据存储中筛选行的谓词。</td>
    </tr>
    <tr>
      <td>htmlTemplatePolicy</td>
      <td>HtmlTemplatePolicy</td>
      <td>控制模板函数返回的字符串值如何呈现。 <code>"basic-sanitize"</code>（默认）对返回的 HTML 进行白名单清洗：保留安全格式、类、有限的内联样式、<code>data-*</code> 属性和 <code>img</code>，移除脚本、事件处理程序和危险 URL。 <code>"escape"</code> 将字符串渲染为文本； <code>"unsafe-html"</code> 渲染原始字符串（v10 之前的行为）；自定义消毒对象（<code>mode: "sanitize"</code>，带有一个 <code>sanitize(html)</code> 函数）可让你接入如 DOMPurify 之类的库。若要对单个模板进行控制，请将单独的模板函数包裹在导出的 <code>allowRawHTML()</code> 助手中。请参见 [Migration notes](/migration#91---92).</td>
    </tr>
  </tbody>
</table>

## Outputs And Instance Access

### `(ready)`

包装器在初始化并完成初始同步后发出 `ready`。

事件载荷结构：

~~~ts
{ instance: GanttStatic }
~~~

~~~html
<dhx-gantt [tasks]="tasks" [links]="links" (ready)="onReady($event)"></dhx-gantt>
~~~

### `instance` via `@ViewChild`

需要直接的命令式访问时使用 `@ViewChild(DhxGanttComponent)`。

~~~ts
@ViewChild(DhxGanttComponent) ganttCmp?: DhxGanttComponent;

showToday(): void {
  this.ganttCmp?.instance?.showDate(new Date());
}
~~~

## 数据集合与同步

在 Angular 状态或 RxJS store 作为事实来源时，请使用这些输入：

- `tasks`、`links`
- 可选的高级存储：`resources`、`resourceAssignments`、`baselines`

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [baselines]="baselines">
</dhx-gantt>
~~~

同步行为摘要：

- 任务/链接更新对常规变更采用差分方式，
- 当差分不安全/不可行时，包装器可以切换为重置/重新解析 Gantt 布局，
- 资源/分配/基线存储通过 Gantt 数据存储进行刷新。

请参阅 [Data Binding and State Management Basics](integrations/angular/state/state-management-basics.md) 了解模型权衡。

## 配置、模板、插件、主题、区域设置

使用这些输入以声明式的图表配置来替代对 `instance` 的调用。

~~~ts
config = {
  scales: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F, %Y' },
    { unit: 'day', step: 1, format: '%d %M' },
  ],
  columns: [
    { name: 'text', tree: true, width: '*' },
    { name: 'start_date', align: 'center' },
    { name: 'duration', align: 'center' },
    { name: 'add', width: 44 },
  ],
};

templates = {
  task_text: (_start: Date, _end: Date, task: any) => `#${task.id}: ${task.text}`,
};
~~~ 

~~~html
<dhx-gantt
  [config]="config"
  [templates]="templates"
  [plugins]="{ auto_scheduling: true }"
  [locale]="locale"
  [theme]="theme">
</dhx-gantt>
~~~

### 运行时更新行为

- `locale`、`theme`、`config`、`templates` 和 `plugins` 可以在初始化后更新。
- 如果 `config.layout` 的形状发生变化（不仅仅是嵌套值的变化），包装器可能会重新初始化 Gantt 布局。
- 在没有变化时保持对象标识的一致性，以避免不必要的重新应用。

## `events` 输入

使用一个单一的事件映射来代替许多 Angular 输出。

~~~ts
import type { AngularGanttEvents } from '@dhtmlx/trial-angular-gantt';

events: AngularGanttEvents = {
  onTaskCreated: (task) => {
    console.log('created', task);
    return true;
  },
  onAfterTaskUpdate: (id, task) => {
    console.log('updated', id, task);
  },
  onBeforeLightbox: (taskId) => {
    console.log('before lightbox', taskId);
    return true;
  },
};
~~~

包装器通过同一个映射同时接受常用事件的类型子集和任意事件名称。

## 数据传输：`load`、`save`、`batchSave`

`data` 输入形状：

~~~ts
interface AngularGanttDataConfig {
  load?: string | ((gantt: any) => any | Promise<any>);

  save?: string | ((entity: string, action: string, data: any, id: string | number) => any);

  batchSave?: (changes: BatchChanges) => void;
}
~~~

### `load`

- URL 字符串 -> 包装器调用 `gantt.load(url)`。
- 函数 -> 包装器将其与 gantt 实例一起调用，并解析返回的同步/异步数据集。

~~~ts
dataConfig = {
  load: async (gantt) => {
    const response = await fetch('/api/gantt');
    const dataset = await response.json();
    return dataset;
  },
};
~~~

`load` 旨在用于初始加载。包装器在每个组件生命周期内应用一次。

### `save`

按变更回调或传输（通过 `gantt.createDataProcessor(save)` 连接）。

~~~ts
dataConfig = {
  save: (entity, action, data, id) => {
    console.log(entity, action, data, id);
  },
};
~~~

### `batchSave`

用于高容量变更的分组回调（自动排程、大规模编辑、链式更新）。

~~~ts
import type { BatchChanges } from '@dhtmlx/trial-angular-gantt';

dataConfig = {
  batchSave: (changes: BatchChanges) => {
    if (changes.tasks?.length) {
      console.log('task changes', changes.tasks);
    }
  },
};
~~~

队列行为摘要：

- 近端的分组（较小的防抖窗口），
- 将 `create` 与 `update` 合并成一个带有最新载荷的 `create`，
- 丢弃 `create` 与 `delete` 的配对，
- 从载荷中剥离内部的 `!nativeeditor_status`。

## `customLightbox` 输入

使用 `customLightbox` 将内置的 Gantt lightbox 替换为 Angular 组件。

~~~ts
import type { CustomLightboxConfig } from '@dhtmlx/trial-angular-gantt';

customLightbox: CustomLightboxConfig = {
  component: TaskEditorComponent,
  onSave: ({ id, task }) => console.log('saved', id, task),
  onCancel: () => console.log('cancel'),
  onDelete: (id) => console.log('delete', id),
};
~~~

自定义组件实例从包装器接收以下输入：

- `data` (`{ id, task }`)
- `onSave(updatedTask)`
- `onCancel()`
- `onDelete()`

## 模板与 Angular 组件

模板函数可以返回常规字符串/HTML（原生 Gantt 行为）或使用 `templateComponent(...)` 创建的 Angular 组件描述符。

~~~ts
import { templateComponent } from '@dhtmlx/trial-angular-gantt';

templates = {
  task_text: (_start: Date, _end: Date, task: any) =>
    templateComponent(TaskBadgeTemplateComponent, { task }),
};

config = {
  columns: [
    {
      name: 'status',
      label: templateComponent(HeaderFilterComponent, {
        currentFilter: this.currentFilter,
      }),
      template: (task: any) => templateComponent(StatusCellComponent, { task }),
    },
  ],
};
~~~

将此用于网格标题/单元格、任务文本、刻度以及 Gantt 支持的其他可模板化表面。

## 分组、资源、筛选、日历、标记

这些输入通常用于高级时间线和资源视图。

~~~html
<dhx-gantt
  [tasks]="tasks"
  [links]="links"
  [resources]="resources"
  [resourceAssignments]="resourceAssignments"
  [groupTasks]="groupConfig"
  [filter]="taskFilter"
  [resourceFilter]="resourceFilter"
  [calendars]="calendars"
  [markers]="markers"
  [config]="config">
</dhx-gantt>
~~~

说明：

- `filter` 接受一个 `(task: any) => boolean` 函数或 `null`。设定后，只有函数返回 `true` 的任务会显示。设为 `null` 以显示所有任务。
- `resourceFilter` 针对通过 `config.resource_store` 配置的资源数据存储进行筛选。
- `groupTasks` 可以通过设为 `false` 或一个分组配置对象来切换。
- `calendars` 与 `markers` 通过 `id` 同步，因此请保持 ID 的稳定。

### 任务筛选

使用 `filter` 输入来控制哪些任务可见。包装器在内部附加一个 `onBeforeTaskDisplay` 监听器，并在筛选引用发生变化时触发重新渲染。

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

当筛选逻辑未改变时，请保持引用稳定——包装器通过身份进行比较，只有引用变化时才重新渲染。

## 导出类型与帮助函数

来自包装器包的有用公开导出：

- `DhxGanttComponent`
- `DhxGanttModule`
- `templateComponent(...)`
- `isAngularTemplateRenderable(...)`
- `AngularGanttDataConfig`
- `AngularGanttEvents`
- `BatchChanges`, `DataCallbackChange`
- `SerializedTask`, `SerializedLink`
- `TaskFilter`
- `ResourceFilter`
- `GanttStatic`
- `CustomLightboxConfig`
- `Calendar`, `Marker`

### `SerializedTask` vs `Task`

包装器导出两种与任务相关的类型：

- **`SerializedTask`** - 用于你拥有的数据：存储状态、API 响应、初始字量、`batchSave` 载荷。日期可以是 `Date` 对象或匹配 `date_format` 的字符串。
- **`Task`**（从 `@dhx/gantt` 重新导出） - Gantt 拥有的数据：在事件处理程序中、Gantt 解析之后。日期为 `Date` 对象。具有以 `$` 开头的系统属性。

`SerializedLink` 是 `SerializedTask` 的链接端对等类型。

## 继续阅读

- [Angular Gantt 概览](integrations/angular/overview.md)
- [数据绑定与状态管理基础](integrations/angular/state/state-management-basics.md)
- [RxJS 状态管理教程](integrations/angular/state/rxjs.md)
- [在 Angular 中使用 dhtmlxGantt（低级集成）](integrations/angular/js-gantt-angular.md)