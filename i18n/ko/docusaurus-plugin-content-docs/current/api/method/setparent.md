---
sidebar_label: setParent
title: setParent method
description: "작업의 부모를 설정"
---

# setParent

### Description

@short: 작업의 부모를 설정

@signature: setParent: (task: Task, pid: number | string) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체
- `pid` - (required) *number | string* - 상위 작업 ID

### Example

~~~jsx
gantt.setParent(gantt.getTask(2), 20);
gantt.updateTask(2);
~~~