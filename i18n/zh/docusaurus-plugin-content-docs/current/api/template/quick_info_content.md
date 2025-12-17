---
sidebar_label: quick_info_content
title: quick_info_content template
description: "定义弹出编辑表单中显示的内容"
---

# quick_info_content

### Description

@short: 定义弹出编辑表单中显示的内容

@signature: quick_info_content: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 任务的开始时间
- `end` - (required) *Date* - 任务预计完成时间
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string) - 将在 gantt 中显示的 html 内容

### Example

~~~jsx
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 该模板是**Quick Info**扩展的一部分，请确保启用了[quick_info](guides/extensions-list.md)插件。 
:::

### Related Guides
- ['Quick Info' 扩展的模板（触控支持）](guides/touch-templates.md)
