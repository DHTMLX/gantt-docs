---
sidebar_label: onAfterTaskAdd
title: onAfterTaskAdd event
description: "срабатывает сразу после добавления задачи в Gantt chart"
---

# onAfterTaskAdd

### Description

@short: Срабатывает сразу после добавления задачи в Gantt chart

@signature: onAfterTaskAdd: (id: string | number, task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - ID задачи
- `task` - (required) *Task* - объект задачи

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //любой кастомный код здесь
});
~~~

### Related API
- [addTask](api/method/addtask.md)

