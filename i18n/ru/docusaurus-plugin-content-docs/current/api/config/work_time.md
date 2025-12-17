---
sidebar_label: work_time
title: work_time config
description: "вычисляет длительность задач на основе рабочего времени, а не календарного времени"
---

# work_time

### Description

@short: Вычисляет длительность задач на основе рабочего времени, а не календарного времени

@signature: work_time: boolean

### Example

~~~jsx
//отображает длительность в рабочих часах и исключает нерабочие периоды из графика
gantt.config.duration_unit = "hour";
gantt.config.work_time = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Duration includes only working days](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [skip_off_time](api/config/skip_off_time.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)

