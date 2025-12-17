---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "작업의 선택 상태가 변경되기 직전에 트리거됩니다 (작업이 선택되거나 선택 해제될 때)."
---

# onBeforeTaskMultiSelect

### Description

@short: 작업의 선택 상태가 변경되기 직전에 트리거됩니다 (작업이 선택되거나 선택 해제될 때).

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업의 고유 식별자  
- `state` - (required) *boolean* - 작업이 선택될 경우 true, 선택 해제될 경우 false  
- `e` - (required) *Event | null* - 가능하면 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){  
    // 여기에 로직을 추가하세요  
    return true;  
});
~~~

### Details

:::note
 이 이벤트는 **multiselect** 확장의 일부이므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
::: 

이 이벤트는 선택 범위 내의 모든 작업에 대해 트리거됩니다. 

false를 반환하면 차단되어 작업의 선택 상태 변경이 방지됩니다.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md#apievents)

