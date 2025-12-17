---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender event
description: "fires before data is rendered on the page"
---

# onBeforeDataRender

### Description

@short: Fires before data is rendered on the page

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    ////any custom logic here
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

