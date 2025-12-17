---
sidebar_label: show_tasks_outside_timescale
title: show_tasks_outside_timescale config
description: "간트 차트에서 정의된 날짜 범위 밖에 있는 작업들을 표시할 수 있게 합니다."
---

# show_tasks_outside_timescale

### Description

@short: 간트 차트에서 정의된 날짜 범위 밖에 있는 작업들을 표시할 수 있게 합니다.

@signature: show_tasks_outside_timescale: boolean

### Example

~~~jsx
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Tasks outside timescale](https://docs.dhtmlx.com/gantt/samples/01_initialization/20_tasks_outside_timescale.html)

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md#tasksoutsidetimescale)

### Change log
- v6.3 버전에 추가됨

