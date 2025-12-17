---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete event
description: "当用户删除链接后立即触发"
---

# onAfterLinkDelete

### Description

@short: 当用户删除链接后立即触发

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 链接的ID
- `link` - (required) *Link* - 链接对象本身

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // 可以在这里添加自定义逻辑
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)

