---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "在甘特图中添加新链接后立即触发"
---

# onAfterLinkAdd

### Description

@short: 在甘特图中添加新链接后立即触发

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 链接的ID
- `link` - (required) *Link* - 链接对象本身

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //在这里放置任何自定义逻辑
});
~~~

### Related API
- [addLink](api/method/addlink.md)

