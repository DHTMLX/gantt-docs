---
sidebar_label: onTaskClick
title: onTaskClick событие
description: "Срабатывает, когда пользователь кликает по строке задачи в области сетки (включая кнопки разворачивания/сворачивания и 'добавить задачу') или по панели задачи на таймлайне"
---

# onTaskClick

### Description

@short: Вызывается, когда пользователь кликает по строке задачи в области сетки (включая кнопки разворачивания/сворачивания и 'добавить задачу') или по панели задачи на таймлайне

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор кликнутой задачи
- `e` - (optional) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно отменить. Возврат false отменит обработчик по умолчанию (выбор задачи)

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)