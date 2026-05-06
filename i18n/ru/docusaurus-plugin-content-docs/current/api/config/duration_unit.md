---
sidebar_label: duration_unit
title: duration_unit config
description: "устанавливает единицу продолжительности"
---

# duration_unit

### Description

@short: Устанавливает единицу продолжительности

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//an hour
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours
~~~

**Default value:**"day" 

### Related samples
- [Десятичные продолжительности для задач](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

Если вам нужно иметь разные единицы продолжительности для разных задач, то есть отображать продолжительности некоторых задач в часах, а для некоторых — в "days", можно воспользоваться [formatter module](guides/working-time.md#taskdurationindecimalformat). 

В таком случае **duration_unit** должно быть установлено в минимальную продолжительность, которую ваши задачи могут иметь:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

 // или

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

И плагин formatter позволит отображать продолжительности в нужных вам единицах. Конечным пользователям также будет доступен ввод продолжительностей в разных единицах.

Если вы укажете единицу продолжительности как "hour" или "minute", рекомендуется установить [duration_step](api/config/duration_step.md) равным 1.
Такое сочетание активирует определенные optimizations для вычисления рабочего времени, которые работают только при шаге 1. Обратите внимание, что существуют значительные различия в производительности между режимами "optimized" и "non-optimized".

### Related API
- [duration_step](api/config/duration_step.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md#taskdurationindecimalformat)