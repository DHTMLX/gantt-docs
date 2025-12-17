---
sidebar_label: step
title: step config
description: "定义时间刻度（X轴）的增量"
---

# step

### Description

@short: 定义时间刻度（X轴）的增量

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

**Default value:** 1

### Related samples
- [Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
 **step** 属性已被弃用。请改为在 [scales](api/config/scales.md) 中配置 **step**: 
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [设置时间刻度](guides/configuring-time-scale.md#timestep)

### Change log
- 自 v6.2 版本起弃用

