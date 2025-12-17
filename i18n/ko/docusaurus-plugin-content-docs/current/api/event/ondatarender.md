---
sidebar_label: onDataRender
title: onDataRender event
description: "데이터가 페이지에 표시된 직후에 트리거됩니다"
---

# onDataRender

### Description

@short: 데이터가 페이지에 표시된 직후에 트리거됩니다

@signature: onDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDataRender", function(){
    alert("데이터가 페이지에 렌더링되었습니다")
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
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

