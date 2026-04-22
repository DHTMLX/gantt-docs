---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect 이벤트
description: "작업 선택 상태가 변경되기 전에 실행됩니다(작업이 선택되거나 해제될 때)"
---

# onBeforeTaskMultiSelect

### Description

@short: 태스크 선택 상태가 변경되기 전에 실행됩니다(작업이 선택되거나 해제될 때)

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) => void;

### Parameters

- `id` - (필수) *string | number* - 작업의 ID
- `state` - (필수) *boolean* - 작업이 선택될 예정이면 true, 선택 해제되면 false
- `e` - (필수) *Event | null* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
    // 여기에 코드 작성
     return true;
});
~~~

### Details

:::note
이벤트는 **multiselect** 확장에 정의되어 있으므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 문서를 참조하십시오.
:::

이벤트는 범위의 각 작업에 대해 호출됩니다.

이벤트는 차단 가능하며, false를 반환하면 작업 선택 상태 변경이 취소됩니다.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)