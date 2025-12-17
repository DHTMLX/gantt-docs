---
sidebar_label: fit_tasks
title: fit_tasks config
description: "告诉甘特图自动调整时间刻度以适应所有显示的任务"
---

# fit_tasks

### Description

@short: 告诉甘特图自动调整时间刻度以适应所有显示的任务

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

默认情况下，dhtmlxGantt 不会自动扩展时间刻度，即使有任务的时间超出了当前的时间区间。这种情况可能发生在用户更改任务日期或自动排程之后。 
因此，任务条可能会被截断或变得不可见。

为了确保每当任务超出当前刻度区间时，时间刻度都会自动更新，可以将 [fit_tasks](api/config/fit_tasks.md) 属性设置为 *true*。

请注意，这种行为可能会被 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 设置所覆盖，这两个设置会将时间刻度限制在特定范围内。

如果希望时间刻度根据日期范围动态调整，可以省略 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 设置，或者[动态处理时间范围](guides/configuring-time-scale.md#fanwei)。

<br>

**例如，任务"Project #2"的初始持续时间为6天。**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)

如果将持续时间延长到8天，甘特图的响应会根据 [fit_tasks](api/config/fit_tasks.md) 属性的值不同而有所不同:

- **gantt.config.fit_tasks = false;** （默认值）

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;**

![property_fit_tasks_03](/img/property_fit_tasks_03.png)

### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)

