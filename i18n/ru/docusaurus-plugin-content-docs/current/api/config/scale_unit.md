---
sidebar_label: scale_unit
title: scale_unit config
description: "определяет единицу измерения временной шкалы на оси X"
---

# scale_unit

### Description

@short: Определяет единицу измерения временной шкалы на оси X

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

Можно настроить единицу времени. Для получения подробной информации смотрите [этот раздел](guides/configuring-time-scale.md#customtimeunits).
<br>

:::note
 Это свойство устарело.
Вместо него используйте свойство **unit** в [scales](api/config/scales.md): 
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
- [Настройка шкалы](guides/configuring-time-scale.md#settingtheunitofthescale)

### Change log
- устарело с версии v6.2

