---
sidebar_label: onAfterTaskDelete
title: onAfterTaskDelete event
description: "срабатывает сразу после того, как пользователь удаляет задачу"
---

# onAfterTaskDelete

### Description

@short: Срабатывает сразу после того, как пользователь удаляет задачу

@signature: onAfterTaskDelete: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - ID задачи
- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDelete", function(id,task){
    // здесь можно добавить пользовательскую логику
});
~~~

### Related API
- [deleteTask](api/method/deletetask.md)

