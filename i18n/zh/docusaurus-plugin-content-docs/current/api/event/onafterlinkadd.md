---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "在将新链接添加到甘特图后触发"
---

# onAfterLinkAdd

### Description

@short: 在将新链接添加到甘特图后触发

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 该链接的 ID
- `link` - (required) *Link* - 该 Link 对象

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [addLink](api/method/addlink.md)