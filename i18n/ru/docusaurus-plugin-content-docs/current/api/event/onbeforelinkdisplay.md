---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "срабатывает после загрузки связей в Gantt chart, но непосредственно перед их отображением на экране"
---

# onBeforeLinkDisplay

### Description

@short: Срабатывает после загрузки связей в Gantt chart, но непосредственно перед их отображением на экране

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - уникальный идентификатор связи
- `link` - (required) *Link* - объект связи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

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

Это событие можно блокировать. Возврат false предотвращает отображение связи.

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)

