---
sidebar_label: step
title: step config
description: "definiert die Inkrementgröße der Zeitskala (X-Achse)"
---

# step

### Description

@short: Definiert die Inkrementgröße der Zeitskala (X-Achse)

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

**Default value:** 1

### Related samples
- [Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
 Die **step**-Eigenschaft ist veraltet. Stattdessen konfigurieren Sie den **step** innerhalb der [scales](api/config/scales.md): 
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
- [date_scale](api/config/date_scale.md)

### Related Guides
- ["Einrichten der Skala"](guides/configuring-time-scale.md#timestep)

### Change log
- veraltet seit Version v6.2

