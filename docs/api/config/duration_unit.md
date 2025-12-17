---
sidebar_label: duration_unit
title: duration_unit config
description: "sets the duration unit"
---

# duration_unit

### Description

@short: Sets the duration unit

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//an hour
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours
~~~

**Default value:**"day" 

### Related samples
- [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

If you want to have different duration units for different tasks, i.e. to show durations of some tasks in hours and some tasks in "days", you can use the [formatter module](guides/working-time.md#taskdurationindecimalformat). 

In such scenario, **duration_unit** must be set to the smallest duration your tasks may have:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// or

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

And the formatter plugin will allow you to display durations in units you need. The end users will also be able to enter durations in different units.


If you specify the duration unit to "hour" or "minute" we recommend setting the [duration_step](api/config/duration_step.md) to 1.
Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.


### Related API
- [duration_step](api/config/duration_step.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#taskdurationindecimalformat)

