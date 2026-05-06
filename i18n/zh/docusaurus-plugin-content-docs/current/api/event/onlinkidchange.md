---
sidebar_label: onLinkIdChange
title: onLinkIdChange 事件
description: "当链接的 id 发生变化时触发"
---

# onLinkIdChange

### Description

@short: 当链接的 id 发生变化时触发

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 当前链接的 id
- `new_id` - (required) *string | number* - 新的链接 id

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)