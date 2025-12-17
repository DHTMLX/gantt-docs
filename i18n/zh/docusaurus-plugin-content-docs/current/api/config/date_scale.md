---
sidebar_label: date_scale
title: date_scale config
description: "设置时间刻度（X轴）的格式"
---

# date_scale

### Description

@short: 设置时间刻度（X轴）的格式

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** "%d %M"

### Related samples
- [Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

### Details

:::note
 **date_scale** 属性已被弃用。请改用 [scales](api/config/scales.md) 中的 **format** 属性: 
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
- [step](api/config/step.md)

### Related Guides
- [设置时间刻度](guides/configuring-time-scale.md#settingthescalesformat)
- [日期格式规范](guides/date-format.md)

### Change log
- 自 v6.2 起弃用

