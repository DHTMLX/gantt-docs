---
sidebar_label: deleteLink
title: deleteLink method
description: "移除指定的依赖链接"
---

# deleteLink

### Description

@short: 移除指定的依赖链接

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    依赖链接的ID

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

此方法会触发 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 和 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 事件。

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [添加/更新/删除链接](guides/crud-dependency.md)

