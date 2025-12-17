---
sidebar_label: grid_file
title: grid_file template
description: "specifies the icon of child items in the tree column"
---

# grid_file

### Description

@short: Specifies the icon of child items in the tree column

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [Templates of the Grid](guides/table-templates.md)
- [Configuring the Tree Column](guides/tree-column.md)
