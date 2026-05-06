---
sidebar_label: date_scale
title: date_scale конфигурация
description: "устанавливает формат шкалы времени (ось X)"
---

# date_scale

:::warning
Свойство устарело.
:::

### Description

@short: Задает формат шкалы времени (оси X)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "%d %M"


### Related samples
- [Несколько шкал](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

### Details

:::note
Свойство **date_scale** устарело. Используйте свойство **format** из [scales](api/config/scales.md) вместо него:
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
- [Настройка шкалы](guides/configuring-time-scale.md#dateformat)
- [Спецификация формата даты](guides/date-format.md)

### Change log
- устарело с версии v6.2