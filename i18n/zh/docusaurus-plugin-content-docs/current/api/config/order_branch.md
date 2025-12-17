---
sidebar_label: order_branch
title: order_branch config
description: "启用'branch'模式，在同一树级别内垂直重新排列任务"
---

# order_branch

### Description

@short: 启用"branch"模式，在同一树级别内垂直重新排列任务

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

此设置允许您在保持任务当前树级别的同时重新排序任务。例如，一个子任务仍然是子任务，不会变成父任务。

## 提升性能

当处理大量任务时，默认的branch重新排序可能会导致性能下降。
为提升性能，您可以切换到**"marker"**模式。

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

在此模式下，按住左键拖动时只移动任务名称，只有当任务放置到新位置（释放按钮时）后，甘特图才会刷新。
与默认模式不同，这种移动任务的方式不会触发onBeforeTaskMove或onAfterTaskMove事件。

如果您想阻止任务被放置到某些位置，可以使用[onBeforeRowDragMove](api/event/onbeforerowdragmove.md)事件（此事件仅在"marker"模式下有效）。

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)

