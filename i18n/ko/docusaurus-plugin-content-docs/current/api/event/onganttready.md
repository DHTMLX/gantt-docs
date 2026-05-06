---
sidebar_label: onGanttReady
title: onGanttReady 이벤트
description: "dhtmlxGantt 초기화가 완료되었지만 Gantt 차트가 아직 페이지에 렌더링되지 않았습니다"
---

# onGanttReady

### Description

@short: dhtmlxGantt 초기화가 완료되었지만 Gantt 차트가 아직 페이지에 렌더링되지 않았습니다

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)