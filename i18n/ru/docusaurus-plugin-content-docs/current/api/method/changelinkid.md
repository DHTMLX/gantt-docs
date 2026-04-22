---
sidebar_label: changeLinkId
title: changeLinkId method
description: "Изменяет id ссылки"
---

# changeLinkId

### Description

@short: Изменяет id ссылки

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    текущий id ссылки
- `new_id` - (required) *string | number* -    новый id ссылки

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //changes the link's id '1 -> 5' /*!*/
~~~

### Details

Метод инициирует событие [onLinkIdChange](api/event/onlinkidchange.md).

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)