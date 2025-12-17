---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "当用户在任务之间建立新连接时触发"
---

# onLinkCreated

### Description

@short: 当用户在任务之间建立新连接时触发

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 新创建的链接对象

### Returns
- ` result` - (boolean) - 返回 `false` 会阻止新链接的创建，返回 `true` 则允许默认操作继续执行

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // 你的代码
    return true;
});
~~~

### Details

此事件发生在新链接显示之前，提供了**阻止链接被创建**的选项。

### Change log
- v6.2.2 中新增
