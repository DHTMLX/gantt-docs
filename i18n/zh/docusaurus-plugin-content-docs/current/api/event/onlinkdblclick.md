---
sidebar_label: onLinkDblClick
title: onLinkDblClick 事件
description: "当用户对链接进行双击时触发"
---

# onLinkDblClick

### Description

@short: 当用户对链接进行双击时触发

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被点击链接的 ID

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发 (<b>true</b>) 或取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻止的。返回 false 将取消默认处理程序（删除链接）

### Related API
- [onLinkClick](api/event/onlinkclick.md)