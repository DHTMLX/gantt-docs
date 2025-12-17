---
sidebar_label: correct_work_time
title: correct_work_time config
description: "enables adjusting the task's start and end dates to the work time (while dragging)"
---

# correct_work_time

### Description

@short: Enables adjusting the task's start and end dates to the work time (while dragging)

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false


### Related samples
- [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

The property has a sense only if the [work_time](api/config/work_time.md) property is enabled.

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

