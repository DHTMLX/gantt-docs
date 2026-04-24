---
sidebar_label: deleteLink
title: Метод deleteLink
description: "удаляет указанную зависимую связь"
---

# deleteLink

### Description

@short: Удаляет указанную зависимую связь

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки зависимости

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.deleteLink(1); /*!*/
~~~

### Details

Метод вызывает события [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) и [onAfterLinkDelete](api/event/onafterlinkdelete.md).

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)