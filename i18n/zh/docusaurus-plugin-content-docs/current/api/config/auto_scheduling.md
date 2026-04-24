---
sidebar_label: auto_scheduling
title: auto_scheduling 配置
description: "启用自动排程"
---

# auto_scheduling

:::info
此功能仅在 PRO 版本中可用。
:::

### Description

@short: 启用自动排程

@signature: auto_scheduling: AutoSchedulingConfig | boolean

### Example

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    gap_behavior: "compress"
};

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
该配置在 **auto_scheduling** 扩展中定义，因此你需要激活 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [Auto Scheduling](guides/auto-scheduling.md) 文章中查看详细信息。
:::

尽管可以将 `auto_scheduling` 配置设置为布尔值，但使用对象定义的方式来配置自动排程行为是推荐的方法。


以对象形式设置时，可以使用以下选项：


#### enabled

**Type**: boolean

**Default**: `false`

开启或关闭自动排程（与直接使用布尔值相同）。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

#### apply_constraints

**Type**: boolean

**Default**: `true`

启用或禁用在自动排程中对时间约束的使用。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

将该值设为 `false` 将把自动排程切换到忽略与任务相关的约束的模式（例如 ASAP、ALAP、SNET 等），排程仅依赖任务依赖关系。

此属性取代了已弃用的 [](api/config/auto_scheduling_compatibility.md) 设置。

- [Basic Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)
- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

<span id="gapbehavior"></span>

#### gap_behavior

**Type**: String

**Allowed values**: `"preserve"`|`"compress"`

**Default**: `"preserve"`


定义 Gantt 在排程过程中如何处理依赖任务之间的空隙。

- **"preserve"** - 如果没有冲突，任务保持在当前的位置
- **"compress"** - 将任务移动到最早允许的日期（如果启用 `schedule_from_end` 则移动到最晚日期）

默认情况下，只有当当前日期违反约束或依赖时才会重新排程。 

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

<span id="descendantlinks"></span>

#### descendant_links

**Type**: boolean

**Default**: `false`

允许或禁止在父任务（项目）及其子任务之间创建链接。

默认情况下，不允许创建此类链接。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    descendant_links: true
};
~~~


#### schedule_on_parse

**Type**: boolean

**Default**: `true`

定义 Gantt 在数据加载/解析时是否执行自动排程。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~


#### move_projects

**Type**: boolean

**Default**: `true`

默认情况下（当属性设置为 *true*），在自动排程期间会移动整个项目。也就是说，同一项目中的所有任务相对于彼此和项目开头的位置保持不变。

![moving_project_true](/img/moving_project_true.png)


如果把 *move_projects* 设置为 *false*，自动排程会移动项目内部的单独任务。因此，一些任务会被移动，而其他任务会保持原位。

![moving_project_false](/img/moving_project_false.png)


:::note
如果使用约束排程（*apply_constraints: true*），只有当 `gap_behavior` 属性设置为 "preserve" 时，*move_projects* 配置才会生效：

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    move_projects: true,
    gap_behavior: "preserve"
};
~~~
:::

#### use_progress

**Type**: boolean

**Default**: `false`

指定完成的任务是否应影响排程和关键路径计算。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

当该属性开启时，关键路径、松弛以及自动排程算法将考虑任务进度的值，与 MS Project 的做法类似，具体而言：

1) 已完成的任务（进度达到 100% 的任务）始终没有松弛时间；

2) 已完成的任务不参与自动排程计算。将前置任务与已完成任务之间的关系忽略；

3) 已完成的任务不能成为关键任务。

- [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy)

#### schedule_from_end

**Type**: boolean

**Default**: `false`

启用向后排程。

将此配置设置为 true 将把自动排程切换到尽可能晚的模式。

该值只有在同时指定 [](api/config/project_end.md) 时才会生效。 

~~~jsx
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

- [Backward Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

#### project_constraint

**Type**: boolean

**Default**: `false`

定义子任务是否应继承其父项目的约束类型。

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

默认情况下，父项目的约束类型不会影响其嵌套任务的约束类型。

如果将配置设为 *true*，子任务（除非它们有自己的约束类型）将具有与父项目相同的约束类型（例如， finish no later than）。

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

#### show_constraints

**Type**: boolean

**Default**: `false`

控制在甘特图上显示任务约束。

设为 true 以显示约束，设为 false 以隐藏它们。

例如，要启用自动排程但禁用任务约束的显示：

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    show_constraints: false
};
gantt.init("gantt_here");
~~~

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Related API
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [constraint_types](api/config/constraint_types.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 自 v9.1 版本起，建議使用物件配置 `auto_scheduling`。
- 自 v9.0 版本起，可將其設定為物件。