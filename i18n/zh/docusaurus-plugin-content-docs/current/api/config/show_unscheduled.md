---
sidebar_label: show_unscheduled
title: show_unscheduled 配置
description: "启用显示未排程的任务"
---

# show_unscheduled

### Description

@short: 启用显示未排程的任务

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**默认值：** true

### Related samples
- [显示未排程的任务](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

请注意，默认情况下，未排程的任务显示为空行。要在时间线区域显示它们，需要将 **show_unscheduled** 属性的值设置为 *false*。
这可能会让你感到困惑，但我们将在未来的某个版本中修复属性名称与其值之间的不一致性。

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [任务的基本操作](guides/unscheduled-tasks.md)