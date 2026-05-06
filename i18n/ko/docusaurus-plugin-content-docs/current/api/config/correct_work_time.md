---
sidebar_label: correct_work_time
title: correct_work_time 구성
description: "작업의 시작일과 종료일을 드래그하는 동안 작업 시간에 맞추어 조정하도록 활성화합니다"
---

# correct_work_time

### Description

@short: 드래그하는 동안 작업의 시작일과 종료일을 작업 시간에 맞추어 조정합니다

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false


### Related samples
- [드래그 시 작업 위치 보정](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

The property has a sense only if the [work_time](api/config/work_time.md) property is enabled.

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)