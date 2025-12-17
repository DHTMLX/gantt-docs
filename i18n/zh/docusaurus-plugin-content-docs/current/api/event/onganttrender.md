---
sidebar_label: onGanttRender
title: onGanttRender event
description: "当甘特图在页面上完成渲染时触发"
---

# onGanttRender

### Description

@short: 当甘特图在页面上完成渲染时触发

@signature: onGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttRender", function(){
    alert("甘特图已在页面上完全渲染。")
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

