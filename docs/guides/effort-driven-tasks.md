---
sidebar_label: "Effort-Driven Tasks"
title: "Effort-Driven Tasks"
description: "Control how task work, duration and resource assignments change when you edit a schedule."
---

# Effort-Driven Tasks

Use effort-driven scheduling to control how Gantt adjusts a task's work, working duration and resource allocation when you edit one of those values. The workflow below uses Gantt PRO [resource assignments](guides/resource-management.md#assigningresources).

## Enable effort calculations

Set [effort.enabled](api/config/effort.md) before initializing Gantt and supply task assignment values. Each assignment's `value` is the allocation per full workday in the configured work unit. With the default values, 8 is a full allocation and 4 is half.

Gantt calculates work as the task's working span multiplied by the total assignment value divided by `hours_per_day`. The working span and work are measured in `effort.work_unit`. The task's `duration` keeps its own [duration unit](api/config/duration_unit.md).

~~~js
gantt.config.work_time = true;
gantt.config.effort = {
    enabled: true,
    mode: "fixed_work",
    effort_driven: false,
    work_unit: "hour",
    hours_per_day: 8
};

gantt.init("gantt_here");
gantt.parse({
    resources: [{ id: 2, text: "Maya" }, { id: 3, text: "Noah" }],
    tasks: [{
        id: 1,
        text: "Prepare design",
        start_date: new Date(2027, 3, 5),
        duration: 5,
        owner_id: [{ resource_id: 2, value: 8 }]
    }]
});

const task = gantt.getTask(1);
task.owner_id = [
    { resource_id: 2, value: 8 },
    { resource_id: 3, value: 8 }
];
gantt.updateTask(1);
const work = gantt.getTaskWork(1);
~~~

With the default work calendar, adding a second full allocation changes the span from 40 to 20 working hours, leaving 40 hours of work. If you set a different [resource_property](api/config/resource_property.md), use that property instead of `owner_id`.

## Choose a scheduling mode

Use `task.scheduling_mode` or the configured default mode. In Fixed duration, an assignment allocation change recalculates work. In Fixed units or Fixed work, it recalculates duration. When the number of assignments changes, the task's `effort_driven` flag also matters.

| Edit | Fixed duration | Fixed units | Fixed work |
| --- | --- | --- | --- |
| Duration changes | Recalculate work | Recalculate work | Redistribute allocation |
| Work changes | Redistribute allocation | Recalculate duration | Recalculate duration |
| Existing allocation changes | Recalculate work | Recalculate duration | Recalculate duration |
| Add or remove an assignment, `effort_driven: false` | Recalculate work | Recalculate work | Recalculate duration |
| Add or remove an assignment, `effort_driven: true` | Redistribute allocation | Recalculate duration | Recalculate duration |

Allocation is redistributed proportionally, or evenly if all current allocation values are zero. Gantt keeps the start date when deriving a new duration. Rounding and the minimum duration can affect the resulting work. With zero total allocation, Gantt cannot derive a duration from work.

Gantt uses configured defaults for tasks that omit `scheduling_mode` or `effort_driven`. A leaf task's supplied `work` is preserved on load. If no work is supplied, Gantt derives it from the task's working span and assignments. Summary work is calculated from child work. Use [getTaskWork](api/method/gettaskwork.md) to read it.

Effort calculations also apply to assignment edits submitted through the advanced task form or through task updates inside [batchUpdate](api/method/batchupdate.md). They do not support [paused tasks](guides/resource-leveling.md).

## Editing effort fields {#editing-effort-fields}

Add a Work column using [task_work](api/template/task_work.md). Use a number editor for ordinary tasks and display the rolled-up work on summary rows. To edit the task's mode, map a select editor to `scheduling_mode` and provide the mode values as options. In the classic lightbox, use a field mapped to `work`, a select mapped to `scheduling_mode`, and a checkbox mapped to `effort_driven`.

~~~js
const labels = gantt.locale.labels;
const modes = [
    { key: "fixed_duration", label: labels.fixed_duration },
    { key: "fixed_units", label: labels.fixed_units },
    { key: "fixed_work", label: labels.fixed_work }
];

gantt.config.columns = [
    { name: "text", tree: true, width: "*" },
    {
        name: "work",
        label: labels.column_work,
        template: task => gantt.templates.task_work(task),
        editor: { type: "number", map_to: "work" }
    },
    {
        name: "scheduling_mode",
        label: labels.section_scheduling_mode,
        template: task => task.scheduling_mode ? labels[task.scheduling_mode] : "",
        editor: { type: "select", map_to: "scheduling_mode", options: modes }
    }
];

gantt.ext.inlineEditors.attachEvent("onBeforeEditStart", ({ id, columnName }) => {
    return columnName !== "work" || !gantt.isSummaryTask(gantt.getTask(id));
});
~~~

For custom locales, set `column_work`, `section_work`, `section_scheduling_mode`, `fixed_duration`, `fixed_units` and `fixed_work`. Provide the caption for a custom effort-driven checkbox in the field configuration or your app's locale.

## Framework integrations

- [React's useEffortDriven hook](integrations/react/hooks.md#useeffortdriven) reads and updates effort fields through the wrapper ref.
- [Vue's useEffortDriven composable](integrations/vue/overview.md#effort-driven-tasks) exposes the same helpers as a computed value.
- [Angular](integrations/angular/overview.md#effort-driven-tasks) uses the Gantt instance received through the `ready` event.
