---
sidebar_label: onBeforeTaskAdd
title: onBeforeTaskAdd event
description: "срабатывает непосредственно перед добавлением новой задачи в Gantt chart"
---

# onBeforeTaskAdd

### Description

@short: Срабатывает непосредственно перед добавлением новой задачи в Gantt chart

@signature: onBeforeTaskAdd: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - ID задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, должно ли выполняться стандартное действие события (<b>true</b>) или быть остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAdd", function(id,task){
    //любая кастомная логика здесь
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит добавление задачи.

### Related API
- [addTask](api/method/addtask.md)

