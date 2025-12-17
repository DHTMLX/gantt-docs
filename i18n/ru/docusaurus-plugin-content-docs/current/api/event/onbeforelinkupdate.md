---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "срабатывает непосредственно перед обновлением линка"
---

# onBeforeLinkUpdate

### Description

@short: Срабатывает непосредственно перед обновлением линка

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор линка
- `new_link` - (required) *Link* - обновлённый объект линка

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться действие по умолчанию события (<b>true</b>) или оно должно быть остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    //здесь можно добавить кастомную логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат false предотвратит обновление линка.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

