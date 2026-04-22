---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate 이벤트
description: "사용자가 작업을 업데이트하기 전에 이벤트가 발생합니다"
---

# onBeforeTaskUpdate

### Description

@short: 사용자가 작업을 업데이트하기 전에 발생합니다

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (필수) *string | number* - 작업 ID
- `new_task` - (필수) *Task* - 새로 업데이트된 작업 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // 여기에 코드 작성
});
~~~

### Details

**onBeforeTaskUpdate** 이벤트를 사용할 때, 작업이 완전히 업데이트되기 전에 작업 객체를 얻는 것은 항상 가능하지 않습니다. 이 이벤트는 작업 객체가 업데이트된 후에 발생하지만 모든 변경 사항이 적용되기 전에 발생합니다.
변경 사항이 적용되기 전에 작업 객체를 얻으려면, 작업의 변경과 직접 관련된 이벤트 핸들러를 사용해야 합니다:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

API를 통해 변경이 이루어지는 경우, 작업을 수정하는 코드가 실행되기 전에 작업 객체를 얻을 수 있습니다. 다양한 방식으로 작업을 수정하는 예제를 확인해 보세요(예를 들어 작업 날짜를 변경하는 경우):

:::note
sample: [Updating a task ](https://snippet.dhtmlx.com/9xy8wr2a)
:::

비교 후에는, 작업을 수정하기 바로 전에 발생하는 이벤트들이 이전의 작업 객체를 반환하는 것을 확인할 수 있으며, 반면에 **onBeforeTaskUpdate** 이벤트는 작업의 새 객체를 반환합니다.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)