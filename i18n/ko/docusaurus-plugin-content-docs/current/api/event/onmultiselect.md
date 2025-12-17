---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "작업 하나 또는 여러 작업의 선택이 완료되었을 때 트리거됩니다."
---

# onMultiSelect

### Description

@short: 작업 하나 또는 여러 작업의 선택이 완료되었을 때 트리거됩니다.

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // 여기에 로직 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 **multiselect** 확장 기능의 일부이므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md#apievents)

