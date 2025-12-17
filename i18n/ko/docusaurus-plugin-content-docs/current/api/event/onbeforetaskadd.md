---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "Gantt 차트에 새 작업이 추가되기 직전에 트리거됩니다."
---

# onBeforeTaskAdd

### Description

@short: Gantt 차트에 새 작업이 추가되기 직전에 트리거됩니다.

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 작업 추가가 방지됩니다.

### Related API
- [addTask](api/method/addtask.md)

