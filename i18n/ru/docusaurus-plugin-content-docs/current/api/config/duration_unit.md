---
sidebar_label: duration_unit
title: duration_unit config
description: "устанавливает единицу измерения длительности"
---

# duration_unit

### Description

@short: Устанавливает единицу измерения длительности

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//один час
gantt.config.duration_step = 3; 
//если task.duration = 2, задача будет длиться 6 часов
~~~

**Default value:** "day"

### Related samples
- [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

Когда разные задачи требуют различных единиц измерения длительности - например, некоторые отображаются в часах, а другие в днях - [formatter module](guides/working-time.md#taskdurationindecimalformat) помогает управлять этим.

В таких случаях **duration_unit** следует установить в наименьшую единицу, которая может использоваться для любой задачи:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// или

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

Плагин formatter позволяет отображать длительности в нужных вам единицах. Он также даёт возможность пользователям вводить длительности с использованием разных единиц.

<br>
Если вы выбираете "hour" или "minute" в качестве duration_unit, рекомендуется установить [duration_step](api/config/duration_step.md) равным 1. Такая настройка активирует определённые оптимизации для расчёта рабочего времени, которые работают только при шаге равном 1. Учтите, что между "оптимизированным" и "неоптимизированным" режимами есть значительная разница в производительности.

### Related API
- [duration_step](api/config/duration_step.md)
- @related: [Расчёт рабочего времени](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

