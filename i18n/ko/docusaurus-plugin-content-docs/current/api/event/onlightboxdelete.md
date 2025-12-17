---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "라이트박스에서 사용자가 'Delete' 버튼을 클릭할 때 발생합니다."
---

# onLightboxDelete

### Description

@short: 라이트박스에서 사용자가 'Delete' 버튼을 클릭할 때 발생합니다.

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 라이트박스에 현재 열려 있는 작업의 ID

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 또는 차단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("기간이 너무 깁니다. 다시 시도해주세요.");
        return false;
    }
    return true;
})
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 'delete' 동작이 중단되고 라이트박스가 계속 표시됩니다.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)

