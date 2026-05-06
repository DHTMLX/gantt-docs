---
sidebar_label: fit_tasks
title: fit_tasks 配置
description: "'says' 的 Gantt 图表会自动扩展时间刻度以适应显示的所有任务"
---

# fit_tasks

### Description

@short: "'says' 的 Gantt 图表会自动扩展时间刻度以适应显示的所有任务"

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**默认值：** false

### Related samples
- [自动调整刻度](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

默认情况下，dhtmlxGantt 不会在某个任务不再适配当前区间时自动扩展时间刻度。这可能在用户设置任务日期或进行自动排程后发生。在这种情况下，任务条可能会被裁剪或完全不可见。

要在每次任务不再适配现有时间区间时“强制”重新渲染刻度，请将 [fit_tasks](api/config/fit_tasks.md) 属性设为 *true*。

此设置可以通过 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置取消，它们将时间刻度限定在指定边界内。

如果你希望时间刻度根据日期范围动态调整，可以选择跳过 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置，或 [动态管理时间范围](guides/configuring-time-scale.md#range)。

**例如，任务 "Project #2" 的初始持续时间为 6 天。**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)

如果用户通过将持续时间设为 8 天来延长持续时间，甘特图的行为将取决于 [fit_tasks](api/config/fit_tasks.md) 属性的值：

- **gantt.config.fit_tasks = false;**（默认值）

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;**

![property_fit_tasks_03](/img/property_fit_tasks_03.png)

### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)