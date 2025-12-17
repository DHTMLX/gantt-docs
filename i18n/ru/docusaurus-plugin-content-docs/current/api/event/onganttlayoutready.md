---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady event
description: "срабатывает один раз, когда layout диаграммы Ганта настроен, но перед его отрисовкой"
---

# onGanttLayoutReady

### Description

@short: Срабатывает один раз, когда layout диаграммы Ганта настроен, но перед его отрисовкой

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // здесь можно добавить любую пользовательскую логику
});
~~~
