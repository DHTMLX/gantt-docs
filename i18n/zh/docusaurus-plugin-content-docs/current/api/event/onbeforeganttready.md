---
sidebar_label: onBeforeGanttReady
title: onBeforeGanttReady 事件
description: "在开始 dhtmlxGantt 初始化之前触发"
---

# onBeforeGanttReady

### Description

@short: 在开始 dhtmlxGantt 初始化之前触发

@signature: onBeforeGanttReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttReady", function(){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [onGanttReady](api/event/onganttready.md)