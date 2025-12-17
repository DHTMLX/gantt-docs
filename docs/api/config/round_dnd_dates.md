---
sidebar_label: round_dnd_dates
title: round_dnd_dates config
description: "enables rounding the task's start and end dates to the nearest scale marks"
---

# round_dnd_dates

### Description

@short: Enables rounding the task's start and end dates to the nearest scale marks

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

If you disable the property, Gantt will round the start and end dates of the dragged task to the nearest hour not to the nearest scale marks. In this case, you may use the [time_step](api/config/time_step.md) property to configure the step for dragging a task. See the example:

:::note
sample: [Gantt. Drag'n'drop of tasks with the minimum step ](https://snippet.dhtmlx.com/bd7ir3w7)
:::

