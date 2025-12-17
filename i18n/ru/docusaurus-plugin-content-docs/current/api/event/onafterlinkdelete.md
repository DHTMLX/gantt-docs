---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete event
description: "срабатывает сразу после того, как пользователь удаляет связь"
---

# onAfterLinkDelete

### Description

@short: Срабатывает сразу после того, как пользователь удаляет связь

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - id связи
- `link` - (required) *Link* - объект связи

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // здесь может быть ваша пользовательская логика
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)

