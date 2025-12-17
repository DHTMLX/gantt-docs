---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "사용자가 다른 작업을 선택하여 작업 선택을 해제할 때 발생합니다."
---

# onTaskUnselected

### Description

@short: 사용자가 다른 작업을 선택하여 작업 선택을 해제할 때 발생합니다.

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 선택 해제된 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    //여기에 사용자 정의 로직을 작성할 수 있습니다
});
~~~

### Details

이 이벤트는 멀티선택 범위 내의 모든 작업에 대해 발생합니다.

[멀티셀렉트](guides/extensions-list.md#multitaskselection) 확장이 활성화된 경우, 사용자가 현재 선택에서 작업을 제거할 때마다 이 이벤트가 트리거됩니다.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)

