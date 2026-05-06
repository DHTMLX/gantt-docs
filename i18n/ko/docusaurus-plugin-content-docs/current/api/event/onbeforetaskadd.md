---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "Gantt 차트에 새 작업이 추가되기 전에 발생합니다"
---

# onBeforeTaskAdd

### Description

@short: Gantt 차트에 새 작업이 추가되기 전에 발생합니다

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 실행될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단이 가능합니다. 태스크 추가를 취소하려면 false를 반환하십시오.

### Related API
- [addTask](api/method/addtask.md)