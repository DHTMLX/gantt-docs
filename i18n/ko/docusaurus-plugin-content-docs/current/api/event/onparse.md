---
sidebar_label: onParse
title: onParse event
description: "데이터가 파싱된 직후(API에서 사용할 수 있게 된 상태이지만) Gantt 차트에 렌더링되기 전"
---

# onParse

### Description

@short: 데이터를 파싱한 직후(API에서 사용할 수 있게 된 상태이지만) Gantt 차트에 렌더링되기 전

@signature: onParse: () => void;

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