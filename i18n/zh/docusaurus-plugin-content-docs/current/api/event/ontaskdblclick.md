---
sidebar_label: onTaskDblClick
title: onTaskDblClick event
description: "当任务被双击时触发"
---

# onTaskDblClick

### Description

@short: 当任务被双击时触发

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 被双击任务的ID
- `e` - (optional) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 指示是否继续执行默认事件动作（<b>true</b>）或阻止默认动作（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回false将停止默认行为，即打开任务详情。

### Related API
- [onTaskClick](api/event/ontaskclick.md)

