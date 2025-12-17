---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "enables auto scheduling"
---

# auto_scheduling

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Enables auto scheduling

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
This config is defined in the **auto_scheduling** extension, so you need to activate the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

While `auto_scheduling` config can be set as a boolean, usage of the object definition is the recommended approach for configuring the auto-scheduling behavior. 


When set as an object, the following options are available:


#### enabled

**Type**: boolean

**Default**: `false`

Turns auto-scheduling on or off (same as using a boolean value directly).

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

#### apply_constraints

**Type**: boolean

**Default**: `true`

Enables or disables usage of time constraints for auto scheduling.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

Setting the value to `false` switches auto scheduling to the mode that ignores constraints associated with tasks (e.g. ASAP, ALAP, SNET, etc.) and scheduling depends solely on task dependencies.

This property replaces the deprecated [](api/config/auto_scheduling_compatibility.md) setting.

- [Basic Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)
- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

<span id="gapbehavior"></span>

#### gap_behavior

**Type**: String

**Allowed values**: `"preserve"`|`"compress"`

**Default**: `"preserve"`


Defines how Gantt handles gaps between dependent tasks during scheduling.

- **"preserve"** - keeps tasks in their current positions if there are no conflicts
- **"compress"** - moves tasks to the earliest allowed date (or latest if `schedule_from_end` is enabled)

By default, tasks are only rescheduled when their current date violates a constraint or dependency. 

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

Allows or forbids creating links between parent tasks (projects) and their subtasks.

By default, such links can't be created.

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

Defines whether Gantt will do auto-scheduling on data loading/parsing.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: false
};
~~~

#### move_projects

**Type**: boolean

**Default**: `true`

By default (when the property is set to *true*), the whole project is moved during auto scheduling. It means that all tasks in the project remain on their places
relative to each other and the beginning of the project.

![moving_project_true](/img/moving_project_true.png)


If the *move_projects* property is set to *false*, auto scheduling will move separate tasks inside of the project. Thus, some tasks will be moved, others will
remain on their places.

![moving_project_false](/img/moving_project_false.png)


:::note
If you use the constraint scheduling (*apply_constraints: true*), the *move_projects* config will be active only when the `gap_behavior` property is set to "preserve"`:

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

Specifies whether completed tasks should affect scheduling and critical path calculations.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
~~~

When the property is enabled, the critical path, slack, and auto scheduling algorithms will take the value of the task progress into account, similar to how these methods work in MS Project, namely:

1) Completed tasks (completed tasks - the tasks with 100% progress) always have zero slack;

2) Completed tasks are excluded from the auto scheduling calculations. Relations that connect predecessors to completed tasks are ignored;

3) Completed tasks can't be critical.

- [Use progress for auto-scheduling, critical path and slack calculations](https://snippet.dhtmlx.com/ju3km1uy)

#### schedule_from_end

**Type**: boolean

**Default**: `false`

Enables backward scheduling.

Setting this config to `true` will switch auto scheduling to the `as late as possible` mode.

The value will be only applied if [](api/config/project_end.md) is specified as well. 

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

Defines whether tasks should inherit the constraint type from their parent project.

~~~jsx
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

By default, the constraint type of the parent project doesn't affect the constraint type of its nested tasks.

If you set the config to *true*, the child tasks (except for tasks with their own constraint type) will have the same constraint type as their parent project (for example, **finish no later than**).

- [Constraint Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

#### show_constraints

**Type**: boolean

**Default**: `false`

Controls the display of task constraints on the Gantt chart.
Set to `true` to display constraints or `false` to hide them.

For example, to enable auto-scheduling but disable the display of task constraints:

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
- since v9.1, using the object configuration for `auto_scheduling` is the recommended approach
- Can be set as an object since v9.0


