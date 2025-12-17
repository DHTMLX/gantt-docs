---
sidebar_label: date_scale
title: date_scale config
description: "Legt das Format der Zeitachse (X-Achse) fest"
---

# date_scale

### Description

@short: Legt das Format der Zeitachse (X-Achse) fest

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
 Die **date_scale** Eigenschaft ist veraltet. Verwenden Sie stattdessen die **format** Eigenschaft in der [scales](api/config/scales.md): 
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
- ["Einrichten der Skala"](guides/configuring-time-scale.md#settingthescalesformat)
- ["Datumsformat-Spezifikation"](guides/date-format.md)

### Change log
- veraltet seit Version 6.2

