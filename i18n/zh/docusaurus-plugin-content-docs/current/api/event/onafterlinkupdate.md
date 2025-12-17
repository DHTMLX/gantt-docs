---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "用户修改链接后立即触发"
---

# onAfterLinkUpdate

### Description

@short: 用户修改链接后立即触发

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 链接的唯一标识符
- `link` - (required) *Link* - 更新后的链接对象

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    // 可以在此处放置自定义逻辑
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)

