---
sidebar_label: onGanttReady
title: onGanttReady event
description: "当 dhtmlxGantt 完成初始化时触发，尽管甘特图本身尚未显示在页面上"
---

# onGanttReady

### Description

@short: 当 dhtmlxGantt 完成初始化时触发，尽管甘特图本身尚未显示在页面上

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // 可以在这里放置自定义逻辑
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)

