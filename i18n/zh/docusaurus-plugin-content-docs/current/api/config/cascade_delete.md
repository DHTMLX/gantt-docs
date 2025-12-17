---
sidebar_label: cascade_delete
title: cascade_delete config
description: "允许在删除父任务时自动删除嵌套的子任务和链接"
---

# cascade_delete

### Description

@short: 允许在删除父任务时自动删除嵌套的子任务和链接

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

在版本 4.2 中引入

### Related Guides
- [任务的基本操作](guides/crud-task.md)
