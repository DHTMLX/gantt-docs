---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "удаляет все события из dhtmlxGantt (включая как пользовательские, так и встроенные)"
---

# detachAllEvents

### Description

@short: Удаляет все события из dhtmlxGantt (включая как пользовательские, так и встроенные)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Вы только что кликнули на элемент с id="+id);
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("Вы только что сделали двойной клик по элементу с id="+id);
});

gantt.detachAllEvents();
~~~

### Details

Имейте в виду, что метод **detachAllEvents** может нарушить работу dhtmlxGantt, так как он удаляет все обработчики событий сразу - как те, что добавлены пользовательским кодом, так и те, что используются внутри dhtmlxGantt для связи различных функций.

Лучше сохранять ID, возвращаемые методом [attachEvent](api/method/attachevent.md), а затем использовать [detachEvent](api/method/detachevent.md) для удаления конкретных событий по мере необходимости, как показано в примере выше.

<br>
:::note
 Метод **detachAllEvents** устарел. Вместо него рекомендуется использовать: 
:::

~~~
// сохраняем id обработчиков при прикреплении событий
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Вы только что кликнули на элемент с id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("Вы только что сделали двойной клик по элементу с id="+id);
});

// отключаем все сохранённые события
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

