---
sidebar_label: order_branch
title: order_branch config
description: "激活 'branch' 模式，允许在同一树级别内垂直重新排序任务"
---

# order_branch

### Description

@short: 激活 'branch' 模式，允许在同一树级别内垂直重新排序任务

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [分支排序](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

本选项允许在保持其树级位置的同时重新排序任务。例如，子任务永远不会成为父任务。

## 性能提升

如果你的 Gantt 包含大量任务，分支重新排序的默认模式可能会降低性能。
要加速，可以使用 **"marker"** 模式。

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
示例 [分支排序 - 高亮显示模式](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)
:::

在此模式下，只重排任务的名称（在按住左键时），Gantt 仅在任务被放置到目标位置时重新渲染（释放按键时）。
与默认模式不同，改变任务位置不会触发 onBeforeTaskMove/onAfterTaskMove 事件。

要防止任务在特定位置被放置，请改用 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 事件（仅在 "marker" 模式下工作）。

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)