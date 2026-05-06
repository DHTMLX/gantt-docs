---
sidebar_label: date_scale
title: date_scale 配置
description: "设置时间刻度（X 轴）的格式"
---

# date_scale

:::warning
属性已弃用。
:::

### Description

@short: 设置时间刻度（X 轴）的格式

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**默认值:** "%d %M"

### Related samples
- [Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

### Details

:::note
**date_scale** 属性已弃用。请改用 [scales](api/config/scales.md) 的 **format** 属性：
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
- [设置时间刻度](guides/configuring-time-scale.md)
- [日期格式规范](guides/date-format.md)

### Change log
- 自 v6.2 起已弃用