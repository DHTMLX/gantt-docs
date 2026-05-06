---
sidebar_label: addLink
title: метод addLink
description: "добавляет новую зависимую связь"
---

# addLink

### Description

@short: Добавляет новую зависимую связь

@signature: addLink: (link: any) => string | number

### Parameters

- `link` - (required) *объект* - объект ссылки

### Returns
- ` id` - (string | number) - идентификатор ссылки

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

Метод вызывает события [onBeforeLinkAdd](api/event/onbeforelinkadd.md) и [onAfterLinkAdd](api/event/onafterlinkadd.md).

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)