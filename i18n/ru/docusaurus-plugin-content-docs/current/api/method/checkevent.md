---
sidebar_label: checkEvent
title: Метод checkEvent
description: "Проверяет, есть ли у события указанные обработчики"
---

# checkEvent

### Description

@short: Проверяет, есть ли у события указанные обработчики

@signature: checkEvent: (name: string) => boolean

### Parameters

- `name` - (обязательное) *string* - имя события

### Returns
- ` isExist` - (boolean) - возвращает <i>true</i>, если для события указан обработчик(-и)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); //returns 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)