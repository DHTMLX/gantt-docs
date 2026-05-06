---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "사용자가 작업을 선택할 때 발생합니다"
---

# onTaskSelected

### Description

@short: 사용자가 작업을 선택할 때 발생합니다

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string,number* - 작업 ID

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    // 여기에 코드 작성
});
~~~

### Details

다중 선택 범위의 각 작업에 대해 이 이벤트가 호출됩니다.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)