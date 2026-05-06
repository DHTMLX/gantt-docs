---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "当用户创建任务之间的新链接时触发"
---

# onLinkCreated

### Description

@short: 当用户创建任务之间的新链接时触发

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 新链接的对象

### Returns
- ` result` - (boolean) - 返回 `false` 将取消新链接的创建，返回 `true` 将继续默认处理

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件在新链接显示之前触发，允许你**取消链接的创建**。

### Change log
- 在 v6.2.2 中新增