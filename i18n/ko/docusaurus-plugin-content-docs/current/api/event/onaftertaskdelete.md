---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "사용자가 작업을 삭제한 직후에 트리거됩니다."
---

# onAfterTaskDelete

### Description

@short: 사용자가 작업을 삭제한 직후에 트리거됩니다.

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업의 ID
- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    //여기에 커스텀 로직을 추가할 수 있습니다.
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)

