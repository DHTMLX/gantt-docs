---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "当链接的 id 更新时触发"
---

# onLinkIdChange

### Description

@short: 当链接的 id 更新时触发

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 现有的链接 id
- `new_id` - (required) *string | number* - 更新后的链接 id

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //这里编写自定义逻辑
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)

