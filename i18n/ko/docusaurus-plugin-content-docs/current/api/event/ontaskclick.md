---
sidebar_label: onTaskClick
title: onTaskClick event
description: "그리드 영역에서 작업 행을 클릭할 때(여기에는 '확장/축소' 및 '작업 추가' 버튼 포함) 또는 타임라인 영역 내 작업 바를 클릭할 때 발생합니다."
---

# onTaskClick

### Description

@short: 그리드 영역에서 작업 행을 클릭할 때(여기에는 '확장/축소' 및 '작업 추가' 버튼 포함) 또는 타임라인 영역 내 작업 바를 클릭할 때 발생합니다.

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 클릭된 작업의 ID
- `e` - (required) *Event* - 선택 사항, 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 또는 차단될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    //여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작(작업 선택)이 중지됩니다.

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)

