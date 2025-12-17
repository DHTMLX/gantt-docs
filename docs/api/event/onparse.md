---
sidebar_label: onParse
title: onParse event
description: "fires after data was parsed (became available for API) but before it was rendered in the Gantt chart"
---

# onParse

### Description

@short: Fires after data was parsed (became available for API) but before it was rendered in the Gantt chart

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

