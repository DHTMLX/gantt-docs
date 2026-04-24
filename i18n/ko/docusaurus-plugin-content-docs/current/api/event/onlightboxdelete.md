---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "사용자가 라이트박스의 'Delete' 버튼을 클릭할 때 발생합니다"
---

# onLightboxDelete

### Description

@short: 사용자가 라이트박스의 'Delete' 버튼을 클릭할 때 발생합니다

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (필수) *string | number* - 라이트박스에서 열려 있는 작업의 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("The duration is too long. Please, try again");
        return false;
    }
    return true;
})
~~~

### Details

이벤트는 차단 가능합니다. 'delete' 작업을 취소하고 라이트박스를 열어 두려면 *false*를 반환하십시오.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)