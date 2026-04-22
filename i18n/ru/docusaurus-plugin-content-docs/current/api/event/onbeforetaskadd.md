---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd событие
description: "срабатывает до добавления новой задачи на диаграмме Ганта"
---

# onBeforeTaskAdd

### Description

@short: Срабатывает до добавления новой задачи на диаграмме Ганта

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //any custom logic here
    return true;
});
~~~

### Details

Событие можно заблокировать. Возвращение false отменяет добавление задачи.

### Related API
- [addTask](api/method/addtask.md)