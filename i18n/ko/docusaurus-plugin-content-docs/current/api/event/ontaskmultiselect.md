---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect 이벤트
description: "작업 선택 상태가 변경된 후에 발생합니다(해당 작업이 선택되었거나 해제되었습니다)"
---

# onTaskMultiSelect

### Description

@short: 작업 선택 상태가 변경된 직후에 발생합니다(해당 작업이 선택되었거나 해제되었습니다)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (필수) *string | number* - 작업의 ID
- `state` - (필수) *boolean* - 작업이 선택되었으면 true, 해제되었으면 false
- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // 여기에 코드 작성
});
~~~

### Details

:::note
이벤트는 **multiselect** 확장에 정의되어 있으므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. [Multi-Task Selection](guides/multiselection.md) 문서에서 자세한 내용을 확인하십시오.
:::

이벤트는 범위 내의 각 작업에 대해 호출됩니다.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)