---
sidebar_label: step
title: step config
description: "определяет шаг временной шкалы (ось X)"
---

# step

:::warning
Свойство устарело.
:::

### Description

@short: Устанавливает шаг шкалы времени (ось X)

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
Свойство **step** устарело. Используйте свойство **step** из [scales](api/config/scales.md) вместо этого:
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

**Значение по умолчанию:** 1

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md#timestep)

### Change log
- устарело с версии v6.2