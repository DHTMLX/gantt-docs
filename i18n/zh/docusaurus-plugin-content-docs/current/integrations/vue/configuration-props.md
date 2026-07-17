---  
title: 在 VueGantt 中使用 DHTMLX Gantt 属性  
sidebar_label: 配置  
description: "VueGantt 属性、数据/生命周期契约以及导出的 Vue 助手/组合式函数参考。"  
---  

# 在 VueGantt 中使用 DHTMLX Gantt 属性

本页记录对 `@dhtmlx/trial-vue-gantt` 与 `@dhx/vue-gantt` 的公开 Vue 包装层的文档。  

可在 [Overview](integrations/vue/overview.md) 或 [Quick Start](integrations/vue/quick-start.md) 之后，用作参考。

## 可用属性

<table>  
  <thead>  
    <tr>  
      <th>Prop</th>  
      <th>Type</th>  
      <th>描述</th>  
    </tr>  
  </thead>  
  <tbody>  
    <tr>  
      <td>tasks</td>  
      <td>Task[]</td>  
      <td>在图表/网格中呈现的任务集合。</td>  
    </tr>  
    <tr>  
      <td>links</td>  
      <td>Link[]</td>  
      <td>依赖项集合。</td>  
    </tr>  
    <tr>  
      <td>resources</td>  
      <td>any[] | null</td>  
      <td>用于资源布局和资源相关 API 方法的资源数据集。</td>  
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
      <td>markers</td>  
      <td>Marker[] | null</td>  
      <td>纵向时间线标记。</td>  
    </tr>  
    <tr>  
      <td>calendars</td>  
      <td>(WrapperCalendar | CalendarConfig)[] | null</td>  
      <td>工作日历定义（包装器格式或原生 Gantt 配置）。</td>  
    </tr>  
    <tr>  
      <td>data</td>  
      <td>VueGanttDataConfig | null</td>  
      <td>数据传输回调：<code>load</code>、<code>save</code>、<code>batchSave</code>。</td>  
    </tr>  
    <tr>  
      <td>config</td>  
      <td>Partial&lt;GanttConfigOptions&gt;</td>  
      <td>合并至 <code>gantt.config</code>。</td>  
    </tr>  
    <tr>  
      <td>plugins</td>  
      <td>GanttPlugins</td>  
      <td>[Gantt 扩展](/guides/extensions-list/) 以激活（例如 [auto_scheduling](/guides/auto-scheduling/)）。</td>  
    </tr>  
    <tr>  
      <td>templates</td>  
      <td>Partial&lt;GanttTemplates&gt;</td>  
      <td>合并至 <code>gantt.templates</code>。</td>  
    </tr>  
    <tr>  
      <td>locale</td>  
      <td>string | Record&lt;string, any&gt;</td>  
      <td>本地化名称或本地化对象。</td>  
    </tr>  
    <tr>  
      <td>theme</td>  
      <td>string</td>  
      <td>皮肤名称。</td>  
    </tr>  
    <tr>  
      <td>filter</td>  
      <td>((task: Task) =&gt; boolean) | null</td>  
      <td>任务筛选谓词。</td>  
    </tr>  
    <tr>  
      <td>resourceFilter</td>  
      <td>((resource: any) =&gt; boolean) | null</td>  
      <td>资源筛选谓词。</td>  
    </tr>  
    <tr>  
      <td>modals</td>  
      <td>GanttModals | null</td>  
      <td>覆盖内置的删除确认对话框。</td>  
    </tr>  
    <tr>  
      <td>groupTasks</td>  
      <td>any</td>  
      <td>传递给 <code>gantt.groupBy</code> 的分组配置。</td>  
    </tr>  
    <tr>  
      <td>inlineEditors</td>  
      <td>Record&lt;string, Component&gt;</td>  
      <td>将内联编辑器类型名称映射到 Vue 组件。</td>  
    </tr>  
    <tr>  
      <td>customLightbox</td>  
      <td>Component | null</td>  
      <td>自定义 Vue 任务编辑组件。</td>  
    </tr>  
    <tr>  
      <td>events</td>  
      <td>VueGanttEvents</td>  
      <td>事件名到处理程序的映射。</td>  
    </tr>  
    <tr>  
      <td>htmlTemplatePolicy</td>  
      <td>HtmlTemplatePolicy</td>  
      <td>控制模板函数返回的字符串值如何呈现。 <code>"basic-sanitize"</code>（默认）对返回的 HTML 进行白名单式清理：保留安全格式、类、受限的行内样式、<code>data-*</code> 属性和 <code>img</code>，移除脚本、事件处理程序和危险 URL。<code>"escape"</code> 将字符串渲染为文本；<code>"unsafe-html"</code> 将原始字符串渲染（v10 之前的行为）；一个自定义消毒器对象（<code>mode: "sanitize"</code>，并提供 <code>sanitize(html)</code> 函数）可让你接入诸如 DOMPurify 之类的库。若要对每个模板进行单独控制，请使用导出的 <code>allowRawHTML()</code> 助手对单独的模板函数进行包裹。另请参阅 <a href="/migration#91---100">Migration notes</a>。</td>  
    </tr>  
  </tbody>  
</table>  

## 数据集合与同步

当 Vue 状态为您的数据源时，请使用这些属性：

- `tasks`、`links`
- 可选的高级数据集：`resources`、`resourceAssignments`、`baselines`

~~~js
<VueGantt
  :tasks="tasks"
  :links="links"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
  :baselines="baselines"
/>
~~~

同步行为要点：

- 任务/链接更新通常基于差异 diff
- 对于大规模变更，包装器可以切换为重置/重新解析
- 高级数据集通过其数据存储重新解析

关于模型选择和回调策略，请参见 [数据绑定与状态管理基础](integrations/vue/state/state-management-basics.md)。

## 配置、模板、插件、主题、语言环境

使用这些属性进行日常的图表设置，而无需使用命令式 API 调用。

~~~ts
<script setup lang="ts">
// ...
const config = {
  scales: [
    { unit: "year", step: 1, format: "%Y" },
    { unit: "month", step: 1, format: "%F" }
  ],
  columns: [
    { name: "text", tree: true, width: "*" },
    { name: "start_date", align: "center" },
    { name: "duration", align: "center" },
    { name: "add", width: 44 }
  ]
};

const templates = {
  task_text: (_start, _end, task) => `#${task.id}: ${task.text}`
};
</script>

<template>
  <VueGantt
    :config="config"
    :templates="templates"
    :plugins="{ auto_scheduling: true }"
    theme="terrace"
    locale="en"
  />
</template>
~~~  

## 事件、生命周期 与 实例访问

### `events`

使用一个 `events` 映射，而不是为每个 Gantt 事件单独定义包装器属性：

~~~ts
const events = {
  onTaskCreated: task => {
    console.log(task);
    return true;
  },
  onBeforeLightbox: id => {
    console.log(id);
    return true;
  }
};
~~~  

该映射的类型为 `VueGanttEvents`。包装器公开以下已知事件及其完整类型签名；任何其他 Gantt 事件名称也被接受（自定义事件类型为字符串键）。  

| 事件 | 签名 | 备注 |
|-------|-----------|-------|  
| `onBeforeLightbox` | `(taskId: string \| number) =&gt; boolean \| void` | 返回 `false` 以抑制内置光箱（例如跳转到外部编辑器）。 |
| `onTaskCreated` | `(task: Task) =&gt; boolean \| void` | 返回 `false` 以取消任务创建。 |
| `onAfterTaskAdd` | `(id: string \| number, task: Task) =&gt; void` | 任务添加后触发。 |
| `onAfterTaskUpdate` | `(id: string \| number, task: Task) =&gt; void` | 任务更新后触发。 |
| `onAfterTaskDelete` | `(id: string \| number, task: Task) =&gt; void` | 任务删除后触发。 |
| `onAfterLinkAdd` | `(id: string \| number, link: Link) =&gt; void` | 依赖链接添加后触发。 |
| `onAfterLinkUpdate` | `(id: string \| number, link: Link) =&gt; void` | 依赖链接更新后触发。 |
| `onAfterLinkDelete` | `(id: string \| number, link: Link) =&gt; void` | 依赖链接删除后触发。 |

如需查看完整的 Gantt 事件列表（包括上面未列出的事件），请参阅 [Gantt 事件总览](api/overview/events-overview.md)。使用 `defineGanttEvents(...)` 以在这些已知事件上实现自动完成的映射。

### `@ready`

`ready(instance)` 在初始化完成并完成首次同步后触发一次：

~~~vue
<VueGantt :events="events" @ready="onReady" />
~~~

### 通过组件引用访问 `instance`

~~~ts
import { ref } from "vue";
import type { VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);

function showToday() {
  ganttRef.value?.instance?.showDate(new Date());
}
~~~

这用于通过属性不可行的高级操作。

## 数据传输：`load`、`save`、`batchSave`

`data` 属性的形态：

~~~ts
interface VueGanttDataConfig {
  load?: string | ((gantt: GanttStatic) => DataSet | Promise<DataSet>);  
  save?: string | RouterFunction;
  batchSave?: (changes: BatchChanges) => void;
}
~~~  

### `load`

- URL 字符串 -> `gantt.load(url)`
- 函数 -> 返回同步或异步数据集

### `save`

按变更回调或通过 dataProcessor 进行路由传输。

### `batchSave`

为高容量更新进行分组回调：

- `tasks`
- `links`
- `resources`
- `resourceAssignments`

~~~ts
const data = {
  batchSave: changes => {
    if (changes.tasks?.length) {
      console.log("task changes", changes.tasks);
    }
  }
};
~~~

当一个图表操作可能触发多次更新时，请使用 `batchSave`。

## 自定义钩子

### `customLightbox`

用一个 Vue 组件替换内置的任务表单界面。

### `inlineEditors`

将 Gantt 内联编辑器类型名称映射到 Vue 组件。

### `modals`

覆盖删除确认对话框，并调用 `callback()` 以确认删除。

~~~ts
const modals = {
  onBeforeTaskDelete: ({ task, callback }) => {
    if (window.confirm(`Delete task ${task.text}?`)) callback();
  }
};
~~~

实际示例，请参阅 [Customization Patterns](integrations/vue/customization-patterns.md)。

## 分组、筛选、资源、日历、标记

这些属性在高级时间线视图中经常一起使用：

~~~js
<VueGantt
  :groupTasks="groupConfig"
  :filter="taskFilter"
  :resourceFilter="resourceFilter"
  :calendars="calendars"
  :markers="markers"
  :resources="resources"
  :resourceAssignments="resourceAssignments"
/>
~~~  

常见用法：

- 将 `groupTasks` 用于分组视图
- 使用 `filter` 与 `resourceFilter` 进行聚焦分段
- 使用 `calendars` 与 `markers` 表示日程规则与时间线高亮

## 导出助手 与 组合式函数

本包同時导出默认的 `VueGantt` 组件以及命名导出。

来自 `@dhtmlx/trial-vue-gantt` 或 `@dhx/vue-gantt`：

### 类型导出 {#type-exports}

按 wrapper 包本身导入所有类型（`@dhx/vue-gantt` 或 `@dhtmlx/trial-vue-gantt`）。包装器将底层 Gantt 引擎的类型与 Vue 特定类型一并导出——没有单独的 `@dhx/gantt` 包需要安装或导入。  

**包装器拥有的类型**

| 导出 | 描述 |
|--------|------------|  
| `SerializedTask` | 面向用户的任务形状，日期为 `Date | string`。用于 store 状态、初始数据，以及 `save`/`batchSave` 的载荷。 |
| `SerializedLink` | 面向用户的链接形状。与 `SerializedTask` 一起用于 store 状态和数据定义。 |
| `VueGanttRef` | 通过组件 ref 暴露的值的类型 - `{ instance: GanttStatic \| null }`。 |
| `VueGanttDataConfig` | `data` 属性的形状（`load`、`save`、`batchSave`）。 |
| `BatchChanges` | 传给 `data.batchSave` 的参数 - 将分组的 `tasks`/`links`/`resources`/`resourceAssignments` 变化聚合在一起。 |
| `DataCallbackChange` | 在一个 `BatchChanges` 桶中的单个变更条目 - `{ entity, action, data, id }`。 |
| `Marker` | `markers` 属性中项的形状。 |
| `WrapperCalendar` | 供 `calendars` 属性接受的包装器友好日历形状（以及原始的 `CalendarConfig`）。 |
| `GanttModals` | `modals` 属性的形状 - `onBeforeTaskDelete` 与 `onBeforeLinkDelete` 的回调签名。 |
| `CustomLightboxProps` | 传给你的 `customLightbox` 组件的属性（`data`、`onSave`、`onCancel`、`onDelete`、`ganttInstance`）。 |
| `InlineEditorComponentProps` | 你的内联编辑器组件接收的属性（`initialValue`、`task`、`save`、`cancel`、`ganttInstance`）。 |
| `VueGanttEvents` | `events` 属性的类型 - 已知事件以及字符串键名的自定义事件。 |

**来自 Gantt 引擎的常用类型**

包装器会导出底层 Gantt 引擎的每一种类型。下表中的类型在包装器代码中最常用——每行将核心类型映射到它在 Vue API 中出现的位置。

| 导出 | 在包装器代码中的出现位置 |
|--------|------------|  
| `Task`, `Link` | 运行时的任务/链接形状（包含以 `$` 前缀的属性）。在事件处理程序、模板回调和筛选函数中使用。 |
| `GanttStatic` | `ganttRef.value?.instance` 的类型以及 `@ready` 参数的类型。 |
| `GanttConfigOptions` | 传给 `config` 属性的对象形状。 |
| `GanttTemplates` | 传给 `templates` 属性的对象形状。 |
| `GanttPlugins` | 传给 `plugins` 属性的对象形状。 |
| `CalendarConfig` | 原始 Gantt 日历形状——作为 `calendars` 属性中对比的替代项。 |

从 Gantt 引擎的其他类型也会从包装器导出——如果你在独立库中可以从 `@dhx/gantt` 导入某个名称，那么在这里也可以从 `@dhx/vue-gantt` 导入。

使用 `SerializedTask` 与 `SerializedLink` 处理你自己拥有的数据（Pinia 状态、`ref<>`、API 响应、初始字面量）。使用 `Task` 与 `Link` 处理 Gantt 拥有的数据（在事件处理程序、模板回调、筛选函数中），此时运行时任务对象包含内部的 `$` 前缀属性。

### 助手工厂

- `defineGanttConfig(config)` 用于有类型的配置编写  
- `defineGanttTemplates(templates)` 用于有类型的模板映射  
- `defineGanttEvents(events)` 用于有类型的事件映射  
- `defineInlineEditors(inlineEditors)` 用于有类型的内联编辑器映射  

这些都是 **仅 TypeScript 的身份识别辅助工具**——在运行时，`defineGanttTemplates(x)` 将原样返回 `x`。你可以完全跳过它们而不改变任何行为。它们的价值在于对对象字面量进行类型保留：你可以在 `templates.task_text`、`config.scales[0].unit`、`events.onAfterTaskAdd` 等上获得自动完成，而无需手动注解变量。

如果你在 TypeScript 中跳过它们，要么自行对变量进行注解，要么在属性中直接内联传递字面量：

~~~ts
// 方案 1：显式类型注解
const templates: Partial<GanttTemplates> = {
  task_text: (_s, _e, task) => task.text
};

// 方案 2：用于字面量自动完成的助手
const templates = defineGanttTemplates({
  task_text: (_s, _e, task) => task.text
};

// 方案 3：内联字面量 - 通过属性类型进行推断
<VueGantt :templates="{ task_text: (_s, _e, task) => task.text }" />
~~~

### 组合式

包装器暴露五个组合式函数，以在可引用的引用对象和生命周期安全的形式中包装常见的实例端调用。每一个都需要一个 `Ref<VueGanttRef | null>`，以便等待实例变为可用。

#### `useGanttActions(ganttRef)`

返回包装安全的命令式操作：

| 方法 | 签名 | 备注 |
|--------|-----------|-------|  
| `undo()` | `() => void` | 需要 `plugins: { undo: true }`。 |
| `redo()` | `() => void` | 需要 `plugins: { undo: true }`。 |
| `render()` | `() => void` | 强制重绘 - 与 `instance.eachTask(...)` 搭配用于批量变更。 |
| `exportToPDF()` | `() => void` | 需要 `plugins: { export_api: true }`。 |
| `exportToPNG()` | `() => void` | 需要 `plugins: { export_api: true }`。 |
| `exportToExcel(config?)` | `(config?: object) => void` | 需要 `plugins: { export_api: true }`。通过 `config` 传递导出选项。 |
| `exportToMSProject()` | `() => void` | 需要 `plugins: { export_api: true }`。 |

~~~ts
import { ref } from "vue";
import { useGanttActions, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const actions = useGanttActions(ganttRef);

const exportPdf = () => actions.exportToPDF();
const exportExcel = () => actions.exportToExcel({ visual: "base-colors" });
~~~

#### `useWorkTime(ganttRef)`

返回一个围绕 Gantt 工作时间 API 的计算包装器。模板与约束计算中很有用。

| 方法 | 签名 |
|--------|-----------|  
| `isWorkTime({ date, task?, unit? })` | `(args) => boolean` |
| `calculateEndDate({ start, duration, unit?, task? })` | `(args) => Date` |
| `calculateDuration({ start, end, task? })` | `(args) => number` |
| `getClosestWorkTime({ date, task?, unit, dir? })` | `(args) => Date` |

~~~ts
import { useWorkTime, type VueGanttRef } from "@dhtmlx/trial-vue-gantt";

const ganttRef = ref<VueGanttRef | null>(null);
const workTime = useWorkTime(ganttRef);

const templates = {
  scale_cell_class: (date: Date) =>
    workTime.value.isWorkTime({ date }) ? "" : "weekend"
};
~~~

#### `useGanttDatastore<T>(ganttRef, storeName)`

返回任意 Gantt 数据存储的计算读取器（例如 `"task"`、`"link"`、`"resource"`）。

| 方法 | 签名 |
|--------|-----------|  
| `getItem(id)` | `(id: string \| number) => T \| null` |
| `getItems()` | `() => T[]` |
| `hasChild(id)` | `(id: string \| number) => boolean` |
| `getChildren(id)` | `(id: string \| number) => (string \| number)[]` |

~~~ts
import type { Task } from "@dhtmlx/trial-vue-gantt";
import { useGanttDatastore } from "@dhtmlx/trial-vue-gantt";

const taskStore = useGanttDatastore<Task>(ganttRef, "task");

const rootTasks = computed(() => taskStore.value.getChildren(0));
~~~

#### `useResourceAssignments(ganttRef)`

返回资源/任务分配数据的计算读取器。

| 方法 | 签名 |
|--------|-----------|  
| `getResourceAssignments(resourceId, taskId?)` | `(resourceId: string \| number, taskId?: string \| number) => any[]` |
| `getTaskResources(taskId)` | `(taskId: string \| number) => any[]` |

~~~ts
import { useResourceAssignments } from "@dhtmlx/trial-vue-gantt";

const assignments = useResourceAssignments(ganttRef);

const showAssignments = (resourceId: string | number) => {
  console.log(assignments.value.getResourceAssignments(resourceId));
};
~~~

#### `useGanttEvent(ganttRef, eventName, handler)`

以生命周期安全的方式挂载一个单一的 Gantt 事件。该处理程序在组件卸载时自动分离；如果 `ganttRef`、`eventName` 或 `handler` 更改时会重新挂载。返回 `{ detach }` 以便手动控制。

~~~ts
import { useGanttEvent } from "@dhtmlx/trial-vue-gantt";

const { detach } = useGanttEvent(ganttRef, "onTaskDblClick", id => {
  console.log("dbl-click", id);
});

// 可选：提前分离
// detach();
~~~

在一个一次性监听器无法很好适应 `events` 映射（例如需要根据本地状态更新或取消订阅的监听器）时，请使用它。

## 下一步阅读

- [Vue Gantt Overview](integrations/vue/overview.md)
- [Customization Patterns](integrations/vue/customization-patterns.md)
- [Data Binding and State Management Basics](integrations/vue/state/state-management-basics.md)
- [Using Vue Gantt with Pinia](integrations/vue/state/pinia.md)