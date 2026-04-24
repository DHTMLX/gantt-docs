---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate событие
description: "Срабатывает до обновления ссылки"
---

# onBeforeLinkUpdate

### Description

@short: Срабатывает до обновления ссылки

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) => boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки
- `new_link` - (required) *Link* - новый (обновленный) объект ссылки

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно блокировать. Возвратите false, чтобы отменить обновление ссылки.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)