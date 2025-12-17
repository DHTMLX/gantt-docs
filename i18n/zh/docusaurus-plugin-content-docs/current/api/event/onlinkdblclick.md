---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "当链接被双击时触发"
---

# onLinkDblClick

### Description

@short: 当链接被双击时触发

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被点击链接的标识符
- `e` - (optional) *Event* - 可选，原生事件对象

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 false 将停止默认动作，即删除该链接。

### Related API
- [onLinkClick](api/event/onlinkclick.md)

