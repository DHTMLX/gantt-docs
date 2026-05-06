---
sidebar_label: onAfterTaskAdd
title: Событие onAfterTaskAdd
description: "Срабатывает после того, как пользователь добавляет задачу на диаграмме Ганта"
---

# onAfterTaskAdd

### Description

@short: Срабатывает после того, как пользователь добавляет задачу на диаграмме Ганта

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //любой кастомный код здесь
});
~~~

### Related API
- [addTask](api/method/addtask.md)