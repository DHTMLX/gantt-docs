---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "вызывается непосредственно перед добавлением новой связи в Gantt диаграмму"
---

# onBeforeLinkAdd

### Description

@short: Вызывается непосредственно перед добавлением новой связи в Gantt диаграмму

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор связи
- `link` - (required) *Link* - объект связи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    //здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит добавление связи.

~~~js
//предотвращает наложение исходной задачи на целевую
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

