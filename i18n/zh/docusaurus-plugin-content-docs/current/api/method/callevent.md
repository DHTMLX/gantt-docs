---
sidebar_label: callEvent
title: callEvent method
description: "触发一个内部事件"
---

# callEvent

### Description

@short: 触发一个内部事件

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - 事件名称，不区分大小写
- `params` - (optional) *array* - 可选，包含与事件相关数据的数组

### Returns
- ` result` - (boolean) - <i>false</i> 如果任何事件处理程序返回 <i>false</i>，否则返回 <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

通常，事件会自动触发，因此无需手动调用此方法。
