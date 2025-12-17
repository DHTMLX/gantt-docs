---
sidebar_label: show_unscheduled
title: show_unscheduled config
description: "允许切换未排程任务的可见性"
---

# show_unscheduled

### Description

@short: 允许切换未排程任务的可见性

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

默认情况下，未排程任务会以空行的形式显示。如果您希望这些任务直接显示在时间轴区域，请将 **show_unscheduled** 属性设置为 *false*。这个命名可能一开始会让人感到有些困惑，但未来的更新中会对其进行调整，使其更加直观。

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [任务的基本操作](guides/unscheduled-tasks.md)

