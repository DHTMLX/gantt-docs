---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "작업의 선택 상태가 변경될 때마다 트리거됩니다 (작업이 선택되거나 선택 해제될 때)"
---

# onTaskMultiSelect

### Description

@short: 작업의 선택 상태가 변경될 때마다 트리거됩니다 (작업이 선택되거나 선택 해제될 때)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업의 식별자
- `state` - (required) *boolean* - 작업이 선택되었으면 true, 선택 해제되었으면 false
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // 여기에 로직 작성
});
~~~

### Details

:::note
 이 이벤트는 **multiselect** 확장 기능에 속하므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참조하세요. 
:::


이 이벤트는 선택된 범위 내의 각 작업에 대해 발생합니다.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md#apievents)

