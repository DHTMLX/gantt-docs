---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "在链接加载到甘特图中后、但显示到屏幕上之前触发"
---

# onBeforeLinkDisplay

### Description

@short: 在链接加载到甘特图中后、但显示到屏幕上之前触发

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的唯一标识符
- `link` - (required) *Link* - 链接对象本身

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (link.type == gantt.config.links.finish_to_start){
        return true;
    }
    return false;
});
~~~

### Details

此事件可以被阻止。返回 false 会阻止该链接显示。

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)

