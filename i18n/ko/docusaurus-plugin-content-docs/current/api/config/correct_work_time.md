---
sidebar_label: correct_work_time
title: correct_work_time config
description: "드래그 중 작업의 시작 및 종료 날짜를 근무 시간 내로 조정할 수 있게 합니다"
---

# correct_work_time

### Description

@short: 드래그 중 작업의 시작 및 종료 날짜를 근무 시간 내로 조정할 수 있게 합니다

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

이 설정은 [work_time](api/config/work_time.md) 속성이 활성화된 경우에만 적용됩니다.

<br>

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

