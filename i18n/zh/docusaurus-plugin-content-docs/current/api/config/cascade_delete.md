---
sidebar_label: cascade_delete
title: cascade_delete config
description: "启用嵌套任务和链接的级联删除"
---

# cascade_delete

### Description

@short: 启用嵌套任务和链接的级联删除

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

在 4.2 版本中新增

### Related Guides
- [任务的基本操作](guides/crud-task.md)