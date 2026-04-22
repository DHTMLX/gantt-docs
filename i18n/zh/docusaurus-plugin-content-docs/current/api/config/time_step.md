---
sidebar_label: time_step
title: time_step config
description: "设置任务时间值的最小步长（以分钟为单位）"
---

# time_step

### Description

@short: 设置任务时间值的最小步长（以分钟为单位）

@signature: time_step: number

### Example

~~~jsx
gantt.config.time_step = 15;
...
gantt.init("gantt_here");
~~~

**默认值：** 60

### Details

- 任务的开始和结束时间将按时间步长的整数倍取值，例如 *time_step = 20* 时，任务只能在 0、20、40 分钟等处开始。
- Lightbox 时间选择器将使用相同的时间步长。

:::note
注：如果你希望在拖动任务时使用通过 **time_step** 属性设置的步长，需要将 [round_dnd_dates](api/config/round_dnd_dates.md) 配置设置为 *false*。
~~~js
gantt.config.round_dnd_dates = false;
~~~

:::note
示例： [Gantt. 拖拽带有最小步长的任务](https://snippet.dhtmlx.com/bd7ir3w7)
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)