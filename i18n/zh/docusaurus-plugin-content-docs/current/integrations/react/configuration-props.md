---
title: "使用 ReactGantt 中的 DHTMLX Gantt 属性"
sidebar_label: "配置"
---

使用 ReactGantt 中的 DHTMLX Gantt 属性
===============

本页概述了 React Gantt 支持的 props，并解释了它们与 DHTMLX Gantt 功能的对应关系。

可用 Props
-----------------

<table>
  <thead>
  <tr>
  <th>Prop</th>
  <th>类型</th>
  <th>说明</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>tasks</td>
  <td>Task[]</td>
  <td>一个 [任务对象](guides/supported-data-formats.md#json)数组。</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>一个 [链接对象](guides/supported-data-formats.md#json)数组。</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>重写 [gantt.templates](api/overview/templates-overview.md)，如 [task_text](api/template/task_text.md)、[task_class](api/template/task_class.md)、[scale_cell_class](api/template/scale_cell_class.md)。</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>合并到 [gantt.config](api/overview/properties-overview.md)，包含如 [scales](api/config/scales.md)、[columns](api/config/columns.md)、[autosize](api/config/autosize.md) 等选项。</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>一个 [资源对象](guides/resource-management.md)数组。</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>一个 [基线对象](guides/inbuilt-baselines.md)数组。</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>用于 [时间线标记](guides/markers.md)的标记对象数组。</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>需启用的 [Gantt 扩展](guides/extensions-list.md)（如 [critical_path](guides/critical-path.md)、[auto_scheduling](guides/auto-scheduling.md) 等）。</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>支持通过内置 Gantt 传输加载数据，并提供回调以处理 Gantt 数据的更改。</td>
  </tr>
  <tr>
  <td>locale</td>
  <td>string</td>
  <td>设置 [gantt.i18n.setLocale(locale)](guides/localization.md)。默认值为 "en"。</td>
  </tr>
  <tr>
  <td>theme</td>
  <td>string</td>
  <td>应用 [gantt.setSkin(theme)](guides/skins.md)。默认值为 "terrace"。</td>
  </tr>
  <tr>
  <td>customLightbox</td>
  <td>ReactElement | null</td>
  <td>用于替换默认 Lightbox 的 React 组件（参见 [自定义 Lightbox](guides/custom-edit-form.md)）。</td>
  </tr>
  <tr>
  <td>inlineEditors</td>
  <td>( [editorType: string]: React.ComponentType )</td>
  <td>允许将基于 React 的内联编辑器映射到 DHTMLX 的内联编辑器接口。</td>
  </tr>
  <tr>
  <td>groupTasks</td>
  <td>GroupConfig | boolean | null</td>
  <td>指定分组配置，或设置为 false 或 null 以禁用分组（参见 [任务分组](api/method/groupby.md)）。</td>
  </tr>
  <tr>
  <td>filter</td>
  <td>((task: Task) =&gt; boolean) | null</td>
  <td>用于过滤显示的 Gantt 任务的函数。</td>
  </tr>
  <tr>
  <td>resourceFilter</td>
  <td>((resource: Resource) =&gt; boolean) | null</td>
  <td>过滤 [资源面板](guides/resource-management.md)中显示的资源。</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>允许自定义组件替换 <code>onBeforeTaskDelete</code> 和 <code>onBeforeLinkDelete</code> 弹窗。</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>支持与 DHTMLX Gantt 事件同名的事件处理 props，例如 onTaskClick、onAfterTaskAdd 等。名称匹配的 props 会自动绑定。</td>
  </tr>
  </tbody>
</table>

使用示例
-------------------

~~~js
<ReactGantt
  tasks="{tasks}"
  links="{links}"
  theme="material"
  locale="en"
  config="{" {
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
  } }
  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}
  templates="{" {
    task_text: (start, end, task) => `#${task.id}: ${task.text}`,
  } }
/>
~~~

事件 Props 的使用
----------------

任何 DHTMLX Gantt 事件都可以作为 prop 传递。例如:

~~~js
<ReactGantt

  onTaskClick="{(id," e) => {
    console.log('Task clicked:', id);
    return true; 
  }}

/>
~~~
当你传递如 `onBeforeTaskAdd` 这样的 prop 时，封装组件会在内部调用 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)。完整事件列表请参考 [DHTMLX Gantt API](api/overview/events-overview.md)。

组合 Props 与 DHTMLX API
---------------

`@dhx/react-gantt` 库旨在通过声明式 props（如 tasks、links、resources、templates 等）覆盖大多数日常需求。但在某些情况下，您可能需要更深入地访问 Gantt 引擎，例如:

- [工作时间计算](guides/working-time.md)
- [自动调度](guides/auto-scheduling.md) 或更高级的功能如 [资源计算](guides/resource-management.md)
- 使用 [Gantt API](api/api-overview.md) 的特定方法

针对这些场景，有两种方式可以直接与底层 DHTMLX Gantt 功能交互:

- **React hooks**:由封装库提供，连接到 Gantt 的数据存储和调度逻辑

- **通过 ref 直接访问** Gantt 实例（如果 hooks 无法满足所有需求）

### 使用内置 hooks 

`@dhx/react-gantt` 提供若干可选 hooks，将 React 组件与内部 Gantt API 连接。这些 hooks 是 Gantt 方法和数据存储的桥梁。你可以在组件中直接使用它们，也可以组合成自定义 hooks，用于如资源直方图等特定功能。

#### useGanttDatastore\<T\>(ganttRef, storeName)

`useGanttDatastore` hook 提供对特定 Gantt 数据存储的只读访问。常用于访问资源存储、基线或其他内置/自定义存储。

包含以下函数:

- `getItem(id)` - 从数据存储中获取指定项

- `getItems()` - 获取数据存储中的所有项

- `hasChild(id: string | number)` - 检查某项是否有子项

- `getChildren(id: string | number)` - 获取子项

~~~js
import { useMemo } from 'react';
import { useGanttDatastore } from '@dhx/react-gantt';

function MyResourceList({ ganttRef }) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');

  const resourceIds = resourceStore.getItems().map(item => item.id);

  // 示例，仅用于打印数据
  useMemo(() => {
    console.log('Resource IDs:', resourceIds);
  }, [resourceIds]);

  return null; 
}
~~~

当你需要直接访问某个数据存储中的底层数据时（例如判断资源是组还是个人），该 hook 很有用。

#### useResourceAssignments(ganttRef)

`useResourceAssignments` hook 提供与资源相关的方法，包括获取资源的分配信息或列出分配给任务的资源。

包含以下函数:

- `getResourceAssignments(resourceId, taskId?)` - 对应 [getResourceAssignments](api/method/getresourceassignments.md)

- `getTaskResources(taskId)` - 对应 [getTaskResources](api/method/gettaskresources.md)

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

该 hook 便于实现自定义的资源使用逻辑，例如计算分配工时或按负责人分组任务。

#### useWorkTime(ganttRef)

此 hook 提供对 DHTMLX Gantt 内置工作时间函数的访问，如 [isWorkTime](api/method/isworktime.md)、[calculateEndDate](api/method/calculateenddate.md) 和 [calculateDuration](api/method/calculateduration.md)。

它适合根据 Gantt 工作日历设置高亮工作/非工作时间，并进行符合工作日历的日期计算。

提供的函数包括:

- `isWorkTime(( date:Date, unit?: string, task?:Task ))` - 对应 [isWorkTime](api/method/isworktime.md)

- `calculateEndDate((start:Date, duration:number, unit?: string, task?: Task))` - 对应 [calculateEndDate](api/method/calculateenddate.md)

- `calculateDuration((start:Date, end:Date, task?: Task))` - 对应 [calculateDuration](api/method/calculateduration.md)

- `getClosestWorkTime(( date:Date, unit?: string, task?: Task, dir?: "past"|"future" ))` - 对应 [getClosestWorkTime](api/method/getclosestworktime.md)

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

#### 组合 hooks 构建自定义 hooks

推荐将这些基础 hooks 组合，构建你自己的领域或项目专用 hooks。例如，为实现资源直方图，你可以开发一个自定义 hook 用于缓存容量值并汇总资源使用情况:

~~~js
import { useMemo } from 'react';
import { useGanttDatastore, useResourceAssignments } from '@dhx/react-gantt';

export function useResourceHistogram(ganttRef) {
  const resourceStore = useGanttDatastore(ganttRef, 'resource');
  const { getResourceAssignments } = useResourceAssignments(ganttRef);

  // 自定义逻辑：容量缓存、组检测等
  // ...
  return {
    // 例如 getCapacity、getAllocatedValue
  };
}
~~~

### 通过 ref 直接访问 Gantt 实例

虽然 hooks 能覆盖大多数高级需求，但你仍可以通过 `ref` 直接访问整个 Gantt 实例:

~~~js
import React, { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;

    // 你可以在这里调用任何 Gantt API 方法
    console.log('All tasks:', gantt.getTaskByTime());
    gantt.showDate(new Date());
  }, []);

  return (
    <ReactGantt
      ref="{ganttRef}"
      tasks="{tasks}"
      links="{links}"
    />
  );
}
~~~

:::info
 如果你直接在 Gantt 实例上修改 tasks 或 links，同时又作为 React props 提供它们，请确保同步或重新解析数据。否则 React 下次渲染时可能会覆盖你手动的更改。
:::

如果你需要执行 props 未覆盖的操作，依然可以直接调用 gantt 方法。更多细节参见 [Accessing the Underlying Gantt API](integrations/react.md)。

