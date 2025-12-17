---
sidebar_label: date_scale
title: date_scale config
description: "задаёт формат временной шкалы (ось X)"
---

# date_scale

### Description

@short: Задаёт формат временной шкалы (ось X)

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
 Свойство **date_scale** устарело. Вместо него используйте свойство **format** в [scales](api/config/scales.md): 
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
- [Настройка шкалы](guides/configuring-time-scale.md#settingthescalesformat)
- [Спецификация формата даты](guides/date-format.md)

### Change log
- устарело с версии v6.2

