---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender 이벤트
description: "페이지에 데이터가 렌더링되기 전에 발생합니다"
---

# onBeforeDataRender

### Description

@short: 페이지에 데이터가 렌더링되기 전에 실행됩니다

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    // 여기에 코드 작성
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