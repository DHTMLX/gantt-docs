---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "사용자가 그리드 헤더를 클릭할 때 트리거됩니다."
---

# onGridHeaderClick

### Description

@short: 사용자가 그리드 헤더를 클릭할 때 트리거됩니다.

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - 클릭된 컬럼 헤더의 name 속성
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 아니면 방지될지(<b>false</b>)를 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    //여기에 커스텀 로직을 추가할 수 있습니다.
    return true;
});
~~~

### Details

false를 반환하면 "플러스" 버튼을 통한 새 작업 추가나 컬럼 정렬과 같은 기본 동작이 중지됩니다.
