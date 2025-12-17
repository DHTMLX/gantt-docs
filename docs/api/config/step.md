---
sidebar_label: step
title: step config
description: "sets the step of the time scale (X-Axis)"
---

# step

:::warning
The property is deprecated.
:::

### Description

@short: Sets the step of the time scale (X-Axis)

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

### Related samples
- [Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
The **step** property is deprecated. Use the **step** property of the [scales](api/config/scales.md) instead: 
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

**Default value:** 1

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md#timestep)

### Change log
- deprecated since v6.2

