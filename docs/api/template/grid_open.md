---
sidebar_label: grid_open
title: grid_open template
description: "specifies the icon of the open/close sign in the tree column"
---

# grid_open

### Description

@short: Specifies the icon of the open/close sign in the tree column

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [Configuring the Tree Column](guides/tree-column.md)
- [Templates of the Grid](guides/table-templates.md)
