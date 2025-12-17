---
sidebar_label: grid_blank
title: grid_blank template
description: "specifies the custom content inserted before the labels of child items in the tree column"
---

# grid_blank

### Description

@short: Specifies the custom content inserted before the labels of child items in the tree column

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [Templates of the Grid](guides/table-templates.md)
- [Configuring the Tree Column](guides/tree-column.md)
