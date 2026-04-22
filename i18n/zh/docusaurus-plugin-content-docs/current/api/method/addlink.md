---
sidebar_label: addLink
title: addLink 方法
description: "添加一个新的依赖关系链接"
---

# addLink 方法

### Description

@short: 添加一个新的依赖关系链接

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (必需) *object* - 链接对象

### Returns
- ` id` - (string | number) - 该链接的 id

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

该方法会触发 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 和 [onAfterLinkAdd](api/event/onafterlinkadd.md) 事件。

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)