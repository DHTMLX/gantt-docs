---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "lightbox에서 사용자가 '저장' 버튼을 클릭할 때 발생합니다"
---

# onLightboxSave

### Description

@short: 사용자가 라이트박스에서 '저장' 버튼을 클릭할 때 트리거됩니다.

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 수정되지 않은 작업의 ID입니다. 이 단계에서 lightbox의 값은 아직 작업 객체에 적용되지 않았으며, 초기 작업은 gantt.getTask(id)를 사용해 확인할 수 있습니다.
- `task` - (required) *Task* - 수정된 Task 객체
- `is_new` - (required) *boolean* - 사용자가 새 작업을 만들기 위해 lightbox를 여는지 여부를 지정합니다 (<i>true</i>)<br/> 또는 기존 작업을 업데이트하는 경우 (<i>false</i>)

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 실행될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부를 정의합니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // 여기에 코드 작성
    return true;
})
~~~

### Details

이벤트는 차단 가능합니다. '저장' 작업을 취소하려면 false를 반환하고 라이트박스 창을 열어 두십시오.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)