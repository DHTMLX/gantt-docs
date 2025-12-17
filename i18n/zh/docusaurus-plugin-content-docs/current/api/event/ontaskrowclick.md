---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "当用户点击表格中的某一行时触发"
---

# onTaskRowClick

### Description

@short: 当用户点击表格中的某一行时触发

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的ID
- `row` - (required) *HTMLElement* - 表示被点击行的HTML元素

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    //在这里编写自定义逻辑
});
~~~
