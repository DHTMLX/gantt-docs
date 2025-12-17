---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "작업이 Gantt 차트에 추가된 직후에 트리거됩니다."
---

# onAfterTaskAdd

### Description

@short: 작업이 Gantt 차트에 추가된 직후에 트리거됩니다.

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //여기에 커스텀 로직 작성
});
~~~

### Related API
- [addTask](api/method/addtask.md)

