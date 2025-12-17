---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "사용자가 라이트박스에서 '저장' 버튼을 클릭할 때 트리거됩니다."
---

# onLightboxSave

### Description

@short: 사용자가 라이트박스에서 '저장' 버튼을 클릭할 때 트리거됩니다.

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 수정되지 않은 작업의 ID입니다. 이 시점에서는 라이트박스 값이 아직 작업 객체에 적용되지 않았으므로, gantt.getTask(id)를 사용하여 원본 작업에 접근할 수 있습니다.
- `task` - (required) *Task* - 업데이트된 작업 객체입니다.
- `is_new` - (required) *boolean* - 라이트박스가 새 작업을 생성하기 위해 열렸는지(<i>true</i>) 또는 기존 작업을 편집하기 위해 열렸는지(<i>false</i>)를 나타냅니다.

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>)를 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    //여기에 커스텀 로직을 추가할 수 있습니다.
    return true;
})
~~~

### Details

이 이벤트는 차단될 수 있습니다. *false*를 반환하면 '저장' 작업이 취소되고 라이트박스가 열린 상태로 유지됩니다.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

