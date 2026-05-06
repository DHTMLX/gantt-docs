---
title: 在 ReactGantt 中使用 DHTMLX Gantt 属性
sidebar_label: 配置
description: "包装属性对 Gantt 配置、模板、事件和数据存储的完整参考"
---

# 在 ReactGantt 中使用 DHTMLX Gantt 属性

本页描述 React Gantt 接受的属性，以及它们如何映射到 DHTMLX Gantt 的功能。

## 可用属性

<table>
  <thead>
  <tr>
  <th>属性</th>
  <th>类型</th>
  <th>描述</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>一个包含 [task objects](guides/supported-data-formats.md) 的数组。</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>一个包含 [link objects](guides/supported-data-formats.md) 的数组。</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>覆盖 [gantt.templates](api/other/templates.md)，例如: [task_text](api/template/task_text.md)、[task_class](api/template/task_class.md)、[scale_cell_class](api/template/scale_cell_class.md)。</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>合并到 [gantt.config](api/overview/properties-overview.md)，例如: [scales_config](api/config/scales.md)、[columns_config](api/config/columns.md)、[autosize_config](api/config/autosize.md)。</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>一个工作日历数组。示例: [Working Calendars](integrations/react/overview.md#working-calendars)。</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>一个包含 [resource objects](/guides/resource-management#manual-creation-of-data-store) 的数组。</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>一个包含 [baseline objects](/guides/inbuilt-baselines#loading-baselines-with-tasks) 的数组。</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>用于 [timeline markers](/guides/markers) 的标记对象数组。</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Gantt extensions](/guides/extensions-list/) 需要被激活（例如: [critical_path](/guides/critical-path/)，[auto_scheduling](/guides/auto-scheduling/)）。</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>允许通过内置的 Gantt 传输加载数据，并提供对对 Gantt 数据所做更改的回调。</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>设置 [gantt.i18n.setLocale(locale)](/guides/localization/)。默认值为 "en"。</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>应用 [gantt.setSkin(theme)](/guides/skins/)。默认值为 "terrace"。</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>一个替代内置 Lightbox 的 React 组件（参见 [Custom Lightbox](/guides/custom-edit-form/)）。</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>允许将基于 React 的内联编辑器映射到 DHTMLX 的内联编辑器接口。</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>分组配置对象，或设为 false/null 以禁用分组（参见 [Grouping Tasks ](api/method/groupby.md)。）。</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>用于筛选 Gantt 任务的函数。</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>用于筛选资源以展示在 [Resource Panel](/guides/resource-management/)。</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>允许用自定义组件替换 <code>onBeforeTaskDelete</code> 与 <code>onBeforeLinkDelete</code> 模态框。</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>包装器同样支持传递对应 DHTMLX Gantt 事件的事件处理属性。例如 onTaskClick、onAfterTaskAdd 等。如果属性名与事件名相符，则会自动挂载。</td>
  </tr>
  </tbody>
</table>

## 示例用法

~~~jsx
<ReactGantt
  tasks={tasks}
  links={links}
  theme="material"
  locale="en"
  config={{
    scales: [
      { unit: "year", step: 1, format: "%Y" },
      { unit: "month", step: 1, format: "%M" }
    ],
    columns: [
      { name: "text", tree: true, width: '*' },
      { name: "start_date", align: "center" },
      { name: "duration", align: "center" },
      { name: "add" }
    ],
    // 你想要的其他 gantt.config
  }}
  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates={{
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  }}
/>
~~~

## 使用事件属性

你可以将任意 DHTMLX Gantt 事件作为属性传递。例如：

~~~js
<ReactGantt

  onTaskClick={(id, e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~

内部实现中，包装器会在你传递名为 `onBeforeTaskAdd` 的属性时调用 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)。若要查看完整的事件列表，请参阅 [DHTMLX Gantt API](api/overview/events-overview.md)。

## 将 Props 与 DHTMLX API 结合使用

`@dhx/react-gantt` 库旨在尽可能做到日常使用的声明式——大多数用例可以通过标准属性（例如 tasks、links、resources、templates 等）来解决。然而，某些场景可能需要对 Gantt 引擎进行更深入的访问。例如：

- [Worktime 计算](guides/working-time.md)
- [Auto scheduling] 的逻辑或诸如 [resource computations](guides/resource-management.md) 等高级功能
- 调用 [Gantt API] 的任意专用方法（参见 [Gantt API 概览](api/api-overview.md)）

在这些场景中，你可以使用两种额外的方法来访问底层的 DHTMLX Gantt 功能：

- **React 钩子（hooks）**，由包装器专门提供，用于将 Gantt 的数据存储和排程逻辑连接起来

- **通过 `\ref` 直接访问 Gantt 实例**，如果内置钩子无法覆盖你所有的需求

### 使用内置钩子

库 `@dhx/react-gantt` 提供了一组可选的钩子，用于将 React 组件连接到内部 Gantt API。这些钩子为 Gantt 的底层方法和数据存储提供了“桥梁”。你可以直接在组件中调用这些钩子，或将它们组合成你自己的自定义钩子，以实现诸如资源直方图等的专门特性。

#### useGanttDatastore&lt;T&gt;(ganttRef, storeName)

`useGanttDatastore` 钩子提供对特定 Gantt 数据存储的只读访问。常见用途包括访问资源数据存储、基线，或任何内置或自定义的存储。

它提供以下函数：

- `getItem(id)` - 从数据存储中返回指定项

- `getItems()` - 从指定的数据存储中返回所有项

- `hasChild(id: string | number)` - 检查某项是否有子项

- `getChildren(id: string | number)` - 检索子项

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // 示例：只是在控制台打印数据
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

你可以在需要直接获取特定数据存储底层数据时使用此钩子。例如，检查某个资源是分组还是个人资源。

#### useResourceAssignments(ganttRef)

`useResourceAssignments` 钩子暴露 Gantt 与资源相关的方法，例如检索某资源的分配或列举哪些资源被分配到某个任务。

它提供以下函数：

- `getResourceAssignments(resourceId, taskId?)` - 连接到 [](api/method/getresourceassignments.md)

- `getTaskResources(taskId)` - 连接到 [](api/method/gettaskresources.md)

~~~js
import React from 'react';
import { useResourceAssignments } from '@dhx/react-gantt';

export function ResourceUsage({ ganttRef, taskId }) {
  const { getTaskResources } = useResourceAssignments(ganttRef);

  const resources = getTaskResources(taskId);
  return (
    <div>
      Task {taskId} assigned to: 
      {resources.map(r => r.text).join(', ')}
    </div>
  );
}
~~~

你可能需要这个钩子来实现关于资源使用的自定义逻辑，例如计算分配的小时数或按所有者对任务进行分组。

#### useWorkTime(ganttRef)

提供对内置的 DHTMLX Gantt 工作时间函数的直接桥接，例如 [](api/method/isworktime.md)、[](api/method/calculateenddate.md)、[](api/method/calculateduration.md)。

你将需要这个钩子来根据 Gantt 工作日历设置高亮显示工作/非工作时间，以及在与工作日历一致的日期运算中使用。

它提供以下函数：

- `isWorkTime({ date:Date, unit?: string, task?:Task })` - 桥接到 [](api/method/isworktime.md)

- `calculateEndDate({start:Date, duration:number, unit?: string, task?: Task})` - 桥接到 [](api/method/calculateenddate.md)

- `calculateDuration({start:Date, end:Date, task?: Task})` - 桥接到 [](api/method/calculateduration.md)

- `getClosestWorkTime({ date:Date, unit?: string, task?: Task, dir?: "past"|"future" })` - 桥接到 [](api/method/getclosestworktime.md)


~~~js
import { useEffect, useRef, useState } from 'react';
import ReactGantt, {GanttTemplates, useWorkTime} from "@dhx/react-gantt";
import "@dhx/react-gantt/dist/react-gantt.css";

export default function GanttTemplatesDemo() {
  const ganttRef = useRef<ReactGanttRef>(null);

  const { isWorkTime }= useWorkTime(ganttRef);
  ...
  const templates: GanttTemplates = {
    timeline_cell_class: (task: Task, date: Date) => {
      return isWorkTime({date, task}) ? "" : "weekend";
    }
  };
  ...
~~~

#### 将钩子组合成你自己的自定义钩子

一个很好的实践是使用这些基础桥接钩子来构建你自己的领域或项目特定的钩子。例如，如果你想创建一个资源直方图，你可能会创建一个自定义钩子来缓存容量值、汇总资源使用等。  

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // 自定义逻辑：容量缓存、分组检测等
  // ...
  return {
    // 例如：getCapacity、getAllocatedValue
  };
}
~~~

### 通过 ref 直接访问 Gantt 实例

尽管这些钩子涵盖了大多数高级需求，但你可能仍然希望直接访问整个 Gantt 实例。对此，ref 的方式仍然可用：

~~~jsx
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 在这里你可以调用任意 Gantt API 方法
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref={ganttRef}
      tasks={tasks}
      links={links}
    />
  );
}
~~~

:::note
info 请注意，如果在直接修改 Gantt 实例中的 tasks/links 的同时也通过 React 属性提供它们，请保持同步或重新解析数据。否则，下一次 React 重新渲染可能会覆盖你手动的修改。
:::

如果你想执行某些属性未暴露的操作，仍然可以直接调用 gantt 方法。有关更多细节，请参阅 [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi)。