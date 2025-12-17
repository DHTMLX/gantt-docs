---
sidebar_label: onBeforeGanttRender
title: onBeforeGanttRender event
description: "срабатывает непосредственно перед тем, как Gantt chart будет отрисован на странице"
---

# onBeforeGanttRender

### Description

@short: Срабатывает непосредственно перед тем, как Gantt chart будет отрисован на странице

@signature: onBeforeGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttRender", function(){
    //место для вашей кастомной логики
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

