---
sidebar_label: onTaskClick
title: onTaskClick event
description: "当用户点击网格区域中的任务行（包括'展开/折叠'和'添加任务'按钮）或时间轴区域内的任务条时触发。"
---

# onTaskClick

### Description

@short: 当用户点击网格区域中的任务行（包括"展开/折叠"和"添加任务"按钮）或时间轴区域内的任务条时触发。

@signature: onTaskClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 被点击任务的id
- `e` - (optional) *Event* - 可选，原生事件对象

### Returns
- ` result` - (boolean) - 表示事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id,e){
    //这里写自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回false将阻止默认行为（即选择任务）。

### Related API
- [onTaskDblClick](api/event/ontaskdblclick.md)

