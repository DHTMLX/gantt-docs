---
sidebar_label: onGanttReady
title: onGanttReady event
description: "срабатывает, когда dhtmlxGantt завершил инициализацию, хотя сам Gantt chart ещё не отображён на странице"
---

# onGanttReady

### Description

@short: Срабатывает, когда dhtmlxGantt завершил инициализацию, хотя сам Gantt chart ещё не отображён на странице

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    //здесь можно разместить кастомную логику
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)

