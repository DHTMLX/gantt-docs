---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "작업을 더블 클릭할 때 트리거됩니다"
---

# onTaskDblClick

### Description

@short: 작업을 더블 클릭할 때 트리거됩니다

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 더블 클릭된 작업의 ID
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 진행할지(<b>true</b>) 차단할지(<b>false</b>) 여부를 나타냅니다

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작인 작업 상세 열기가 중지됩니다.

### Related API
- [onTaskClick](api/event/ontaskclick.md)

