---
sidebar_label: onBeforeParse
title: onBeforeParse event
description: "срабатывает непосредственно перед началом парсинга данных"
---

# onBeforeParse

### Description

@short: Срабатывает непосредственно перед началом парсинга данных

@signature: onBeforeParse: () =\> void;

### Example

~~~jsx
gantt.init("gantt_here");
gantt.attachEvent("onBeforeParse", function(){ 
    //место для вашей кастомной логики
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

