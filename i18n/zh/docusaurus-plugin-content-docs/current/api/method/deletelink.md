---
sidebar_label: deleteLink
title: deleteLink method
description: "删除指定的依赖链接"
---

# deleteLink

### Description

@short: 删除指定的依赖链接

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - 该依赖链接的 ID

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

该方法会触发 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 与 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 事件。

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)