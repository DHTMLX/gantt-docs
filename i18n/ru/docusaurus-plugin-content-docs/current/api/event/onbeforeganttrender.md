---
sidebar_label: onBeforeGanttRender
title: onBeforeGanttRender event
description: "срабатывает до того, как диаграмма Ганта будет отрисована на странице"
---

# onBeforeGanttRender

### Description

@short: Срабатывает до того, как диаграмма Ганта будет отрисована на странице

@signature: onBeforeGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttRender", function(){
    // любая ваша логика здесь
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