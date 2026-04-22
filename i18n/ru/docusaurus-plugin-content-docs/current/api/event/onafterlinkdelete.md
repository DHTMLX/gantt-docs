---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete событие
description: "срабатывает после того, как пользователь удаляет ссылку"
---

# onAfterLinkDelete

### Description

@short: Срабатывает после того, как пользователь удаляет ссылку

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - id ссылки
- `link` - (required) *Link* - объект ссылки

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // здесь может быть ваша пользовательская логика
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)