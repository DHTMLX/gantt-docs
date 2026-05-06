---
sidebar_label: onGanttReady
title: onGanttReady событие
description: "срабатывает после завершения инициализации dhtmlxGantt, однако диаграмма Ганта ещё не отрисована на странице"
---

# onGanttReady

### Description

@short: Срабатывает после завершения инициализации dhtmlxGantt, однако диаграмма Ганта ещё не отрисована на странице

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // любая ваша логика здесь
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)