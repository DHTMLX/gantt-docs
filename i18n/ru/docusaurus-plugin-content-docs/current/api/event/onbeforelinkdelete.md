---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "срабатывает непосредственно перед удалением связи пользователем"
---

# onBeforeLinkDelete

### Description

@short: Срабатывает непосредственно перед удалением связи пользователем

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - идентификатор связи
- `link` - (required) *Link* - объект связи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // здесь можно добавить пользовательскую логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат false остановит удаление связи.

### Related API
- [deleteLink](api/method/deletelink.md)

