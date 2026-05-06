---
sidebar_label: duration_unit
title: duration_unit config
description: "지속 시간 단위를 설정합니다"
---

# duration_unit

### Description

@short: 지속 시간 단위를 설정합니다

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//an hour
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours
~~~

**기본 값:**"day" 

### Related samples
- [작업의 소수점 지속 시간](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

If you want to have different duration units for different tasks, i.e. to show durations of some tasks in hours and some tasks in "days", you can use the [formatter 모듈](guides/working-time.md#taskdurationindecimalformat). 

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
- [작업 시간 계산](guides/working-time.md#taskdurationindecimalformat)