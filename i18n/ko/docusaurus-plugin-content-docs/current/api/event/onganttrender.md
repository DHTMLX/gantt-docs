---
sidebar_label: onGanttRender
title: onGanttRender event
description: "간트 차트가 페이지에 완전히 렌더링된 후 발생합니다."
---

# onGanttRender

### Description

@short: 간트 차트가 페이지에 완전히 렌더링된 후 발생합니다.

@signature: onGanttRender: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttRender", function(){
    alert("간트 차트가 페이지에 완전히 렌더링되었습니다.")
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

