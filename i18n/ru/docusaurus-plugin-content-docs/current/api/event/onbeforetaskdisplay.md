---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "срабатывает после загрузки задач на диаграмму Ганта, но до их отображения"
---

# onBeforeTaskDisplay

### Description

@short: Срабатывает после загрузки задач на диаграмму Ганта, но до их отображения

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

### Details

Событие можно блокировать. Возврат false предотвратит отображение задачи

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Filtering Tasks](guides/filtering.md)