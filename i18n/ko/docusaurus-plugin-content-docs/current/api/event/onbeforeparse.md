---
sidebar_label: onBeforeParse
title: onBeforeParse event
description: "데이터 파싱이 시작되기 직전에 트리거됩니다"
---

# onBeforeParse

### Description

@short: 데이터 파싱이 시작되기 직전에 트리거됩니다

@signature: onBeforeParse: () =\> void;

### Example

~~~jsx
gantt.init("gantt_here");
gantt.attachEvent("onBeforeParse", function(){ 
    // 이곳에 사용자 정의 로직을 추가하세요
});

gantt.parse(demo_tasks);
~~~

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onTaskLoading](api/event/ontaskloading.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

