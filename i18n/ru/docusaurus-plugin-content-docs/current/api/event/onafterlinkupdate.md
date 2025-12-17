---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "срабатывает сразу после того, как пользователь изменяет ссылку"
---

# onAfterLinkUpdate

### Description

@short: Срабатывает сразу после того, как пользователь изменяет ссылку

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - уникальный идентификатор ссылки
- `link` - (required) *Link* - обновлённый объект ссылки

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // здесь можно разместить пользовательскую логику
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)

