---
sidebar_label: order_branch_free
title: order_branch_free config
description: "включает режим 'branch', который позволяет менять порядок задач в любом месте всего gantt chart"
---

# order_branch_free

### Description

@short: Включает режим 'branch', который позволяет менять порядок задач в любом месте всего gantt chart

@signature: order_branch_free: boolean

### Example

~~~jsx
// изменение порядка задач на одном уровне вложенности
gantt.config.order_branch = true;
// изменение порядка задач в любом месте всего gantt
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Изменение порядка задач](guides/reordering-tasks.md)

