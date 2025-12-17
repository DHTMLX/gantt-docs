---
sidebar_label: callEvent
title: callEvent method
description: "내부 이벤트를 트리거합니다"
---

# callEvent

### Description

@short: 내부 이벤트를 트리거합니다

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - 이벤트 이름으로 대소문자를 구분하지 않습니다
- `params` - (optional) *array* - 선택 사항으로, 이벤트와 관련된 데이터를 포함하는 배열

### Returns
- ` result` - (boolean) - <i>false</i> 이벤트 핸들러 중 하나라도 <i>false</i>를 반환하면 <i>false</i>를 반환합니다. 그렇지 않으면 <i>true</i>를 반환합니다

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

일반적으로 이벤트는 자동으로 트리거되므로 이 메소드를 수동으로 호출할 필요가 없습니다.
