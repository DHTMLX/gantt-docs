---
sidebar_label: grid_file
title: grid_file template
description: "定义树状列中子项的图标"
---

# grid_file

### Description

@short: 定义树状列中子项的图标

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 将在甘特图中显示的HTML文本

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [网格的模板](guides/table-templates.md)
- [配置树形列](guides/tree-column.md)
