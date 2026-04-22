---
sidebar_label: onTaskClick
title: onTaskClick 事件
description: "当用户在网格区域点击任务行（包括“展开/折叠”和“添加任务”按钮）或在时间轴区域点击任务条时触发"
---

# onTaskClick

### Description

@short: 当用户在网格区域点击任务行时触发（包括“展开/折叠”和“添加任务”按钮）或在时间轴区域点击任务条时触发

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被单击任务的 ID
- `e` - (optional) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 定义事件默认操作是否会被触发（<b>true</b>）还是被取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻止的。返回 false 将取消默认处理程序（选择任务）

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)