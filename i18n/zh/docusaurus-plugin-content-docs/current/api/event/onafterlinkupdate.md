---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate 事件
description: "在用户更新链接后触发"
---

# onAfterLinkUpdate

### Description

@short: 在用户更新链接后触发

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 链接 ID
- `link` - (required) *Link* - 链接对象

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)