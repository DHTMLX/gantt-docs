---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "在链接更新之前触发"
---

# onBeforeLinkUpdate

### Description

@short: 在链接更新之前触发

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的ID
- `new_link` - (required) *Link* - 更新后的链接对象

### Returns
- ` result` - (boolean) - 指示事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回false将防止链接被更新。

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

