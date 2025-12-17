---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "데이터 소스에서 작업이 로드될 때 트리거됩니다."
---

# onTaskLoading

### Description

@short: 데이터 소스에서 작업이 로드될 때 트리거됩니다.

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 로드 중인 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 계속 진행될지(<b>true</b>) 또는 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

- 이 이벤트는 데이터 소스에서 불러오는 모든 작업에 대해 발생합니다.
- 차단이 가능하며, *false*를 반환하면 작업이 간트 차트에 로드되지 않습니다.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

