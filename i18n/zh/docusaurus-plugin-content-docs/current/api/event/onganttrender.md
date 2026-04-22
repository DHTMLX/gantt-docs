---
sidebar_label: onGanttRender
title: onGanttRender 事件
description: "在页面上渲染完成甘特图后触发"
---

# onGanttRender

### Description

@short: 在页面上甘特图渲染完成后触发

@signature: onGanttRender: () => void;

### Example

~~~jsx
gantt.attachEvent("onGanttRender", function(){
    alert("甘特图已在页面上完全渲染完成...")
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