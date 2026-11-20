---
title: "Auto Scheduling"
sidebar_label: "Auto Scheduling"
---

# Auto Scheduling

:::info
This functionality is available only in the PRO edition.
:::

The library provides the **auto_scheduling** extension that gives Gantt the ability to schedule tasks automatically depending on relations between them.

![auto_scheduling](/img/auto_scheduling.png)

For example, imagine that you have two tasks connected by a dependency link and the second task starts when the first one ends, and
you need to change the schedule of the first task by moving it to a new date.

Auto scheduling makes the start date of the second task update according to the end date of the first task each time when it changes.
This feature allows you to generate and maintain project schedule by specifying relations between tasks with no need to set dates of each task manually.

## How to use

To use the auto scheduling functionality, you should enable the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin using the [gantt.plugins](api/method/plugins.md) method:

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

And set the **enabled** property of the **auto_scheduling** config to *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


When auto scheduling is enabled, individual tasks still can be scheduled manually. 

## Forward/backward planning {#forwardbackwardplanning}

### Strategies of projects planning

There are two strategies of planning tasks within a project: forward and backward planning. They are defined by combinations of configuration settings:

- [gantt.config.auto_scheduling.schedule_from_end](api/config/auto_scheduling.md#schedule_from_end) - (*boolean*) defines the type of the planning strategy
- [project_start](api/config/project_start.md) - (*Date*) the start date of a project; used as a start date of tasks by default, if forward planning is applied, *null* by default
- [project_end](api/config/project_end.md) - (*Date*) the end date of a project; used for the default time of tasks, if backward planning is used, *null* by default

### Forward planning

The forward planning of tasks is used by default, i.e. **gantt.config.auto_scheduling.schedule_from_end** is set to *false*.

~~~js
// forward planning of tasks is used
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: false
};
~~~

In this case planning of tasks is implemented from the start date or from the date of the earliest task. Tasks are planned *as soon as possible*, if there are no other constraints applied to them.

The start date of the project can be optionally set by the **gantt.config.project_start** config:

~~~js
gantt.config.project_start = new Date(2025, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Backward planning {#backwardscheduling}

It is also possible to plan tasks from the end of the project, i.e. to apply backward planning. For this you need to set the **gantt.config.auto_scheduling.schedule_from_end** property to *true* and specify the end date of the project
via the **gantt.config.project_end** configuration option:

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

In this case tasks are planned as late as possible. The last task should end on the end date of the project.


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## Time constraints for tasks {#timeconstraintsfortasks}

dhtmlxGantt provides the possibility to set additional time constraints for tasks.

:::note
Time constraints are applicable only to tasks and [milestones](guides/milestones.md). Projects are not affected by them.
:::

### Setting constraints via lightbox

You can specify constraints for a task via the [**Constraint** control](guides/constraint.md) in the lightbox of a task.

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "constraint", type: "constraint" }, /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

### Setting constraints via inline editors

It is also possible to [specify separate columns for the type of constraint and its date in the grid](guides/specifying-columns.md#timeconstraintsfortasks) and use inline editors to define constraints for tasks.

![Constraints columns](/img/constraints_columns.png)

Use the **constraint_type** and **constraint_date** columns' names, correspondingly.

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // more options
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1)
};

gantt.config.columns = [
    { /* previous column */ },
    {
        name: "constraint_type", align: "center", width: 100,
        template: task => gantt.locale.labels[gantt.getConstraintType(task)],
        resize: true, editor: constraintTypeEditor
    },
    {
        name: "constraint_date", align: "center", width: 120, template: (task) => {
            // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### Types of constraints

There are several types of time constraints:

1. **As soon as possible** - If this constraint is set to an independent task and the **strict** mode is enabled, the task starts at the same time that the project does. If the **strict** mode is disabled, the task starts on the specified date. 

If this constraint is set to a dependent task, the task starts as soon as its predecessor tasks end.

2. **As late as possible** - If this constraint is set to an independent task, the task ends at the same time that the project does. If this constraint is set to a dependent task, the end of the task coincides with
the start of its immediate successor task.

The other types of constraints affect tasks regardless of the their types (dependent or independent):

3. **Start no earlier than** - the task should start on the specified date or after it.

4. **Start no later than** - the task should start on the specified date or before it.

5. **Finish no earlier than** - the task should end on the specified date or after it.

6. **Finish no later than** - the task should end on the specified date or before it.

7. **Must start on** - the task should start exactly on the specified date.

8. **Must finish on** - the task should end exactly on the specified date.

:::note
By independent tasks here we mean tasks that don't have any successors or predecessors. In other words, these are tasks that don't have any links/relations that connect them or any of their parents to other tasks.
:::

## Resolving constraint conflicts {#resolving-constraint-conflicts}

A dependency can require a date that falls outside a task's constraint. Gantt can keep the constraint, adjust it, or ask the user how to resolve a new conflict. To turn on the dialog, enable auto scheduling and `apply_constraints` in the [auto_scheduling configuration](api/config/auto_scheduling.md#resolve_constraint_conflicts).

~~~js
gantt.plugins({ auto_scheduling: true, undo: true });
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: true,
    resolve_constraint_conflicts: "prompt"
};
gantt.init("gantt_here");
~~~

| Mode | Behavior |
| --- | --- |
| `"keep"` (default) | Keep the constraint, even if the dependency remains unmet. |
| `"adjust"` | Move the constraint date automatically and keep the constraint type. |
| `"prompt"` | Show the conflicts and ask the user to choose a resolution. |

Gantt checks for new conflicts after task moves, resizes, lightbox saves and inline edits. It also checks programmatic edits that explicitly run as user edits. Parsing, adding or deleting a link, and calling `gantt.autoSchedule()` do not open this dialog. Drawing a link that would create a cycle can show a separate [circular-link notice](api/event/oncircularlinkerror.md).

The prompt describes the affected tasks and dates. Apply becomes available when the user selects a remedy. The choice applies to all conflicts in the prompt.

- **Move constraint date** preserves the constraint type.
- **Deactivate dependency** keeps the links in the project and [marks them inactive](guides/inactive-tasks-links.md#how-gantt-determines-activity). Gantt offers this choice when the known dependencies can be deactivated to resolve every new conflict.
- **Remove constraint** clears the constraint date and restores ASAP in forward scheduling or ALAP in backward scheduling.
- **Keep constraint** leaves the dependency unmet.

Cancel, Escape, or a click outside the dialog reverts the edit. Enable the Undo plugin to group an accepted edit and its resolution into one undo step. In `"adjust"` and `"prompt"` modes, known unmet links use the `gantt_link_conflict` class and appear dashed red by default. A provider that omits the contributing link IDs cannot supply that marker or offer dependency deactivation for the conflict.

### Saving a custom form {#saving-a-custom-form}

Use [asUserEdit](api/other/autoscheduling-ext.md) when a custom form edits an existing task and calls `updateTask()`. Pass the callback synchronously and update the identified task inside it.

~~~js
function saveTask(id, text, startDate) {
    return gantt.ext.autoScheduling.asUserEdit(id, () => {
        const task = gantt.getTask(id);
        task.text = text;
        task.start_date = startDate;
        task.end_date = gantt.calculateEndDate({
            start_date: startDate,
            duration: task.duration,
            task
        });
        gantt.updateTask(id);
    });
}
~~~

For task updates described as a change set, use `apply(changes, { interactive: true })`. If either method returns `resolution: "pending"`, wait for [onAfterAutoScheduleConflictResolve](api/event/onafterautoscheduleconflictresolve.md) to handle the final outcome.

To show your own dialog, return `false` from [onBeforeAutoScheduleConflictResolve](api/event/onbeforeautoscheduleconflictresolve.md) and use its `resolutions` array as the options for the user. Call the provided `resolve` callback with the chosen option or `"cancel"`. To change the built-in text, override the `as_conflict_*` keys in [gantt.locale.labels](guides/localization.md#creating-a-custom-locale).

## Setting lag and lead times between tasks {#settinglagandleadtimesbetweentasks}

Lag and lead times are special values that are used to create complex relations between tasks.

Lag is a delay between tasks which are linked by a dependency. Lead is an overlap between tasks which are linked by a dependency.

There can be two types of successor tasks:

- a task that can start before its predecessor task's end (task B starts before task A is finished)

E.g.: If we set a lead equal to 1 day for the dependency link, task B will start one day before task A ends;

-  a task that can't start until after some delay that follows the finish of its predecessor task (task B starts in some time after task A is finished)

E.g.: If we set a lag equal to 1 day for the dependency link, task B will start in one day after task A ends.

Lag and lead values are set in the additional property of the link object - **link.lag**:

- lag - any whole positive value,
- lead - a negative value of the lag.

By default, it's implied that the lag value of each dependency link is set as 0.

### Editing link values from UI

Gantt doesn't provide a built-in UI for editing lag or any other properties of the link. However, you can implement it manually by following the recommendations given in the
[related chapter](guides/crud-dependency.md#editing-link-values-from-ui).

**Related sample** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

## Disabling auto scheduling for specific tasks

To exclude a task, a project branch, or a dependency from scheduling while keeping it on the chart, use [inactive tasks and links](guides/inactive-tasks-links.md#how-gantt-determines-activity).

To disable auto scheduling for a particular task and make it manually scheduled, set the **auto_scheduling** property of the task object to *false*:

~~~js
const task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

You can also prevent auto scheduling of a specific task using the [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md) handler:

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    return !task.completed;
});
~~~

## Scheduling completed tasks

By default, there is no difference in how the auto scheduling algorithm processes completed tasks (tasks which have progress value of 1) and incomplete tasks.

Optionally, you can enable the [auto_scheduling.use_progress](api/config/auto_scheduling.md#use_progress) config to change this behavior:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
 
gantt.init("gantt_here");
~~~

When the config is enabled, completed tasks will be excluded from the critical path and auto scheduling.

You can find more details on the [API page](api/config/auto_scheduling_use_progress.md).


## API overview

The list of available methods and properties:

- [auto_scheduling](api/config/auto_scheduling.md)
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)
- [gantt.ext.autoScheduling](api/other/autoscheduling-ext.md)

### Activation

To enable auto scheduling in the Gantt chart, set the **enabled** property of the **auto_scheduling** config to *true*:

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

### Strict mode

By default, tasks are rescheduled only when a new date violates the constraint.
In order to always reschedule tasks to the earliest possible date, use the property [auto_scheduling.gap_behavior](api/config/auto_scheduling.md#gap_behavior):

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

:::note
Note that in versions 6.1.0 - 7.1.3, the config works only when the [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) option is enabled.
:::

### Initial auto-scheduling

The [auto_scheduling.schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse) property specifies whether gantt will do auto scheduling on data loading. It's set to *true* by default:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: true
};
~~~

### Inheritance of project constraint

The [auto_scheduling.project_constraint](api/config/auto_scheduling.md#project_constraint) property defines whether the tasks without the specified constraint type should inherit the constraint type from their parent project:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

### Recalculating the project

To recalculate the schedule of the whole project, use the [autoSchedule](api/method/autoschedule.md) method:

~~~js
gantt.autoSchedule();
~~~

If you need to recalculate the schedule starting from a particular task, pass the id of the task as an argument to the [autoSchedule](api/method/autoschedule.md) method:

~~~js
gantt.autoSchedule(taskId);
~~~

### Checking whether a task is unscheduled

In case you need to check whether the task is unscheduled, use the [isUnscheduledTask](api/method/isunscheduledtask.md) method with the task object as an argument:

~~~js
const isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Search for circular references

To find all circular references in the chart, make use of the [findCycles](api/method/findcycles.md) method:

~~~js
gantt.findCycles();
~~~

### Checking whether a link is circular

If you need to check whether the link is circular, you can apply the [isCircularLink](api/method/iscircularlink.md) method:

~~~js
const isCircular = gantt.isCircularLink(link);
~~~

### Getting connected tasks and links

To get the list of tasks and links a task is connected with, use the [getConnectedGroup](api/method/getconnectedgroup.md) method:

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## Scheduling API {#scheduling-api}

Use [gantt.ext.autoScheduling](api/other/autoscheduling-ext.md) with the `auto_scheduling` plugin to inspect schedules as data, preview changes, or apply them. The `enabled` setting controls automatic scheduling. Call the scheduling methods explicitly when your application controls when to run them.

| Method | Changes the chart? | Use it to |
| --- | --- | --- |
| `preview()` | No | Preview the scheduling effects of proposed edits. |
| `analyze()` | No | Read slack, critical path and cycles for the accepted chart. |
| `solve()` | Yes | Recalculate as `gantt.autoSchedule()` does and return the result. |
| `apply()` | Yes | Write a change set, then optionally schedule the chart. |

For leveling, load reporting, candidate comparison and staffing, use a [scheduling provider that supports those capabilities](guides/planning-engine.md).

### Recalculate and read the result

The `solve()` method returns dates, conflicts and cycles. It returns `null` if the run is canceled or scheduling is already in progress.

~~~js
const result = gantt.ext.autoScheduling.solve({ subtree: { task: 5 } });
if (result) {
    for (const update of result.updates) {
        console.log(update.id, update.start_date, update.end_date);
    }
}
~~~

### Previewing a change {#previewing-a-change}

Describe your edits as a [change set](api/other/autoscheduling-ext.md#scheduling-changes). A preview reports schedule changes that follow from those edits. The input edits themselves do not appear as changes in `updates`.

~~~js
const changes = {
    tasks: { update: [{ id: 5, start_date: new Date(2027, 3, 5) }] },
    links: { add: [{ source: 2, target: 7, type: gantt.config.links.finish_to_start }] }
};
const preview = gantt.ext.autoScheduling.preview(changes, {
    analytics: { criticalPath: true }
});
const newConflicts = preview.conflicts.filter(conflict => conflict.isNew);
~~~

Check `preview.cycles` and `newConflicts` before applying the change. Use `summary.finishBefore` and `summary.finishAfter` to show its effect on the project finish. Call `preview(null)` to see how the current chart would schedule without adding an edit.

A preview describes the data at the time of the call. Run it again after accepting or undoing an edit, reloading data, or changing calendars or scheduling options.

### Read slack and the critical path

Use `analyze()` to inspect the current accepted schedule. It calculates both slack and the critical path by default. Cycles can make analytics unavailable.

~~~js
const { analytics } = gantt.ext.autoScheduling.analyze();
if (analytics.status === "available") {
    console.log(analytics.criticalPath?.tasks, analytics.slack);
}
~~~

### Apply a change set

Write an accepted change set with `apply(changes)`. Pass `{ solve: true }` to recalculate afterward. Gantt validates the input before writing, uses its normal update events, and groups the changes into one undo step when the Undo plugin is enabled. An event handler can stop a write. Check for `status: "stopped"` and inspect `applied` and `stoppedAt` before deciding how to proceed.

~~~js
const result = gantt.ext.autoScheduling.apply(changes, { solve: true });
if (result.status === "stopped") {
    console.log(result.stoppedAt, result.applied);
}
~~~

### Previewing a task drag

During a drag, `preview()` and `analyze()` read the schedule from before the drag began. Pass the dates and duration the drop would write to `preview()`, with `{ interactive: true }`. This models the behavior of a user edit, including constraints applied on a move. When several tasks move together, include all affected tasks. Throttle updates or run the preview at most once per animation frame.

### Previewing a new link {#previewing-a-new-link}

Use [onLinkDragStart](api/event/onlinkdragstart.md) to set up the preview and [onLinkDragMove](api/event/onlinkdragmove.md) to update it when the pointer moves. Check that the drag has a target task, infer the link type from the two endpoint flags, and check [isLinkAllowed](api/method/islinkallowed.md) before previewing the candidate. A task bar can be a valid target even when `link_landing_area` is false.

~~~js
function previewLink(state) {
    const { link_source_id: source, link_target_id: target } = state;
    if (target == null || source === target) return null;

    const types = gantt.config.links;
    const type = state.link_from_start
        ? (state.link_to_start ? types.start_to_start : types.start_to_finish)
        : (state.link_to_start ? types.finish_to_start : types.finish_to_finish);
    const link = { source, target, type };
    if (!gantt.isLinkAllowed(link)) return null;

    return gantt.ext.autoScheduling.preview({ links: { add: [link] } });
}
~~~

Call this from a throttled move handler. Clear the temporary preview in [onLinkDragEnd](api/event/onlinkdragend.md), even when the drop does not create a link.

### Validate a save on the server

In the Node build, create a Gantt instance with the scheduling plugin enabled and load the current project. Pass the proposed changes to `preview()` to check for newly introduced conflicts and cycles before saving. Gantt reads the project and returns the proposed result without writing it.

~~~js
const { Gantt } = require("@dhx/gantt-node");

function validateSave(projectData, changes) {
    const chart = Gantt.getGanttInstance({
        plugins: { auto_scheduling: true },
        config: {
            auto_scheduling: { enabled: true, schedule_on_parse: false },
            work_time: true
        },
        data: projectData
    });
    try {
        const result = chart.ext.autoScheduling.preview(changes);
        return {
            conflicts: result.conflicts.filter(conflict => conflict.isNew),
            cycles: result.cycles.filter(cycle => cycle.isNew)
        };
    } finally {
        chart.destructor();
    }
}
~~~

## The list of events

The list of available events is given below:

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onBeforeAutoScheduleConflictResolve](api/event/onbeforeautoscheduleconflictresolve.md)
- [onAfterAutoScheduleConflictResolve](api/event/onafterautoscheduleconflictresolve.md)

~~~js
// before auto scheduling starts
gantt.attachEvent("onBeforeAutoSchedule", (taskId) => {
    // any custom logic here
    return true;
});

// after auto scheduling finishes
gantt.attachEvent("onAfterAutoSchedule", (taskId, updatedTasks) => {
    // any custom logic here
});

// before a particular task is rescheduled
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    // any custom logic here
    return true;
});

// after a particular task is rescheduled
gantt.attachEvent("onAfterTaskAutoSchedule", (task, start, link, predecessor) => {
    // any custom logic here
});

// if the circular reference has been detected and auto scheduling is not possible
gantt.attachEvent("onCircularLinkError", (link, group) => {
    // any custom logic here
});

// if circular links were found during auto scheduling
gantt.attachEvent("onAutoScheduleCircularLink", (groups) => {
    // any custom logic here
});
~~~

## Version compatibility

When a user changes the date of a task by moving it with the mouse pointer or via the lightbox, the task automatically receives one of the two constraint types: either **start no earlier than+%start date%** or
**finish no later than+%end date%**, depending on the chosen planning strategy.

Thus a task won't be scheduled to the earliest date if the later date is set from the UI. This may be confusing to a not prepared user especially since constraints are not displayed in the chart by default.

Starting from **v9.1** you can enable displaying of constraints using the [auto_scheduling.show_constraints](api/config/auto_scheduling.md#show_constraints) property. The older versions require usage of the [addTasklayer](api/method/addtasklayer.md) method to add constraints to the chart.

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


This behavior differs from the auto scheduling logic of gantt prior to **v6.1** and is considered to be correct, since it's the same way auto planning works in MS Project.

If that is not what you want, you can switch back to the pre-6.1 auto scheduling by disabling constraints in the following way:

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)


### Change log
- In v10.1, [gantt.ext.autoScheduling](api/other/autoscheduling-ext.md) and [constraint conflict resolution](#resolving-constraint-conflicts) were added.

- in v10.0 the auto-scheduling engine was reworked. The public API and the visible behavior stay the same, except for cases that previously worked incorrectly. See the [migration guide](migration.md#auto-scheduling-v2) for the full list of behavior changes.

