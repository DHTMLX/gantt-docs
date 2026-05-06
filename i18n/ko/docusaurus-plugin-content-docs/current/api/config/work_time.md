---
sidebar_label: work_time
title: work_time config
description: "작업의 지속 시간을 달력 시간 대신 작업 시간으로 계산하도록 활성화"
---

# work_time

### Description

@short: 작업 시간으로 작업의 지속 시간을 계산하도록 활성화

@signature: work_time: boolean

### Example

~~~jsx
// 작업 시간을 기준으로 기간을 시간 단위로 표시하고, 작업하지 않는 시간을 차트에서 제외합니다.
gantt.config.duration_unit = "hour";
gantt.config.work_time = true;

gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [작업일에만 포함된 지속 시간](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)
- [작업 시간 계산](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [skip_off_time](api/config/skip_off_time.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)