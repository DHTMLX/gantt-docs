---
sidebar_label: fit_tasks
title: fit_tasks config
description: "'says' the Gantt chart to automatically extend the time scale in order to fit all displayed tasks"
---

# fit_tasks

### Description

@short: 'says' the Gantt chart to automatically extend the time scale in order to fit all displayed tasks

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

By default, dhtmlxGantt doesn't automatically extend the time scale, if some task no longer fits into the current interval. This can happen when a user sets the task date or after auto scheduling. 
In that case the task bar can be truncated or not visible at all.

To 'force' the scale re-render each time a task doesn't fit into the existing scale interval, set the [fit_tasks](api/config/fit_tasks.md) property to *true*.

This setting can be canceled by the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) configs, which will limit the time scale to specified boundaries.

If you want the time scale to be dynamically adjusted according to the date range, you can either skip the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) configs or [manage the time range dynamically](guides/configuring-time-scale.md#range).


**For example, the initial duration of the task "Project #2" is 6 days.**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)


If the user makes the duration longer by setting it say to 8 days, the Gantt chart will behave differently, depending on the value of the [fit_tasks](api/config/fit_tasks.md) property:


- **gantt.config.fit_tasks = false;** (default value)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;**
![property_fit_tasks_03](/img/property_fit_tasks_03.png)


### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)

