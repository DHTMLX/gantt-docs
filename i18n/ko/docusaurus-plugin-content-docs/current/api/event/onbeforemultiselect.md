---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "하나 이상의 작업을 선택하기 직전에 발생합니다."
---

# onBeforeMultiSelect

### Description

@short: 하나 이상의 작업을 선택하기 직전에 발생합니다.

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // 여기에 로직 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 **multiselect** 확장의 일부이므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
:::


이 이벤트는 차단할 수 있으며, *false*를 반환하면 다중 작업 선택이 발생하지 않습니다.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md#apievents)

