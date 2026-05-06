---
sidebar_label: onParse
title: Событие onParse
description: "Срабатывает после разбора данных (данные стали доступны через API), но до их отрисовки на диаграмме Ганта"
---

# onParse

### Description

@short: Срабатывает после разбора данных (данные стали доступны через API), но до их отрисовки на диаграмме Ганта

@signature: onParse: () =\> void;

### Example

~~~jsx
gantt.init("gantt_here");
gantt.attachEvent("onParse", function(){alert("Data was parsed")});

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