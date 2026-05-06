---
sidebar_label: onTaskLoading
title: onTaskLoading 이벤트
description: "데이터 소스에서 작업이 로드될 때 발생합니다"
---

# onTaskLoading

### Description

@short: 데이터 소스에서 작업이 로드될 때 발생합니다

@signature: onTaskLoading: (task: Task) => boolean;

### Parameters

- `task` - (required) *Task* - 태스크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

- 데이터 소스의 각 작업에 대해 이벤트가 발생합니다.
- 이벤트는 차단 가능합니다. *false*를 반환하면 태스크가 Gantt 차트에 로드되지 않습니다.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)