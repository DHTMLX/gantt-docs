---
sidebar_label: duration_step
title: duration_step 配置
description: "设置与一个 'duration' 数据属性单位相对应的 'gantt.config.duration_unit' 单位数量。"
---

# duration_step

### Description

@short: 设置与一个 'duration' 数据属性单位相对应的 'gantt.config.duration_unit' 单位数量。

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//所以如果如ask.duration = 2，，任务将持续 小时（）
~~~

**默认值：**1

### Details

如果将 duration_unit 指定为 "hour" 或 "minute" ，我们建议将 [duration_step](api/config/duration_step.md) 设置为 1。
这样的组合在工作时间计算中会激活某些优化，只有当步长设置为 1 时才会起作用。请注意，"optimized" 与 "non-optimized" 模式之间存在显著的性能差异。

### Related API
- [duration_unit](api/config/duration_unit.md)