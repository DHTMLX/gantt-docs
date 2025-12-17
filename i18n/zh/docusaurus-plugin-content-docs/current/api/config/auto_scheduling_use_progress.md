---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "设置调度算法如何处理已完成的任务"
---

# auto_scheduling_use_progress
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 设置调度算法如何处理已完成的任务

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
 该设置属于 **auto_scheduling** 或 **critical_path** 扩展的一部分。要使用它，您需要启用 [auto_scheduling](guides/extensions-list.md) 或 [critical_path](guides/extensions-list.md#guanjianlujing) 插件。更多信息请参见 [自动调度](guides/auto-scheduling.md) 和 [关键路径](guides/critical-path.md) 文档。 
:::

启用后，关键路径、slack 和自动调度算法将考虑任务的进度，类似于 MS Project 的操作，具体如下:

1) 标记为已完成（进度为 100%）的任务始终具有零 slack；

2) 已完成的任务将从自动调度计算中排除。连接前置任务到已完成任务的依赖关系将被忽略；

3) 已完成的任务不能成为关键路径的一部分。

:::note
Sample: [使用进度进行自动调度、关键路径和 slack 计算 ](https://snippet.dhtmlx.com/ju3km1uy ) 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)
- [关键路径](guides/critical-path.md)

### Change log
- 在 v8.0 中添加

