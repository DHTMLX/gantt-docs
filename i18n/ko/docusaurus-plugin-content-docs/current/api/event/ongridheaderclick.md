---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "사용자가 그리드의 헤더를 클릭할 때 발생합니다"
---

# onGridHeaderClick

### Description

@short: 사용자가 그리드의 헤더를 클릭할 때 발생합니다

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - 사용자가 클릭한 열의 헤더에 해당하는 name 속성
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지(<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

false를 반환하면 기본 핸들러가 취소됩니다(“+” 버튼 클릭 시 새 작업 추가하거나 열을 정렬하는 기본 동작).