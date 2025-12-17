---
sidebar_label: time_step
title: time_step config
description: "sets the minimum step (in minutes) for the task's time values"
---

# time_step

### Description

@short: Sets the minimum step (in minutes) for the task's time values

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**Default value:** 60

### Details

- Start and end times of a task will have the values multiple of the time step, i.e. if *time_step = 20*, the task can start only at: 0, 20, 40 minutes etc.
- The lightbox time selector will have the same time step.

:::note
note If you want a task to be dragged with the step set via the **time_step** property, you need to set the [round_dnd_dates](api/config/round_dnd_dates.md) config to *false*.
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note
sample: [Gantt. Drag'n'drop of tasks with the minimum step ](https://snippet.dhtmlx.com/bd7ir3w7)
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)

