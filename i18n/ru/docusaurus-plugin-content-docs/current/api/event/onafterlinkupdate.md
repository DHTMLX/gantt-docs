---
sidebar_label: onAfterLinkUpdate
title: Событие onAfterLinkUpdate
description: "Срабатывает после того, как пользователь обновляет ссылку"
---

# onAfterLinkUpdate

### Description

@short: Срабатывает после того, как пользователь обновляет ссылку

@signature: onAfterLinkUpdate: (id: string | number, link: Link) => void;

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки
- `link` - (required) *Link* - объект ссылки

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // здесь можно разместить пользовательскую логику
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)