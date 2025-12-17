---
sidebar_label: onGanttRender
title: onGanttRender event
description: "срабатывает после того, как диаграмма Ганта полностью отрисовалась на странице"
---

# onGanttRender

### Description

@short: Срабатывает после того, как диаграмма Ганта полностью отрисовалась на странице

@signature: onGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttRender", function(){
    alert("Диаграмма Ганта полностью отрисована на странице.")
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onLoadEnd](api/event/onloadend.md)

