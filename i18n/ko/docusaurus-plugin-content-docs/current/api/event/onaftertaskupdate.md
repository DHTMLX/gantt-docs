---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "사용자가 작업을 업데이트한 직후에 트리거됩니다."
---

# onAfterTaskUpdate

### Description

@short: 사용자가 작업을 업데이트한 직후에 트리거됩니다.

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //여기에 사용자 정의 로직 작성
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)

