---
sidebar_label: checkEvent
title: checkEvent method
description: "проверяет, назначены ли обработчики для указанного события"
---

# checkEvent

### Description

@short: Проверяет, назначены ли обработчики для указанного события

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - имя события

### Returns
- ` isExist` - (boolean) - возвращает <i>true</i>, если для события установлен хотя бы один обработчик

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("Вы только что кликнули на элемент с id="+id);
});
       
gantt.checkEvent("onTaskClick"); //возвращает 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Обработка событий](guides/handling-events.md)

