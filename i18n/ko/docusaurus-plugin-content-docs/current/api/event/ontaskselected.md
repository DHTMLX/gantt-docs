---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "사용자가 작업을 선택할 때 트리거됩니다."
---

# onTaskSelected

### Description

@short: 사용자가 작업을 선택할 때 트리거됩니다.

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업 ID

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 멀티셀렉션 범위에 포함된 모든 작업에 대해 발생합니다.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

