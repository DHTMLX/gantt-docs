---
sidebar_label: onGanttReady
title: onGanttReady event
description: "dhtmlxGantt가 초기화를 완료했을 때 트리거되며, 이 시점에서는 Gantt 차트가 페이지에 아직 표시되지 않은 상태입니다."
---

# onGanttReady

### Description

@short: DhtmlxGantt가 초기화를 완료했을 때 트리거되며, 이 시점에서는 Gantt 차트가 페이지에 아직 표시되지 않은 상태입니다.

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    //여기에 커스텀 로직을 작성할 수 있습니다.
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)

