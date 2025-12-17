---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "사용자가 작업을 삭제하기 직전에 트리거됩니다."
---

# onBeforeTaskDelete

### Description

@short: 사용자가 작업을 삭제하기 직전에 트리거됩니다.

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // 여기서 커스텀 로직을 추가할 수 있습니다.
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 작업 삭제가 방지됩니다.

### Related API
- [deleteTask](api/method/deletetask.md)

