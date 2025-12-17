---
sidebar_label: scale_unit
title: scale_unit config
description: "定义X轴时间刻度的单位"
---

# scale_unit

### Description

@short: 定义X轴时间刻度的单位

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** 'day'

### Related samples
- [Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

可以自定义时间单位。更多详情请参考[此部分](guides/configuring-time-scale.md)。
<br>

:::note
 此属性已被废弃。
请改用 [scales](api/config/scales.md) 中的 **unit** 属性: 
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

### Related API
- [date_scale](api/config/date_scale.md)
- [step](api/config/step.md)

### Related Guides
- [设置时间刻度](guides/configuring-time-scale.md#settingtheunitofthescale)

### Change log
- 自v6.2起废弃

