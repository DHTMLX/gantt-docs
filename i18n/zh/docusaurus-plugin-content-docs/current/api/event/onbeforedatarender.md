---
sidebar_label: onBeforeDataRender
title: onBeforeDataRender event
description: "在数据展示到页面之前触发"
---

# onBeforeDataRender

### Description

@short: 在数据展示到页面之前触发

@signature: onBeforeDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onBeforeDataRender", function(){
    ////这里可以添加任何自定义逻辑
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

