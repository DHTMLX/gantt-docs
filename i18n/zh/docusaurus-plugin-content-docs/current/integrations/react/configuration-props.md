---
title: 在 ReactGantt 中使用 DHTMLX Gantt 属性
sidebar_label: 配置
description: "包装属性对 Gantt 配置、模板、事件和数据存储的完整参考"
---

# 在 ReactGantt 中使用 DHTMLX Gantt 属性

本页描述 React Gantt 接受的属性，以及它们如何映射到 DHTMLX Gantt 的特性。

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
  <td>一个 [task objects](guides/supported-data-formats.md) 的数组。</td>
  </tr>
  <tr>
  <td>links</td>
  <td>Link[]</td>
  <td>一个 [link objects](guides/supported-data-formats.md) 的数组。</td>
  </tr>
  <tr>
  <td>templates</td>
  <td>GanttTemplates</td>
  <td>覆盖 [gantt.templates](api/other/templates.md)，例如： [task_text](api/template/task_text.md)、[task_class](api/template/task_class.md)、[scale_cell_class](api/template/scale_cell_class.md)。</td>
  </tr>
  <tr>
  <td>config</td>
  <td>GanttConfig</td>
  <td>合并到 [gantt.config](api/overview/properties-overview.md)，例如：[scales_config](api/config/scales.md)、[columns_config](api/config/columns.md)、[autosize_config](api/config/autosize.md)。</td>
  </tr>
  <tr>
  <td>calendars</td>
  <td>Calendar[]</td>
  <td>一组工作日历。示例：[Working Calendars](integrations/react/overview.md#working-calendars)。</td>
  </tr>
  <tr>
  <td>resources</td>
  <td>Resource[]</td>
  <td>一个 [resource objects](/guides/resource-management#manual-creation-of-data-store) 的数组。</td>
  </tr>
  <tr>
  <td>baselines</td>
  <td>Baseline[]</td>
  <td>一个 [baseline objects](/guides/inbuilt-baselines#loading-baselines-with-tasks) 的数组。</td>
  </tr>
  <tr>
  <td>markers</td>
  <td>Marker[]</td>
  <td>用于 [timeline markers](/guides/markers) 的标记对象数组。</td>
  </tr>
  <tr>
  <td>plugins</td>
  <td>GanttPlugins</td>
  <td>[Gantt extensions](/guides/extensions-list/) 需要被激活，例如 [critical_path](/guides/critical-path/)、[auto_scheduling](/guides/auto-scheduling/)。</td>
  </tr>
  <tr>
  <td>data</td>
  <td>( load?: string, save?: string|RouterFunction, batchSave?: BatchChanges)</td>
  <td>允许通过内置的 Gantt 传输加载数据，并提供对对 Gantt 数据所作更改的回调。</td>
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
  <td>用于替换内置 Lightbox 的 React 组件（参见 [Custom Lightbox](/guides/custom-edit-form/)）。</td>
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
  <td>用于筛选资源以用于 [Resource Panel](/guides/resource-management/)。</td>
  </tr>
  <tr>
  <td>modals</td>
  <td>GanttModals</td>
  <td>允许用自定义组件替换 <code>onBeforeTaskDelete</code> 与 <code>onBeforeLinkDelete</code> 模态框。</td>
  </tr>
  <tr>
  <td>htmlTemplatePolicy</td>
  <td>HtmlTemplatePolicy</td>
  <td>控制从模板函数返回的字符串值的呈现方式。 <code>"basic-sanitize"</code>（默认）对返回的 HTML 进行白名单净化：保留安全的格式、类、有限的内联样式、<code>data-*</code> 属性和 <code>img</code>，同时移除脚本、事件处理程序和危险 URL。 <code>"escape"</code> 将字符串渲染为文本； <code>"unsafe-html"</code> 按原样渲染字符串（pre-v10 行为）；一个自定义的消毒对象（<code>mode: "sanitize"</code>，带有 <code>sanitize(html)</code> 函数）可以让你接入诸如 DOMPurify 的库。若要对每个模板进行单独控制，请使用导出的 <code>allowRawHTML()</code> 助手对各自的模板函数进行包裹。请参阅 [Migration notes](/migration#91---92).</td>
  </tr>
  <tr>
  <td>(Event Props)</td>
  <td>Function</td>
  <td>包装器同样支持传递与 DHTMLX Gantt 事件对应的事件处理程序属性。例如 onTaskClick、onAfterTaskAdd 等。如果属性名与事件名匹配，将自动附加。</td>
  </tr>
  </tbody>
</table>

## Type Exports

`@dhx/react-gantt` 包 re-导出若干 TypeScript 类型，可用于给你的应用代码标注类型：

| Export | Description |
|--------|------------|
| `Task` | 内部 Gantt 任务对象。日期是 `Date` 对象；包括以 `$` 前缀的系统属性。在事件处理程序中使用，以及在处理 Gantt 拥有的数据时使用。 |
| `Link` | 内部 Gantt 链接对象。在事件处理程序中使用，以及在处理 Gantt 拥有的数据时使用。 |
| `SerializedTask` | 面向用户的任务形状，用于存储状态、初始数据和保存回调载荷。日期属性接受 `Date \| string`。 |
| `SerializedLink` | 面向用户的链接形状，用于存储状态、初始数据和保存回调载荷。 |

**何时使用 `SerializedTask` / `SerializedLink` vs `Task` / `Link`：**

- **`SerializedTask` / `SerializedLink`** —— 用于你拥有的数据：存储状态、API 响应、初始数据字面量。日期字段接受字符串（如 ISO 日期）。
- **`Task` / `Link`** —— 用于 Gantt 拥有的数据：在事件处理程序中，Gantt 解析数据后使用。日期字段是 `Date` 对象。`Task` 包含以 `$` 开头的内部属性。

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
    // any other gantt.config you want
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
内部，包装器会在你传递名为 `onBeforeTaskAdd` 的属性时调用 [gantt.attachEvent("onBeforeTaskAdd", handler)](api/method/attachevent.md)。如需完整事件列表，请参阅 [DHTMLX Gantt API](api/overview/events-overview.md)。


## 将属性与 DHTMLX API 结合使用

`@dhx/react-gantt` 库旨在尽可能保持声明式，以便日常使用——大多数用例可以通过标准属性（如 tasks、links、resources、templates 等）来解决。不过，可能也会有需要更深层访问 Gantt 引擎的场景。举例来说，可能涉及到：

- [Worktime calculations](guides/working-time.md)
- [Auto scheduling](guides/auto-scheduling.md) 逻辑，或诸如 [resource computations](guides/resource-management.md) 这样的高级功能
- 调用 [Gantt API](api/api-overview.md) 的任何专用方法

在这些情况下，你可以使用两种额外的方式来接入底层的 DHTMLX Gantt 功能：

- **[React hooks](integrations/react/hooks.md)** 这是包装器专门提供的，用于桥接 Gantt 的数据存储和调度逻辑

- **通过引用（ref）直接访问 Gantt 实例**，如果内置的钩子无法覆盖你所有需求

### 使用内置钩子

`@dhx/react-gantt` 库提供了用于事件订阅、资源管理、数据存储访问、撤销/重做、缩放、选取和工作时间计算的钩子。

完整参考请查看专门的 **[Hooks](integrations/react/hooks.md)** 页面，包括：

- [useGanttEvent](integrations/react/hooks.md#useganttEvent) - 带生命周期管理的事件订阅
- [useResourceAssignments](integrations/react/hooks.md#useresourceassignments) - 资源分配查询和变更
- [useGanttDatastore](integrations/react/hooks.md#useganttdatastore) - 只读的数据存储访问
- [useUndoRedo](integrations/react/hooks.md#useundoredo) - 撤销/重做的状态与操作
- [useZoom](integrations/react/hooks.md#usezoom) - 缩放控制和状态
- [useSelection](integrations/react/hooks.md#useselection) - 任务选择跟踪
- [useWorkTime](integrations/react/hooks.md#useworktime) - 工作时间计算

### 使用 ref 直接访问 Gantt 实例

虽然钩子可以满足大多数高级需求，但你可能仍然想要对整个 Gantt 实例进行直接访问。此时，ref 的方式仍然可用：

~~~tsx
import { useRef, useEffect } from 'react';
import ReactGantt, { ReactGanttRef } from '@dhx/react-gantt';

export function DirectRefExample({ tasks, links }) {
  const ganttRef = useRef<ReactGanttRef>(null);

  useEffect(() => {
    const gantt = ganttRef.current?.instance;
    if (!gantt) return;
    gantt.showDate(new Date());
  }, []);

  return <ReactGantt ref={ganttRef} tasks={tasks} links={links} />;
}
~~~

:::note
如果你在直接修改 Gantt 实例中的 tasks 或 links 的同时又通过 React 属性提供了它们，请确保两者保持同步。否则，下一次 React 重新渲染可能会覆盖你手动的修改。
::: 

更多细节请参阅 [Accessing the Underlying Gantt API](integrations/react/overview.md#accessingtheunderlyingganttapi)。