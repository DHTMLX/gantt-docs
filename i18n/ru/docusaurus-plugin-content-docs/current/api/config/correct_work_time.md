---
sidebar_label: correct_work_time
title: конфигурация correct_work_time
description: "позволяет корректировать даты начала и конца задачи в соответствии с рабочим временем (во время перетаскивания)"
---

# correct_work_time

### Description

@short: Позволяет приводить даты начала и конца задачи к рабочему времени (во время перетаскивания)

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false


### Related samples
- [Корректная позиция задачи при перетаскивании](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

Свойство имеет смысл только если включено свойство [work_time](api/config/work_time.md).

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)