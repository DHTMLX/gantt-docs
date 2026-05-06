---
sidebar_label: scale_unit
title: конфигурация scale_unit
description: "устанавливает единицу шкалы времени (ось X)"
---

# scale_unit

:::warning
Свойство устарело.
:::

### Description

@short: Устанавливает единицу шкалы времени (ось X)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** 'day'

### Related samples
- [Вид месяца](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

Есть возможность задать пользовательскую единицу. Подробнее по теме [здесь](guides/configuring-time-scale.md#customtimeunits).


:::note
 Своёство устарело.
Используйте свойство **unit** из [scales](api/config/scales.md) вместо этого: 
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
- [Настройка шкалы](guides/configuring-time-scale.md#timeunits)

### Change log
- устарело с версии v6.2