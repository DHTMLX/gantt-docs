---
sidebar_label: min_duration
title: min_duration config
description: "定义调整任务大小时允许的最小持续时间（以毫秒为单位）。"
---

# min_duration

### Description

@short: 定义调整任务大小时允许的最小持续时间（以毫秒为单位）。

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // （1天）
~~~

**Default value:** 60*60*1000，或3600000毫秒，等于1小时

### Details

- 该配置设置任务开始日期和结束日期之间的最小时间跨度 <b>(task.start_date - task.end_date)</b>。它独立于[working time settings](guides/working-time.md)和[duration calculations](api/method/calculateduration.md)之外运行。

### Related Guides
- [在时间轴中拖动任务](guides/dnd.md)

