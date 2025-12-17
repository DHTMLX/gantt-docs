---
sidebar_label: grid_blank
title: grid_blank template
description: "定义在树形列中子项标签之前显示的自定义内容"
---

# grid_blank

### Description

@short: 定义在树形列中子项标签之前显示的自定义内容

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 将在甘特图中渲染的 HTML 文本

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [网格的模板](guides/table-templates.md)
- [配置树形列](guides/tree-column.md)
