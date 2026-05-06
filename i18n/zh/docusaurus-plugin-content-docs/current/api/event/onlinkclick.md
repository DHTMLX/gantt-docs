---
sidebar_label: onLinkClick
title: onLinkClick 事件
description: "在用户点击链接时触发"
---

# onLinkClick

### Description

@short: 当用户点击链接时触发

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (必填) *string | number* - 被点击链接的标识符

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)