---
sidebar_label: step
title: step config
description: "определяет шаг временной шкалы (ось X)"
---

# step

### Description

@short: Определяет шаг временной шкалы (ось X)

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
note Свойство **step** устарело. Вместо этого настройте **step** внутри [scales](api/config/scales.md): 
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
- [Настройка шкалы](guides/configuring-time-scale.md#timestep)

### Change log
- устарело с версии v6.2

