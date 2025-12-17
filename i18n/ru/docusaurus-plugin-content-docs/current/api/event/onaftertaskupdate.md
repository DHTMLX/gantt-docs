---
sidebar_label: onAfterTaskUpdate
title: onAfterTaskUpdate event
description: "срабатывает сразу после того, как пользователь обновляет задачу"
---

# onAfterTaskUpdate

### Description

@short: Срабатывает сразу после того, как пользователь обновляет задачу

@signature: onAfterTaskUpdate: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - id задачи
- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //любая ваша логика здесь
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [onBeforeTaskUpdate](api/event/onbeforetaskupdate.md)

