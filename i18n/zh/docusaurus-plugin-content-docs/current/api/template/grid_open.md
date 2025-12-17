---
sidebar_label: grid_open
title: grid_open template
description: "指定用于树形列中展开/关闭指示图标的图标"
---

# grid_open

### Description

@short: 指定用于树形列中展开/关闭指示图标的图标

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` text` - (string) - 将在甘特图中显示的html文本

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [配置树形列](guides/tree-column.md)
- [网格的模板](guides/table-templates.md)
