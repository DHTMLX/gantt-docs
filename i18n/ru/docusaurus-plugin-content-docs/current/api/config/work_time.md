---
sidebar_label: work_time
title: конфигурация work_time
description: "позволяет рассчитывать продолжительность задач в рамках рабочего времени, а не по календарному времени"
---

# work_time

### Description

@short: Позволяет рассчитывать продолжительность задач в рамках рабочего времени, а не по календарному времени

@signature: work_time: boolean

### Example

~~~jsx
//calculates duration in working hours and hides non-working time from the chart
gantt.config.duration_unit = "hour";
gantt.config.work_time = true;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Related samples
- [Продолжительность включает только рабочие дни](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)
- [Расчет рабочих часов](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [skip_off_time](api/config/skip_off_time.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md)