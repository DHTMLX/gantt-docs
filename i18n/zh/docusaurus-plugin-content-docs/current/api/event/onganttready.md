---
sidebar_label: onGanttReady
title: onGanttReady 事件
description: "在 dhtmlxGantt 初始化完成后，Gantt 图尚未在页面上呈现"
---

# onGanttReady

### Description

@short: 在 dhtmlxGantt 初始化完成后触发，但 Gantt 图尚未在页面上呈现

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)