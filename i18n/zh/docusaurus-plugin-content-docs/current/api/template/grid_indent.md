---
sidebar_label: grid_indent
title: grid_indent template
description: "控制树形列中分支内子项的缩进"
---

# grid_indent

### Description

@short: 控制树形列中分支内子项的缩进

@signature: grid_indent: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 将在 gantt 中显示的 html 文本

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [配置树形列](guides/tree-column.md)
- [网格的模板](guides/table-templates.md)
