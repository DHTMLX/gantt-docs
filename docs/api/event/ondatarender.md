---
sidebar_label: onDataRender
title: onDataRender event
description: "fires after data has been rendered on the page"
---

# onDataRender

### Description

@short: Fires after data has been rendered on the page

@signature: onDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDataRender", function(){
    alert("Data was rendered on the page")
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

