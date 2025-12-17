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

**Default value:** 60

### Details

- 任务的开始和结束时间将对齐到 time_step 的倍数。例如，如果 *time_step = 20*，任务只能在 0、20、40 分钟等时间点开始。
- lightbox 中的时间选择器也将遵循相同的时间步长。

:::note
 若要在拖动任务时使任务时间吸附到 **time_step** 属性定义的步长，请确保将 [round_dnd_dates](api/config/round_dnd_dates.md) 配置设置为 *false*。
~~~js
gantt.config.round_dnd_dates = false;
~~~
 
:::

:::note
Sample: [任务拖放时的最小步长](https://snippet.dhtmlx.com/bd7ir3w7) Gantt. 
:::

### Related API
- [round_dnd_dates](api/config/round_dnd_dates.md)

