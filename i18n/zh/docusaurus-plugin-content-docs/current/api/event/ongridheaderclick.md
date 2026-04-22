---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "当用户点击 grid 表头时触发"
---

# onGridHeaderClick

### Description

@short: 当用户单击网格的表头时触发

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - 用户单击的列头所对应的 name 属性
- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` result` - (boolean) - 定义事件的默认动作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

返回 false 将取消默认处理程序（在点击“+”按钮添加新任务或对列进行排序时）