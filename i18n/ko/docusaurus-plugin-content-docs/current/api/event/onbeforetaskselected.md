---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "작업이 선택되기 직전에 발생합니다"
---

# onBeforeTaskSelected

### Description

@short: 작업이 선택되기 직전에 발생합니다

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업의 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 여부를 결정합니다

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 기본 동작이 발생하지 않습니다.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

