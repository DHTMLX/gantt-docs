---
sidebar_label: scale_unit
title: scale_unit config
description: "sets the unit of the time scale (X-Axis)"
---

# scale_unit

:::warning
The property is deprecated.
:::

### Description

@short: Sets the unit of the time scale (X-Axis)

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

There is a possiblity to set a custom unit. Read more on the topic [here](guides/configuring-time-scale.md#customtimeunits).


:::note
 The property is deprecated.
Use the **unit** property of the [scales](api/config/scales.md) instead: 
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
- [Setting up Scale](guides/configuring-time-scale.md#timeunits)

### Change log
- deprecated since v6.2

