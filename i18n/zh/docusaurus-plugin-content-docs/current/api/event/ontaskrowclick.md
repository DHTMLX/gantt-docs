---
sidebar_label: onTaskRowClick
title: onTaskRowClick event
description: "当用户点击表格中的一行时触发"
---

# onTaskRowClick

### Description

@short: 当用户点击表格中的一行时触发

@signature: onTaskRowClick: (id: string | number, row: HTMLElement) =\> void;

### Parameters

- `id` - (必填) *string | number* - 任务 ID
- `row` - (必填) *HTMLElement* - 被点击行的 HTMLElement

### Example

~~~jsx
gantt.attachEvent("onTaskRowClick", function(id,row){
    // 在这里插入您的自定义逻辑 
});
~~~