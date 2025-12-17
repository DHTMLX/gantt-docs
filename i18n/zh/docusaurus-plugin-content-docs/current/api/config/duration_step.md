---
sidebar_label: duration_step
title: duration_step config
description: "定义多少个单位的 'gantt.config.duration_unit' 组成 'duration' 数据属性的一个单位。"
---

# duration_step

### Description

@short: 定义多少个单位的 'gantt.config.duration_unit' 组成 'duration' 数据属性的一个单位。

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//所以如果 task.duration = 2，任务将持续 6 小时（3*2）
~~~

**Default value:** 1

### Details

当将 duration_unit 设置为 "hour" 或 "minute" 时，建议将 [duration_step](api/config/duration_step.md) 保持为 1。此设置使得针对工作时间计算的某些优化得以启用，而这些优化只有在 step 设置为 1 时才能正常工作。请注意，"优化" 模式与 "非优化" 模式之间存在显著的性能差异。

### Related API
- [duration_unit](api/config/duration_unit.md)

