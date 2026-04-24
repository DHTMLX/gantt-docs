---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate 이벤트
description: "사용자가 작업을 업데이트한 후에 발생합니다"
---

# onAfterTaskUpdate

### Description

@short: 사용자가 작업을 업데이트한 후에 발생합니다

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (필수) *string | number* - 작업 ID
- `task` - (필수) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    // 여기에 코드 작성
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)