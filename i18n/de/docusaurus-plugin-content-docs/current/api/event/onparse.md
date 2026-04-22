---
sidebar_label: onParse
title: onParse event
description: "Wird ausgelöst, nachdem die Daten geparst wurden (für die API verfügbar geworden sind), aber bevor sie im Gantt-Diagramm gerendert werden"
---

# onParse

### Description

@short: Wird ausgelöst, nachdem die Daten geparst wurden (für die API verfügbar geworden sind), aber bevor sie im Gantt-Diagramm gerendert werden

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