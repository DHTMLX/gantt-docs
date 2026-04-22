---
sidebar_label: order_branch_free
title: order_branch_free 配置
description: "启用允许在整个甘特图中重新排序任务的 'branch' 模式"
---

# order_branch_free

### Description

@short: 启用允许在整个甘特图中重新排序任务的 'branch' 模式

@signature: order_branch_free: boolean

### Example

~~~jsx
// 在相同嵌套层级内重新排序任务
gantt.config.order_branch = true;
// 在整个甘特图中任意位置重新排序任务
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**默认值：** false

### Related samples
- [在 Grid 中拖放行](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [任务重新排序](guides/reordering-tasks.md)