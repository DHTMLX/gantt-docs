---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender event
description: "데이터가 페이지에 표시되기 직전에 트리거됩니다."
---

# onBeforeDataRender

### Description

@short: 데이터가 페이지에 표시되기 직전에 트리거됩니다.

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    ////여기에 사용자 정의 로직 작성
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

