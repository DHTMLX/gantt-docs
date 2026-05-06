---
sidebar_label: onBeforeLinkDelete
title: Событие onBeforeLinkDelete
description: "Срабатывает перед удалением пользователем ссылки"
---

# onBeforeLinkDelete

### Description

@short: Срабатывает перед удалением пользователем ссылки

@signature: onBeforeLinkDelete: (id: string | number, link: Link) => boolean;

### Parameters

- `id` - (обязательный) *string | number* - идентификатор ссылки
- `link` - (обязательный) *Link* - объект ссылки

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Возвратите false, чтобы отменить удаление ссылки.

### Related API
- [deleteLink](api/method/deletelink.md)