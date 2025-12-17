---
sidebar_label: duration_unit
title: duration_unit config
description: "设置持续时间单位"
---

# duration_unit

### Description

@short: 设置持续时间单位

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";// 一个小时
gantt.config.duration_step = 3; 
// 所以如果 task.duration = 2，任务时长为 6 小时
~~~

**Default value:** "day"

### Related samples
- [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

当不同任务需要使用不同的持续时间单位时--例如有些以小时显示，有些以天显示--[formatter 模块](guides/working-time.md) 可以帮助管理这种情况。

在这些情况下，**duration_unit** 应设置为任何任务可能使用的最小单位:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// 或者

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

formatter 插件随后允许以你想要的单位显示持续时间。它还允许用户使用多种单位输入持续时间。

<br>
如果选择"hour"或"minute"作为持续时间单位，最好将 [duration_step](api/config/duration_step.md) 设置为 1。此设置会触发某些针对工作时间计算的优化，这些优化仅在 step 精确为 1 时生效。请注意，"优化"模式和"非优化"模式之间存在显著的性能差异。

### Related API
- [duration_step](api/config/duration_step.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

