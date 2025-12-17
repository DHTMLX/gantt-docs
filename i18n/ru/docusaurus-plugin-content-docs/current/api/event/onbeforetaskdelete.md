---
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "срабатывает непосредственно перед удалением задачи пользователем"
---

# onBeforeTaskDelete

### Description

@short: Срабатывает непосредственно перед удалением задачи пользователем

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    // здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат false предотвратит удаление задачи.

### Related API
- [deleteTask](api/method/deletetask.md)

