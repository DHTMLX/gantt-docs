---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "срабатывает при обновлении id ссылки"
---

# onLinkIdChange

### Description

@short: Срабатывает при обновлении id ссылки

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - существующий id ссылки
- `new_id` - (required) *string | number* - обновлённый id ссылки

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //любая ваша логика здесь
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)

