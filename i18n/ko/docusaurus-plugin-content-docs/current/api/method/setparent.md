---
sidebar_label: setParent
title: setParent method
description: "작업에 부모를 할당합니다"
---

# setParent

### Description

@short: 작업에 부모를 할당합니다

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체
- `pid` - (required) *number | string* -                부모 작업 ID

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~
