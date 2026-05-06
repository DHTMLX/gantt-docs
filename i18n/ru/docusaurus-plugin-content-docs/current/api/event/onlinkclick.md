---
sidebar_label: onLinkClick
title: Событие onLinkClick
description: "срабатывает, когда пользователь кликает по ссылке"
---

# onLinkClick

### Description

@short: Срабатывает, когда пользователь кликает по ссылке

@signature: onLinkClick: (id: string | number, e?: Event) => void;

### Parameters

- `id` - (required) *string | number* - идентификатор нажатой ссылки

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // любая ваша логика здесь
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)