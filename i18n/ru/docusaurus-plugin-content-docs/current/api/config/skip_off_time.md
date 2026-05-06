---
sidebar_label: skip_off_time
title: skip_off_time конфигурация
description: "Скрывает нерабочее время с временной шкалы"
--- 

# skip_off_time
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Скрывает нерабочее время с временной шкалы

@signature: skip_off_time: boolean

### Example

~~~jsx
// calculates duration in working hours and hides non-working time from the chart
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Details

Обратите внимание, что конфигурация **skip_off_time** не изменяет шкалу и скрывает ячейки, в которых отсутствуют рабочие часы. 

Example 1

Шкала дня начинается в 00:00 и заканчивается в 23:59, рабочие часы начинаются в 08:00 и заканчиваются в 16:59. У вас минимальная шкала в часах. 
Когда конфигурация **skip_off_time** устанавливается в *true*, ячейки, в которых есть нерабочее время, будут скрыты на всех шкалах. 
Таким образом, шкала дня начнется в 08:00 и закончится в 16:59. Однако, если у вас есть только шкала дня, она не изменится.
Она будет начинаться в 00:00 и заканчиваться в 23:59, так как внутри дня есть рабочие часы.

Example 2

Шкала недели состоит из 7 дней, 2 из которых — выходные (например, суббота и воскресенье). У вас минимальная шкала в днях. Когда конфигурация **skip_off_time** устанавливается в *true*, выходные скрываются, и шкала недели отображается с понедельника по пятницу. Однако, если у вас только шкала недели, неделя начнется с понедельника и закончится в воскресенье, независимо от конфигурации **skip_off_time**, поскольку в неделе есть выходные дни.

There are two ways to render a chart with hidden non-working time:

- добавить шкалу с меньшими единицами (часовая шкала для дневной шкалы, дневная шкала для недельной шкалы и т. д.)
- добавить [пользовательскую шкалу](guides/configuring-time-scale.md#customtimeunits), которая будет отображать только рабочие часы/дни

:::note
пример: [5-дневные рабочие недели на шкале](https://snippet.dhtmlx.com/eq70o558)
:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md)