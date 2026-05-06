---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady event
description: "Gantt 레이아웃이 준비된 직후에 발생하지만 렌더링되기 전"
---

# onGanttLayoutReady

### Description

@short: Gantt 레이아웃이 준비된 직후에 발생하지만 렌더링되기 전

@signature: onGanttLayoutReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // 여기에 코드 작성
});
~~~