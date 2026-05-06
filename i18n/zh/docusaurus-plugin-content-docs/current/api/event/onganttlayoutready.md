---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady 事件
description: "在 Gantt 布局就绪后，但在渲染之前触发"
---

# onGanttLayoutReady

### Description

@short: 在 Gantt 布局就绪后，但在渲染之前触发

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // 在这里插入您的自定义逻辑 
});
~~~