---
sidebar_label: onLinkClick
title: onLinkClick event
description: "срабатывает при клике пользователя по ссылке"
---

# onLinkClick

### Description

@short: Срабатывает при клике пользователя по ссылке

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки, по которой был произведён клик
- `e` - (required) *Event* - необязательный параметр, объект нативного события

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // здесь можно добавить пользовательскую логику
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)

