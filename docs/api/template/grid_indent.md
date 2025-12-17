---
sidebar_label: grid_indent
title: grid_indent template
description: "specifies the indent of the child items in a branch (in the tree column)"
---

# grid_indent

### Description

@short: Specifies the indent of the child items in a branch (in the tree column)

@signature: grid_indent: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [Configuring the Tree Column](guides/tree-column.md)
- [Templates of the Grid](guides/table-templates.md)
