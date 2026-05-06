---
sidebar_label: scale_unit
title: scale_unit Konfiguration
description: "legt die Einheit der Zeitachse (X-Achse) fest"
---

# scale_unit

:::warning
Die Eigenschaft ist veraltet.
:::

### Description

@short: Legt die Einheit der Zeitachse fest (X-Achse)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** 'day'

### Related samples
- [Monatsansicht](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

Es besteht die Möglichkeit, eine benutzerdefinierte Einheit festzulegen. Lesen Sie mehr zum Thema [hier](guides/configuring-time-scale.md#customtimeunits).


:::note
 Die Eigenschaft ist veraltet.
Verwenden Sie stattdessen die **unit**-Eigenschaft der [scales](api/config/scales.md).
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
- [Einrichten der Zeitachse](guides/configuring-time-scale.md#timeunits)

### Change log
- seit v6.2 veraltet