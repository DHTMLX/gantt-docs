---
sidebar_label: grid_folder
title: grid_folder template
description: "定义树形列中父项使用的图标"
---

# grid_folder

### Description

@short: 定义树形列中父项使用的图标

@signature: grid_folder: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 将在甘特图中渲染的html文本

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}'>
   </div>`;
};
~~~

### Related Guides
- [网格的模板](guides/table-templates.md)
- [配置树形列](guides/tree-column.md)
