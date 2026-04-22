---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete 事件
description: "在用户删除链接之前触发"
---

# onBeforeLinkDelete

### Description

@short: 在用户删除链接之前触发

@signature: onBeforeLinkDelete: (id: string | number, link: Link) => boolean;

### Parameters

- `id` - (required) *string | number* - 链接 ID
- `link` - (required) *Link* - 链接对象

### Returns
- ` result` - (boolean) - 定义事件的默认动作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻塞的。返回 false 以取消删除该链接。

### Related API
- [deleteLink](api/method/deletelink.md)