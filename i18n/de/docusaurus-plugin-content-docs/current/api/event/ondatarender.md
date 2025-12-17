---
sidebar_label: onDataRender
title: onDataRender event
description: "Wird ausgelöst, unmittelbar nachdem die Daten auf der Seite angezeigt wurden"
---

# onDataRender

### Description

@short: Wird ausgelöst, unmittelbar nachdem die Daten auf der Seite angezeigt wurden

@signature: onDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDataRender", function(){
    alert("Daten wurden auf der Seite dargestellt")
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

