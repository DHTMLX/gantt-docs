---
sidebar_label: quick_info_title
title: quick_info_title template
description: "设置弹出编辑表单的标题"
---

# quick_info_title

### Description

@short: 设置弹出编辑表单的标题

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 任务计划开始的日期
- `end` - (required) *Date* - 任务预期完成的日期
- `task` - (required) *Task* - 任务对象本身

### Returns
- ` text` - (string | number | void) - 将在甘特图中显示的 HTML 字符串

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 该模板是 **Quick Info** 扩展的一部分，请确保启用了 [quick_info](guides/extensions-list.md) 插件。 
:::

### Related Guides
- ['Quick Info' 扩展的模板（触控支持）](guides/touch-templates.md)
