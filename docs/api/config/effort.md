---
sidebar_label: effort
title: effort config
description: "Configures task effort, work units, and default scheduling mode."
---

# effort

### Description

@short: Configures effort-driven task calculations

@signature: effort: EffortConfig

### Details

Set the configuration before initializing the chart.

| Property | Default | Meaning |
| --- | --- | --- |
| `enabled: boolean` | `false` | Enable effort calculations. |
| `mode: "fixed_duration" \| "fixed_units" \| "fixed_work"` | `"fixed_duration"` | Default scheduling mode for tasks that do not specify one. |
| `effort_driven: boolean` | `false` | Default effort-driven flag for tasks that do not specify one. It affects how the task responds to adding or removing assignments. |
| `work_unit: "minute" \| "hour" \| "day" \| "week" \| "month" \| "year"` | `"hour"` | Unit for task work. |
| `hours_per_day: number` | `8` | Assignment value that represents a full working-day allocation. Set it consistently with the work unit and assignment values. |

### Example

~~~js
gantt.config.effort = {
    enabled: true,
    mode: "fixed_duration",
    effort_driven: false,
    work_unit: "hour",
    hours_per_day: 8
};
~~~

### Related API

- [getTaskWork](api/method/gettaskwork.md)
- [task_work](api/template/task_work.md)

### Related guides

- [Effort-Driven Tasks](guides/effort-driven-tasks.md)

### Change log

- Added in v10.1.
