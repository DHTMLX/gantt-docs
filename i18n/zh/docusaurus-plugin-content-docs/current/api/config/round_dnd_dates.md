---
sidebar_label: round_dnd_dates
title: round_dnd_dates 配置
description: "启用将任务的开始和结束日期四舍五入到最近的刻度标记"
---

# round_dnd_dates

### Description

@short: 启用将任务的开始和结束日期四舍五入到最近的刻度标记

@signature: round_dnd_dates: boolean

### Example

~~~jsx
gantt.config.round_dnd_dates = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

如果您禁用该属性，Gantt 将把拖动任务的开始和结束日期四舍五入到最近的小时，而不是最近的刻度标记。在这种情况下，您可以使用 [time_step](api/config/time_step.md) 属性来配置拖动任务的步进。请参见示例：

:::note
sample: [Gantt。具有最小步长的任务拖拽](https://snippet.dhtmlx.com/bd7ir3w7)
:::