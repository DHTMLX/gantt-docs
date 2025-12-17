---
sidebar_label: onLinkClick
title: onLinkClick event
description: "当用户点击链接时触发"
---

# onLinkClick

### Description

@short: 当用户点击链接时触发

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 被点击链接的标识符
- `e` - (optional) *Event* - 可选，原生事件对象

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // 可以在这里添加自定义逻辑
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)

