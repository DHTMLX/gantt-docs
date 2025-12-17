---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "사용자가 작업을 업데이트하기 직전에 발생하는 이벤트"
---

# onBeforeTaskUpdate

### Description

@short: 사용자가 작업을 업데이트하기 직전에 발생하는 이벤트

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `new_task` - (required) *Task* - 업데이트된 작업 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    //여기에 사용자 정의 로직을 추가할 수 있습니다
});
~~~

### Details

**onBeforeTaskUpdate** 이벤트는 작업 객체가 업데이트된 직후, 모든 변경 사항이 완전히 적용되기 전 시점에 발생합니다. 따라서 업데이트 이전의 작업 객체 상태를 항상 접근할 수 있는 것은 아닙니다.

변경 사항이 적용되기 이전의 작업 객체를 얻으려면 작업 수정에 특화된 이벤트 핸들러를 사용하는 것을 권장합니다:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

API를 통해 변경이 이루어질 때는 수정 코드가 실행되기 전에 작업 객체에 접근할 수 있습니다. 다음 예제는 작업의 날짜 변경 등 작업을 업데이트하는 다양한 방법을 보여줍니다:

:::note

**Related example:** [Updating a task](https://snippet.dhtmlx.com/9xy8wr2a)

:::

이벤트들을 비교해 보면, 작업 수정 직전에 발생하는 이벤트들은 이전 작업 객체를 제공하는 반면, **onBeforeTaskUpdate**는 업데이트된 작업 객체를 제공합니다.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)

