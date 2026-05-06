---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "Отсоединяет все события из dhtmlxGantt (как пользовательские, так и внутренние)"
---

# detachAllEvents

### Description

@short: Отсоединяет все события из dhtmlxGantt (как пользовательские, так и внутренние)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
});

gantt.detachAllEvents();
~~~

### Details

Примечание: использование метода **detachAllEvents** может нарушить функциональность dhtmlxGantt, так как он удаляет ВСЕ обработчики событий сразу: как те, что определены пользовательской логикой, так и те, что определены самим dhtmlxGantt (для связывания различных частей и функций). 

Безопаснее сохранить результат вызова метода [attachEvent](api/method/attachevent.md) и использовать метод [detachEvent](api/method/detachevent.md) для отсоединения сохранённых событий по мере необходимости, как показано выше.


:::note
Метод **detachAllEvents** устарел. Вместо него можно использовать:
:::

~~~js
// сохраняем id обработчиков при прикреплении событий
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("You've just double clicked an item with id="+id);
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