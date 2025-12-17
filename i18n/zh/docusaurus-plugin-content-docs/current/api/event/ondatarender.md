---
sidebar_label: onDataRender
title: onDataRender event
description: "数据在页面上显示后立即触发"
---

# onDataRender

### Description

@short: 数据在页面上显示后立即触发

@signature: onDataRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDataRender", function(){
    alert("数据已在页面上渲染完成")
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

