---
sidebar_label: checkEvent
title: checkEvent method
description: "检查事件是否已指定一个或多个处理程序"
---

# checkEvent

### Description

@short: 检查事件是否已指定一个或多个处理程序

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (必填) *string* - 事件的名称

### Returns
- `isExist` - (boolean) - 返回 <i>true</i>，如果为事件指定了一个或多个处理程序

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("You've just clicked an item with id="+id);
});
       
gantt.checkEvent("onTaskClick"); //返回 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)