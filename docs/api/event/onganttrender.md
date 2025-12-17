---
sidebar_label: onGanttRender
title: onGanttRender event
description: "fires after the Gantt chart was rendered on the page"
---

# onGanttRender

### Description

@short: Fires after the Gantt chart was rendered on the page

@signature: onGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttRender", function(){
    alert("Gantt chart is completely rendered on the page...")
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onLoadEnd](api/event/onloadend.md)

