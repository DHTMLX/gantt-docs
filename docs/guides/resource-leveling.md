---
sidebar_label: "Resource Leveling and Paused Tasks"
title: "Resource Leveling and Paused Tasks"
description: "Store leveling delays, render interrupted tasks, and calculate work and resource load across pauses."
---

# Resource Leveling and Paused Tasks

Resource leveling can delay or pause work to avoid overbooking a resource. To calculate a leveled schedule in Gantt, enable the PRO `auto_scheduling` plugin and [select a provider that supports resource leveling](guides/planning-engine.md#resource-scheduling). You can also load and display a leveled schedule calculated elsewhere.

## Store a leveled plan

A task stores the actual start and end dates of the leveled plan. It can also contain these fields.

| Field | Meaning |
| --- | --- |
| `leveling_delay` | A finite, nonnegative number. It records how far a task shifts from the date implied by its dependency links. Use `0` to clear the delay. |
| `pauses` | An array of records in the form `{ at, length, by? }`. Each record starts at an elapsed offset `at` from the task's start and lasts for `length`. Specify a nonnegative `at` and a positive `length`. Keep entries ordered and nonoverlapping. Adjacent pauses are allowed. A provider can mark its entries with `by: "leveling"`. Use `[]` to clear pauses. |

Both fields use elapsed time in the chart's [duration_unit](api/config/duration_unit.md). A day is 24 elapsed hours, including non-working time. For example, `{ at: 2, length: 1 }` on a chart configured in days means a one-day pause starting two elapsed days after the task starts.

When loading data, Gantt accepts a numeric string for the delay and a JSON-encoded array for pauses. Use numbers and arrays when updating tasks through the API. To update existing tasks from an external leveling result, supply the actual dates as `Date` objects and call [updateTask](api/method/updatetask.md) for each task.

~~~js
gantt.batchUpdate(() => {
    for (const result of leveledTasks) {
        const task = gantt.getTask(result.id);
        task.start_date = result.start_date;
        task.end_date = result.end_date;
        task.leveling_delay = result.leveling_delay;
        task.pauses = result.pauses;
        gantt.updateTask(task.id);
    }
});
~~~

The built-in scheduler uses the delay to shift a task's start later in forward scheduling, or its end earlier in backward scheduling. Constraints may limit the shift. Clear existing adjustments or level again if you change scheduling direction. Manually changing the leading date clears the delay through the auto-scheduling edit flow. Changing only the trailing edge keeps the delay. Moving the task moves its pauses with it.

## Schedule a task with pauses

Pauses affect regular scheduled tasks when `duration_unit` is `"minute"`, `"hour"`, or `"day"` and `duration_step` is 1. Gantt fits work into the working time outside the pauses. A pause that falls entirely in non-working time or after the task's work finishes adds no time to the task.

With a start date and a duration, Gantt derives the end date including the interruption. With both dates, Gantt uses them to find the work duration. Supply the start date for paused tasks because calculating backward from an end date and duration does not account for pauses.

~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "day";
gantt.config.duration_step = 1;
gantt.init("gantt_here");

gantt.parse({
    tasks: [{
        id: 1,
        text: "Review",
        start_date: new Date(2027, 3, 5),
        duration: 5,
        pauses: [{ at: 2, length: 1 }]
    }]
});

const task = gantt.getTask(1);
const work = gantt.calculateDuration(task);
const span = gantt.getTaskCalendar(task).calculateDuration({
    start_date: task.start_date,
    end_date: task.end_date
});
~~~

With the default work calendar, the task pauses on Wednesday and has five days of work across six working days. Pass the task to [calculateDuration](api/method/calculateduration.md) or [calculateEndDate](api/method/calculateenddate.md) for calculations that account for its pauses. Call the calendar directly to measure the working span, including scheduled work time during a pause.

A paused task stays in one task record. Gantt draws gaps between its work segments and places the label on the widest segment. To model individually dated child tasks on the same row, use [split tasks](guides/split-tasks.md). The standard bar for a paused task has no progress indicator. To change a pause entry, update the task data.

## Assignments and resource load {#assignments-and-resource-load}

An assignment's `delay` and fixed `duration` count the work of the task from its start. Gantt skips pauses while counting, so assignments can start or end later. A resource histogram cell that falls wholly inside a pause does not count the task. A cell with scheduled work outside the pause can still count the assignment.

Effort-driven calculations do not support paused tasks. The PDF and PNG export service can render a single bar instead of the paused segments. MS Project import and export do not preserve pause records.

## Related guides

- [Using PlanningEngine with Gantt](guides/planning-engine.md)
- [Resource Management](guides/resource-management.md)
- [Effort-Driven Tasks](guides/effort-driven-tasks.md)
