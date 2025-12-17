---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "在用户删除链接之前触发"
---

# onBeforeLinkDelete

### Description

@short: 在用户删除链接之前触发

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的标识符
- `link` - (required) *Link* - 链接对象本身

### Returns
- ` result` - (boolean) - 决定是否继续执行默认事件操作（<b>true</b>）或取消操作（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 false 将阻止链接被删除。

### Related API
- [deleteLink](api/method/deletelink.md)

