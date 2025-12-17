---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "定义在调度过程中是否整个项目都会被移动（详情见下文）"
---

# auto_scheduling_move_projects
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 定义在调度过程中是否整个项目都会被移动（详情见下文）

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 此设置是**auto_scheduling** 扩展的一部分，因此请确保启用 [auto_scheduling](guides/extensions-list.md) 插件。更多信息请参见 [自动调度](guides/auto-scheduling.md) 文章。 
:::


4.1版本新增

默认情况下（当此属性设置为 *true* 时），整个项目会在自动调度时整体移动。这意味着所有任务相对于彼此以及项目开始时间的顺序保持不变。

![moving_project_true](/img/moving_project_true.png)

如果 *auto_scheduling_move_projects* 设置为 *false*，自动调度将调整项目内的各个任务。结果是某些任务会移动，而其他任务保持不动。

![moving_project_false](/img/moving_project_false.png)

<br>
**注意**，在使用约束调度（*gantt.config.auto_scheduling_compatibility = false*）时，*auto_scheduling_move_projects* 设置仅当严格模式关闭时才生效:

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
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

