---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "срабатывает сразу после загрузки задач в Gantt chart, но непосредственно перед их отображением"
---

# onBeforeTaskDisplay

### Description

@short: Срабатывает сразу после загрузки задач в Gantt chart, но непосредственно перед их отображением

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи

### Returns
- ` result` - (boolean) - управляет выполнением действия по умолчанию события: <b>true</b> - действие выполняется, <b>false</b> - действие отменяется

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

Это событие можно заблокировать. Возврат false предотвратит отображение задачи на диаграмме.

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Фильтрация задач](guides/filtering.md)

