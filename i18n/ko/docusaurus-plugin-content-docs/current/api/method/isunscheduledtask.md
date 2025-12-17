---
sidebar_label: isUnscheduledTask
title: isUnscheduledTask method
description: "작업이 unscheduled인지 확인합니다."
---

# isUnscheduledTask

### Description

@short: 작업이 unscheduled인지 확인합니다.

@signature: isUnscheduledTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 확인할 작업 객체입니다.

### Returns
- ` value` - (boolean) - 작업이 unscheduled인 경우 'true'를 반환하며, 그렇지 않으면 'false'를 반환합니다.

### Example

~~~jsx
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### Related Guides
- [예정되지 않은 작업](guides/unscheduled-tasks.md)
- [자동 스케줄링](guides/auto-scheduling.md)
