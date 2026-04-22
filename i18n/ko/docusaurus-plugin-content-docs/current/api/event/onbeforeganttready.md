---
sidebar_label: onBeforeGanttReady
title: onBeforeGanttReady event
description: "dhtmlxGantt 초기화가 시작되기 전에 발생합니다"
---

# onBeforeGanttReady

### Description

@short: dhtmlxGantt 초기화가 시작되기 전에 트리거됩니다

@signature: onBeforeGanttReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttReady", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [onGanttReady](api/event/onganttready.md)