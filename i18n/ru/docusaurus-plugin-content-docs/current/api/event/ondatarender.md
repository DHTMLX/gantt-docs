---
sidebar_label: onDataRender
title: onDataRender event
description: "срабатывает сразу после того, как данные были отображены на странице"
---

# onDataRender

### Description

@short: Срабатывает сразу после того, как данные были отображены на странице

@signature: onDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDataRender", function(){
    alert("Данные были отображены на странице")
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

