---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate 事件
description: "在链接更新前触发"
---

# onBeforeLinkUpdate

### Description

@short: 在更新链接之前触发

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的 id
- `new_link` - (required) *Link* - 链接的新（已更新的）对象

### Returns
- ` result` - (boolean) - 定义事件的默认行为是触发 (<b>true</b>) 还是取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件可被阻塞。返回 false 以取消链接的更新。

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)