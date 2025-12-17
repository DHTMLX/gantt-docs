---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "작업 시간을 기준으로 작업 기간을 재계산합니다"
---

# correctTaskWorkTime

### Description

@short: 작업 시간을 기준으로 작업 기간을 재계산합니다

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

이 메서드는 다음 구성 옵션이 활성화된 경우에 작동합니다:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [작업 시간 계산](guides/working-time.md)
