---
sidebar_label: scale_unit
title: scale_unit 配置
description: "设置时间刻度单位（X 轴）"
---

# scale_unit

:::warning
該屬性已棄用。
:::

### Description

@short: 设置时间刻度的单位（X 轴）

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**默认值：** 'day'

### Related samples
- [月视图](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

可以设置自定义单位。有关该主题的更多信息，请参阅此处 [此处](guides/configuring-time-scale.md#customtimeunits)。

:::note
 该属性已被弃用。
 请改用 [scales](api/config/scales.md) 的 **unit** 属性：
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
- [设置比例尺](guides/configuring-time-scale.md#timeunits)

### Change log
- 自从 v6.2 起已弃用