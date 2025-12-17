---
sidebar_label: addLink
title: addLink method
description: "добавляет новую зависимость (link)"
---

# addLink

### Description

@short: Добавляет новую зависимость (link)

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (required) *object* - объект ссылки (link)

### Returns
- ` id` - (string | number) - идентификатор (id) ссылки

### Example

~~~jsx
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:gantt.config.links.finish_to_start
});
~~~

### Details

Этот метод вызывает события [onBeforeLinkAdd](api/event/onbeforelinkadd.md) и [onAfterLinkAdd](api/event/onafterlinkadd.md).

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Добавление, обновление и удаление связей](guides/crud-dependency.md)

