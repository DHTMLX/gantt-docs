---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime 메서드
description: "작업 시간 내에서 작업 지속 시간을 재계산합니다"
---

# correctTaskWorkTime

### Description

@short: 작업 시간 내에서 작업 지속 시간을 재계산합니다

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 작업의 객체

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

메서드는 아래 구성 옵션이 필요합니다:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [작업 시간 계산](guides/working-time.md)