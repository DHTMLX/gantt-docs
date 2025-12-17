---
sidebar_label: scale_unit
title: scale_unit config
description: "definiert die Einheit der Zeitskala auf der X-Achse"
---

# scale_unit

### Description

@short: Definiert die Einheit der Zeitskala auf der X-Achse

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

Es ist möglich, die Zeiteinheit anzupassen. Für weitere Details siehe [diesen Abschnitt](guides/configuring-time-scale.md#customtimeunits).
<br>

:::note
 Diese Eigenschaft ist veraltet.
Verwenden Sie stattdessen die **unit**-Eigenschaft innerhalb der [scales](api/config/scales.md): 
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
- ["Einrichten der Skala"](guides/configuring-time-scale.md#settingtheunitofthescale)

### Change log
- deprecated seit Version 6.2

