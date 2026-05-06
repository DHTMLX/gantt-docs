---
sidebar_label: min_duration
title: min_duration 配置
description: "设置在调整大小期间可以为任务设定的最小持续时间（以毫秒为单位）。"
---

# min_duration

### Description

@short: 设置在调整大小期间可以为任务设定的最小持续时间（以毫秒为单位）。

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 day)
~~~

### Details

- 配置值指定任务的开始日期和结束日期之间的时间跨度（task.start_date - task.end_date），该值不受 [工作时间设置](guides/working-time.md) 或 [持续时间计算](api/method/calculateduration.md) 的影响。

### Related Guides
- [在时间轴中拖拽任务](guides/dnd.md)

**默认值:** 60*60*1000，或 3600000 ms，1 小时