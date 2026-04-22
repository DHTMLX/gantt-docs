---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "사용자가 작업을 더블 클릭할 때 발생합니다"
---

# onTaskDblClick

### Description

@short: 사용자 작업을 더블 클릭할 때 발생합니다

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (필수) *string* - 더블 클릭된 작업의 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. false를 반환하면 기본 핸들러(작업 세부 정보 열기)가 취소됩니다

### Related API
- [onTaskClick](api/event/ontaskclick.md)