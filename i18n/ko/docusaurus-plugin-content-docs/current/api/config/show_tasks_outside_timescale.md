---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale 구성
description: "지정된 날짜 범위를 벗어난 작업을 Gantt 차트에 표시하도록 설정합니다"
---

# show_tasks_outside_timescale

### Description

@short: 지정된 날짜 범위를 벗어난 작업을 Gantt 차트에 표시합니다

@signature: show_tasks_outside_timescale: boolean

### Example

~~~jsx
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [타임스케일 밖의 작업](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md)

### Change log
- v6.3에서 추가됨