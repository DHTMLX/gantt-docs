---
sidebar_label: onParse
title: onParse 事件
description: "在数据被解析后（对 API 可用）但在甘特图渲染之前触发"
---

# onParse

### Description

@short: 数据在解析后可供 API 使用，但在甘特图渲染之前触发

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