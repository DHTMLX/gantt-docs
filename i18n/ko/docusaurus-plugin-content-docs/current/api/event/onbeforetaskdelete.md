--- 
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "사용자가 작업을 삭제하기 전에 발생합니다"
---

# onBeforeTaskDelete

### Description

@short: 사용자가 작업을 삭제하기 전에 발생합니다

@signature: onBeforeTaskDelete: (id: string | number, task: Task) => boolean;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `task` - (required) *Task* - 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. 작업 삭제를 취소하려면 false를 반환하세요.

### Related API
- [deleteTask](api/method/deletetask.md)