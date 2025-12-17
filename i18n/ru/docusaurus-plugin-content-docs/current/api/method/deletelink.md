---
sidebar_label: deleteLink
title: deleteLink method
description: "удаляет указанный dependency link"
---

# deleteLink

### Description

@short: Удаляет указанный dependency link

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    идентификатор dependency link

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

Этот метод вызывает события [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) и [onAfterLinkDelete](api/event/onafterlinkdelete.md).

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Добавление, обновление и удаление связей](guides/crud-dependency.md)

