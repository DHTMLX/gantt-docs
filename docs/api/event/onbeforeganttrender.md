---
sidebar_label: onBeforeGanttRender
title: onBeforeGanttRender event
description: "fires before the Gantt chart is rendered on the page"
---

# onBeforeGanttRender

### Description

@short: Fires before the Gantt chart is rendered on the page

@signature: onBeforeGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttRender", function(){
    //any custom logic here
});
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

