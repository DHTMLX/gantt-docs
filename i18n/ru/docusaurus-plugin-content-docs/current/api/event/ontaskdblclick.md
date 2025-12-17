---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "срабатывает при двойном клике на задаче"
---

# onTaskDblClick

### Description

@short: Срабатывает при двойном клике на задаче

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - id задачи, по которой был произведён двойной клик
- `e` - (optional) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться действие по умолчанию (<b>true</b>) или оно должно быть отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно блокировать. Возврат false остановит стандартное поведение, то есть открытие деталей задачи.

### Related API
- [onTaskClick](api/event/ontaskclick.md)

