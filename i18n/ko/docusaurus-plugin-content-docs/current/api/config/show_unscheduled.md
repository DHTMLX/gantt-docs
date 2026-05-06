---
sidebar_label: show_unscheduled
title: show_unscheduled 설정
description: "날짜가 지정되지 않은 작업 표시를 활성화합니다"
---

# show_unscheduled

### Description

@short: 날짜가 지정되지 않은 작업 표시를 활성화합니다

@signature: show_unscheduled: boolean

### Example

~~~jsx
gantt.config.show_unscheduled = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

### Details

참고로 기본적으로 날짜가 지정되지 않은 작업은 빈 행으로 표시됩니다. 타임라인 영역에 표시하려면 **show_unscheduled** 속성의 값을 *false*로 설정해야 합니다.
이는 다소 혼란스러울 수 있지만, 향후 버전 중 하나에서 속성 이름과 값 간의 불일치를 해결할 예정입니다.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [Basic Operations with Tasks](guides/unscheduled-tasks.md)