---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay событие
description: "срабатывает после загрузки связей в диаграмму Ганта, но до их отображения"
---

# onBeforeLinkDisplay

### Description

@short: Срабатывает после загрузки связей в диаграмму Ганта, но до их отображения

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор связи
- `link` - (required) *Link* - объект связи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (link.type == gantt.config.links.finish_to_start){
        return true;
    }
    return false;
});
~~~

### Details

Событие можно заблокировать. Возврат false предотвратит отображение связи

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)