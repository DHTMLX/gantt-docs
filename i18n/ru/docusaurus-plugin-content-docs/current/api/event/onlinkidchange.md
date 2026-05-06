---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "срабатывает, когда изменяется идентификатор ссылки"
---

# onLinkIdChange

### Description

@short: Срабатывает при изменении идентификатора ссылки

@signature: onLinkIdChange: (id: string | number, new_id: string | number) => void;

### Parameters

- `id` - (required) *string | number* - текущий идентификатор ссылки
- `new_id` - (required) *string | number* - новый идентификатор ссылки

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    // любая ваша логика здесь
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)