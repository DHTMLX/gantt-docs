---
sidebar_label: duration_step
title: duration_step config
description: "sets the number of 'gantt.config.duration_unit' units that will correspond to one unit of the 'duration' data property."
---

# duration_step

### Description

@short: Sets the number of 'gantt.config.duration_unit' units that will correspond to one unit of the 'duration' data property.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours (3*2)
~~~

**Default value:**1

### Details

If you specify the duration unit to "hour" or "minute" we recommend setting the [duration_step](api/config/duration_step.md) to 1.
Such combination activates certain optimizations for calculations of working time, that works only when the step is set to 1. Note, that there are major performance differences between "optimized" and "non-optimized" modes.

### Related API
- [duration_unit](api/config/duration_unit.md)

