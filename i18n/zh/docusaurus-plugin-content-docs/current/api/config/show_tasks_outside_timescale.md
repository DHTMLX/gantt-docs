---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale 配置
description: "在甘特图中显示超出指定日期范围的任务"
---

# show_tasks_outside_timescale

### Description

@short: 启用在甘特图中显示超出指定日期范围的任务

@signature: show_tasks_outside_timescale: boolean

### Example

~~~jsx
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [时间刻度之外的任务](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [配置时间尺度](guides/configuring-time-scale.md)

### Change log
- 在 v6.3 中新增