---
sidebar_label: onTaskDblClick
title: onTaskDblClick 事件
description: "当用户对任务进行双击时触发"
---

# onTaskDblClick

### Description

@short: 当用户对任务进行双击时触发

@signature: onTaskDblClick: (id: string, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - 双击的任务的 ID

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskDblClick", function(id,e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻塞的。返回 false 将取消默认处理程序（打开任务详情）

### Related API
- [onTaskClick](api/event/ontaskclick.md)