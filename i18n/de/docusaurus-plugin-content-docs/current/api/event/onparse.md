---
sidebar_label: onParse
title: onParse event
description: "Wird ausgelöst, sobald die Daten geparst wurden (und für die API bereitstehen), jedoch bevor sie im Gantt-Chart angezeigt werden."
---

# onParse

### Description

@short: Wird ausgelöst, sobald die Daten geparst wurden (und für die API bereitstehen), jedoch bevor sie im Gantt-Chart angezeigt werden.

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

