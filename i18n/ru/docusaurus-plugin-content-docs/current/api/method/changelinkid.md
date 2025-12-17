---
sidebar_label: changeLinkId
title: changeLinkId method
description: "обновляет id связи"
---

# changeLinkId

### Description

@short: Обновляет id связи

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    текущий id связи
- `new_id` - (required) *string| number* -     новый id связи

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //обновляет id связи с '1' на '5' /*!*/
~~~

### Details

Этот метод вызывает событие [onLinkIdChange](api/event/onlinkidchange.md).

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)

