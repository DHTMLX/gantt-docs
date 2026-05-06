---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "在链接加载到甘特图后但在显示之前触发"
---

# onBeforeLinkDisplay

### Description

@short: 在甘特图已加载链接后但在显示之前触发

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的标识符
- `link` - (required) *Link* - 链接对象

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否将被触发 (<b>true</b>) 还是取消 (<b>false</b>)

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

该事件是可阻塞的。返回 false 将阻止链接显示

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)