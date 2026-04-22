---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete 이벤트
description: "사용자가 작업을 삭제한 후에 발생합니다"
---

# onAfterTaskDelete

### Description

@short: 사용자가 작업을 삭제한 후 발생합니다

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (필수) *string | number* - 작업 ID
- `task` - (필수) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    // 여기에 코드 작성
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)