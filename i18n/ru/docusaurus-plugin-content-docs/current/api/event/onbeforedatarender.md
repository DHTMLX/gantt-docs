---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender event
description: "срабатывает непосредственно перед отображением данных на странице"
---

# onBeforeDataRender

### Description

@short: Срабатывает непосредственно перед отображением данных на странице

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    ////любая ваша логика здесь
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

