---
sidebar_label: work_time
title: work_time config
description: "enables calculating the duration of tasks in working time instead of calendar time"
---

# work_time

### Description

@short: Enables calculating the duration of tasks in working time instead of calendar time

@signature: work_time: boolean

### Example

~~~jsx
//calculates duration in working hours and hides non-working time from the chart
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
- [Work Time Calculation](guides/working-time.md)

