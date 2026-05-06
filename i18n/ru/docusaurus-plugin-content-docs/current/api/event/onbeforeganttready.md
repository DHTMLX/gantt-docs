---
sidebar_label: onBeforeGanttReady
title: событие onBeforeGanttReady
description: "Срабатывает до начала инициализации dhtmlxGantt"
---

# onBeforeGanttReady

### Description

@short: Срабатывает до начала инициализации dhtmlxGantt

@signature: onBeforeGanttReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onBeforeGanttReady", function(){
    // любая ваша логика здесь
});
~~~

### Related API
- [onGanttReady](api/event/onganttready.md)