---
sidebar_label: onGanttLayoutReady
title: onGanttLayoutReady событие
description: "срабатывает после того, как макет диаграммы Ганта готов, но до его отрисовки"
---

# onGanttLayoutReady

### Description

@short: Срабатывает после того, как макет диаграммы Ганта готов, но до его отрисовки

@signature: onGanttLayoutReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttLayoutReady",function(){
    // любая ваша логика здесь
});
~~~