---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "Срабатывает, когда шаблоны dhtmlxGantt инициализируются"
---

# onTemplatesReady

### Description

@short: Срабатывает, когда шаблоны dhtmlxGantt инициализируются

@signature: onTemplatesReady: () => void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    // любая ваша логика здесь
});
~~~

### Details

Событие информирует, что шаблоны dhtmlxGantt готовы. Это хорошая точка для создания пользовательского вида.

Хорошей практикой является писать код создания пользовательского вида в обработчике события onTemplatesReady. Это гарантирует, что шаблоны пользовательского вида будут готовы до инициализации grid, и пользовательский вид будет корректно отрисован на странице.