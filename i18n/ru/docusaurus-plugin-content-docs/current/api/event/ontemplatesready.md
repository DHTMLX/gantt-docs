---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "срабатывает, когда шаблоны dhtmlxGantt были инициализированы"
---

# onTemplatesReady

### Description

@short: Срабатывает, когда шаблоны dhtmlxGantt были инициализированы

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    //разместите здесь любой пользовательский код
});
~~~

### Details

Это событие сигнализирует о том, что шаблоны dhtmlxGantt полностью инициализированы. Оно служит удобным моментом для настройки кастомного view.

Размещение кода создания кастомного view внутри обработчика события onTemplatesReady гарантирует, что шаблоны view будут готовы до инициализации grid, 
что помогает корректно отобразить кастомный view на странице.
