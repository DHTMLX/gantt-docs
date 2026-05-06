--- 
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "작업 하나 또는 여러 작업 범위를 선택하기 전에 발생합니다"
---

# onBeforeMultiSelect

### Description

@short: 작업 하나 또는 여러 작업 범위를 선택하기 전에 발생합니다

@signature: onBeforeMultiSelect: (e: Event) => void;

### Parameters

- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // some logic here
    return true;
});
~~~

### Details

:::note
이벤트는 **multiselect** 확장에서 정의되므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 문서를 참고하십시오.
:::

이벤트는 차단 가능하며, *false*를 반환하면 다중 선택이 취소됩니다.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)