---
sidebar_label: callEvent
title: callEvent 方法
description: "调用一个内部事件"
---

# callEvent

### Description

@short: 调用内部事件

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - 事件的名称，忽略大小写
- `params` - (optional) *array* - 包含事件相关数据的数组

### Returns
- ` result` - (boolean) - <i>false</i>，如果某些事件处理程序返回 <i>false</i>，否则返回 <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

通常情况下，事件会被自动调用，您不需要使用此方法。