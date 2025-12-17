---
sidebar_label: onTaskClick
title: onTaskClick event
description: "Срабатывает, когда пользователь кликает на строку задачи в области grid (включая кнопки 'expand/collapse' и 'add task') или на task bar в области timeline."
---

# onTaskClick

### Description

@short: Срабатывает, когда пользователь кликает на строку задачи в области grid (включая кнопки 'expand/collapse' и 'add task') или на task bar в области timeline.

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - id кликнутой задачи
- `e` - (optional) *Event* - опционально, нативный объект события

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    //любая кастомная логика здесь
    return true;
});
~~~

### Details

Это событие можно блокировать. Возврат false остановит поведение по умолчанию (выделение задачи).

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)

