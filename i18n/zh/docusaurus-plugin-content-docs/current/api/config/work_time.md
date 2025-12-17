---
sidebar_label: work_time
title: work_time config
description: "根据工作时间而非日历时间计算任务持续时间"
---

# work_time

### Description

@short: 根据工作时间而非日历时间计算任务持续时间

@signature: work_time: boolean

### Example

~~~jsx
// 显示以工作小时为单位的持续时间，并在图表中排除非工作时间段
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
- [工作时间计算](guides/working-time.md)

