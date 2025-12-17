---
sidebar_label: addLink
title: addLink method
description: "添加一个新的依赖链接"
---

# addLink

### Description

@short: 添加一个新的依赖链接

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (required) *object* - 链接对象

### Returns
- ` id` - (string | number) - 链接的ID

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

此方法会触发 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 和 [onAfterLinkAdd](api/event/onafterlinkadd.md) 事件。

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [添加/更新/删除链接](guides/crud-dependency.md)

