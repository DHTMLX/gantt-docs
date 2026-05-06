---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete 事件
description: "在用户删除链接后触发"
---

# onAfterLinkDelete

### Description

@short: 用户在删除链接后触发

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 链接的 ID
- `link` - (required) *Link* - 链接对象

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)