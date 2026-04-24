---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd 이벤트
description: "사용자가 Gantt 차트에 작업을 추가한 직후 발생합니다"
---

# onAfterTaskAdd

### Description

@short: 사용자가 Gantt 차트에 작업을 추가한 직후 발생합니다

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    // 여기에 코드 작성
});
~~~

### Related API
- [addTask](api/method/addtask.md)