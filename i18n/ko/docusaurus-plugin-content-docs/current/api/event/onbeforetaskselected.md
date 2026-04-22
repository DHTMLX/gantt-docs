--- 
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected 이벤트
description: "사용자가 태스크를 선택하기 전에 발생합니다"
---

# onBeforeTaskSelected

### Description

@short: 사용자가 태스크를 선택하기 전에 발생합니다

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (필수) *string | number* - 태스크 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단할 수 있습니다. 기본 처리를 취소하려면 *false*를 반환하십시오.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)