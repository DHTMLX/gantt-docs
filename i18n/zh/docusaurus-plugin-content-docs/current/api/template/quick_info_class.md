---
sidebar_label: quick_info_class
title: quick_info_class template
description: "定义应用于弹出编辑表单的CSS类"
---

# quick_info_class

### Description

@short: 定义应用于弹出编辑表单的CSS类

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 计划任务的开始日期
- `end` - (required) *Date* - 任务应完成的截止日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | void) - 将用于Quick Info弹出窗口的CSS类名

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
 此模板是**Quick Info**扩展的一部分，因此请确保先启用[quick_info](guides/extensions-list.md) 插件。 
:::

### Related Guides
- ['Quick Info' 扩展的模板（触控支持）](guides/touch-templates.md)
