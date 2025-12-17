---
sidebar_label: checkEvent
title: checkEvent method
description: "验证是否有处理程序分配给指定事件"
---

# checkEvent

### Description

@short: 验证是否有处理程序分配给指定事件

@signature: checkEvent: (name: string) =\> boolean

### Parameters

- `name` - (required) *string* - 事件的名称

### Returns
- ` isExist` - (boolean) - 如果至少有一个处理程序设置在该事件上，则返回 <i>true</i>

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("你刚刚点击了id为="+id+"的项目");
});
       
gantt.checkEvent("onTaskClick"); //返回 'true'
~~~

### Related API
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [事件处理](guides/handling-events.md)

