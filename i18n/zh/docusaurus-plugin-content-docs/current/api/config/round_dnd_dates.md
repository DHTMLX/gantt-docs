---
sidebar_label: round_dnd_dates
title: round_dnd_dates config
description: "允许将任务的开始和结束日期四舍五入到最接近的刻度标记"
---

# round_dnd_dates

### Description

@short: 允许将任务的开始和结束日期四舍五入到最接近的刻度标记

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

当此属性关闭时，Gantt 会将拖动的任务的开始和结束日期四舍五入到最接近的小时，而不是最接近的刻度标记。在此模式下，可以使用 [time_step](api/config/time_step.md) 属性来设置任务拖动的步长。示例如下:

:::note
Sample: [Gantt. 任务拖放的最小步长](https://snippet.dhtmlx.com/bd7ir3w7) 
:::

