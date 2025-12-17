---
sidebar_label: onParse
title: onParse event
description: "데이터가 파싱되어 API 준비가 완료된 시점에 트리거되며, Gantt 차트에 표시되기 전 이벤트입니다."
---

# onParse

### Description

@short: 데이터가 파싱되어 API 준비가 완료된 시점에 트리거되며, Gantt 차트에 표시되기 전 이벤트입니다.

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

