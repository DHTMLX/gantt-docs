---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender event
description: "Wird ausgelöst, kurz bevor die Daten auf der Seite angezeigt werden"
---

# onBeforeDataRender

### Description

@short: Wird ausgelöst, kurz bevor die Daten auf der Seite angezeigt werden

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    ////beliebige benutzerdefinierte Logik hier
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

