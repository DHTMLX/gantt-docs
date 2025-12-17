---
sidebar_label: order_branch_free
title: order_branch_free config
description: "启用'branch'模式，允许任务在整个甘特图中任意位置重新排序"
---

# order_branch_free

### Description

@short: 启用"branch"模式，允许任务在整个甘特图中任意位置重新排序

@signature: order_branch_free: boolean

### Example

~~~jsx
// 在相同嵌套层级内重新排序任务
gantt.config.order_branch = true;
// 在整个甘特图中任意位置重新排序任务
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)

