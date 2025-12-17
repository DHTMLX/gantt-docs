---
sidebar_label: onGridHeaderClick
title: onGridHeaderClick event
description: "当用户点击 grid 表头时触发"
---

# onGridHeaderClick

### Description

@short: 当用户点击 grid 表头时触发

@signature: onGridHeaderClick: (name: string, e: Event) =\> boolean;

### Parameters

- `name` - (required) *string* - 被点击列表头的 name 属性
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定事件的默认行为是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onGridHeaderClick", function(name, e){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

返回 false 会阻止默认行为，例如通过"加号"按钮添加新任务或对列进行排序。
