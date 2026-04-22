---
sidebar_label: onBeforeParse
title: событие onBeforeParse
description: "Срабатывает до начала разбора данных"
---

# onBeforeParse

### Description

@short: Срабатывает до начала разбора данных

@signature: onBeforeParse: () =\> void;

### Example

~~~jsx
gantt.init("gantt_here");
gantt.attachEvent("onBeforeParse", function(){ 
    // любая ваша логика здесь
});

gantt.parse(demo_tasks);
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)