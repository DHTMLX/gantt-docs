---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "다른 작업을 선택함으로써 사용자가 작업 선택을 해제할 때 발생합니다"
---

# onTaskUnselected

### Description

@short: 사용자가 다른 작업을 선택하여 작업의 선택을 해제할 때 발생합니다

@signature: onTaskUnselected: (id: string | number) => void;

### Parameters

- `id` - (required) *string | number* - 해제된 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // 여기에 코드 작성
});
~~~

### Details

다중 선택 범위의 각 작업에 대해 이 이벤트가 호출됩니다.

멀티셀렉트(multiselect) 확장 기능이 활성화된 경우, 사용자가 이미 선택한 작업의 선택을 제거할 때도 해당 이벤트가 발생합니다.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)