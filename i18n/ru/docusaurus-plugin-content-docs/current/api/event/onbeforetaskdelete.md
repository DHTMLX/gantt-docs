--- 
sidebar_label: onBeforeTaskDelete
title: onBeforeTaskDelete event
description: "Срабатывает до того, как пользователь удалит задачу"
---

# onBeforeTaskDelete

### Description

@short: Срабатывает до того, как пользователь удалит задачу

@signature: onBeforeTaskDelete: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDelete", function(id,task){
    //любая пользовательская логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Возвращайте false, чтобы отменить удаление задачи.

### Related API
- [deleteTask](api/method/deletetask.md)