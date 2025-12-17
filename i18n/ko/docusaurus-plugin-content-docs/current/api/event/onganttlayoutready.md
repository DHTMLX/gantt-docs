---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady event
description: "Gantt 레이아웃이 설정된 직후, 렌더링되기 바로 전에 트리거됩니다"
---

# onGanttLayoutReady

### Description

@short: Gantt 레이아웃이 설정된 직후, 렌더링되기 바로 전에 트리거됩니다

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // 여기에 커스텀 로직 작성
});
~~~
