---
sidebar_label: onParse
title: onParse event
description: "срабатывает после того, как данные были распарсены (готовы для API), но до того, как они отображаются в Gantt chart"
---

# onParse

### Description

@short: Срабатывает после того, как данные были распарсены (готовы для API), но до того, как они отображаются в Gantt chart

@signature: onParse: () =\> void;

### Example

~~~jsx
gantt.init("gantt_here");
gantt.attachEvent("onParse", function(){alert("Данные были распарсены")});

gantt.parse(demo_tasks);
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

