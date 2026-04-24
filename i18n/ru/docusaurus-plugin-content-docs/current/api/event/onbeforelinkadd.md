---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "Срабатывает перед добавлением новой связи в диаграмму Гanttта"
---

# onBeforeLinkAdd

### Description

@short: Срабатывает перед добавлением новой связи в диаграмму Гanttта

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (обязателен) *string | number* - идентификатор связи
- `link` - (обязателен) *Link* - объект связи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Верните *false*, чтобы отменить добавление связи.

~~~js
//исключает preferably перетягивание целевой задачи источником
//при создании связей типа "finish_to_start"
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("This link is illegal")
            return false;
        }
    }
});
~~~

### Related API
- [addLink](api/method/addlink.md)