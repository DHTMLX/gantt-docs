---
sidebar_label: correct_work_time
title: correct_work_time config
description: "позволяет корректировать даты начала и окончания задачи так, чтобы они попадали в рабочие часы при перетаскивании"
---

# correct_work_time

### Description

@short: Позволяет корректировать даты начала и окончания задачи так, чтобы они попадали в рабочие часы при перетаскивании

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

Этот параметр действует только если включено свойство [work_time](api/config/work_time.md).

<br>

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)

