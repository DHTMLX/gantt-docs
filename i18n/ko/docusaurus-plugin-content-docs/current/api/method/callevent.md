---
sidebar_label: callEvent
title: callEvent 메서드
description: "내부 이벤트를 호출합니다"
---

# callEvent

### Description

@short: 내부 이벤트를 호출합니다

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (필수) *문자열* - 이벤트의 이름이며, 대소문자 구분 무시
- `params` - (선택) *배열* - 이벤트 관련 데이터의 배열

### Returns
- ` result` - (Boolean) - <i>false</i>일 경우 일부 이벤트 핸들러가 <i>false</i>를 반환하면 <i>false</i>를 반환합니다. 그렇지 않으면 <i>true</i>를 반환합니다

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~


### Details

일반적으로 이벤트는 자동으로 호출되며 이 메서드를 사용할 필요가 없습니다.