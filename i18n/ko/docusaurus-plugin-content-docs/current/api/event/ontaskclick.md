---
sidebar_label: onTaskClick
title: onTaskClick 이벤트
description: "그리드 영역에서 작업 행을 클릭하거나(확장/축소 버튼 및 '작업 추가' 버튼 포함) 타임라인 영역의 작업 바를 클릭할 때 발생합니다"
---

# onTaskClick

### Description

@short: 그리드 영역의 작업 행을 클릭하거나(확장/축소 버튼 및 '작업 추가' 버튼 포함) 타임라인 영역의 작업 바를 클릭할 때 발생합니다

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 클릭된 작업의 ID
- `e` - (선택적) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능(blockable)합니다. false를 반환하면 기본 핸들러가 취소됩니다(작업 선택)

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)