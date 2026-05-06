---
sidebar_label: duration_unit
title: duration_unit 配置
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

**默认值：**"day" 

### Related samples
- [任务的十进制持续时间](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

如果你想让不同任务使用不同的持续时间单位，即某些任务显示为小时，某些任务显示为“天”，你可以使用 [formatter 模块](guides/working-time.md#taskdurationindecimalformat)。

在这种情况下，**duration_unit** 必须设置为任务可能具有的最小持续时间：

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";


// or

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

而 formatter 插件将允许你以所需的单位显示持续时间。最终用户也将能够以不同单位输入持续时间。

如果将 duration_unit 设置为 "hour" 或 "minute"，我们建议将 [duration_step](api/config/duration_step.md) 设置为 1。
这样的组合将激活在计算工作时间时的某些优化，且仅在 step 设置为 1 时才有效。请注意，在 "optimized" 与 "non-optimized" 模式之间存在显著的性能差异。

### Related API
- [duration_step](api/config/duration_step.md)

### Related Guides
- [工作时间计算](guides/working-time.md#taskdurationindecimalformat)