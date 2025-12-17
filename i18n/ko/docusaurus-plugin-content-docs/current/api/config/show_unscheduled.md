---
sidebar_label: show_unscheduled
title: show_unscheduled config
description: "스케줄이 지정되지 않은 작업의 표시 여부를 토글할 수 있습니다."
---

# show_unscheduled

### Description

@short: 스케줄이 지정되지 않은 작업의 표시 여부를 토글할 수 있습니다.

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

기본적으로 스케줄이 지정되지 않은 작업은 빈 행으로 표시됩니다. 이러한 작업을 타임라인 영역에 직접 표시하려면 **show_unscheduled** 속성을 *false*로 설정하세요. 이름이 다소 혼동스러울 수 있지만, 향후 업데이트에서 더 직관적으로 개선될 예정입니다.

### Related API
- [task_unscheduled_time](api/template/task_unscheduled_time.md)

### Related Guides
- [작업의 기본 작업](guides/unscheduled-tasks.md)

