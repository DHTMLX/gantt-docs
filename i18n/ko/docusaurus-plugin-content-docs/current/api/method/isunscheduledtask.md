---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "태스크가 미스스케줄된 상태인지 확인합니다"
---

# isUnscheduledTask

### Description

@short: 태스크가 미스스케줄 상태인지 확인합니다

@signature: isUnscheduledTask: (task: Task) => boolean

### Parameters

- `task` - (required) *Task* - 태스크의 객체

### Returns
- `value` - (boolean) - 지정된 태스크가 미스스케줄 상태일 때 'true', 그렇지 않으면 'false'

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [미스스케줄된 작업](guides/unscheduled-tasks.md)
- [자동 스케줄링](guides/auto-scheduling.md)