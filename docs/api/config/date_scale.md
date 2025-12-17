---
sidebar_label: date_scale
title: date_scale config
description: "sets the format of the time scale (X-Axis)"
---

# date_scale

:::warning
The property is deprecated.
:::

### Description

@short: Sets the format of the time scale (X-Axis)

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
The **date_scale** property is deprecated. Use the **format** property of the [scales](api/config/scales.md) instead: 
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
- [Setting up Scale](guides/configuring-time-scale.md#dateformat)
- [Date Format Specification](guides/date-format.md)

### Change log
- deprecated since v6.2

