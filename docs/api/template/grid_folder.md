---
sidebar_label: grid_folder
title: grid_folder template
description: "specifies the icon of parent items in the tree column"
---

# grid_folder

### Description

@short: Specifies the icon of parent items in the tree column

@signature: grid_folder: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}'>
   </div>`;
};
~~~

### Related Guides
- [Templates of the Grid](guides/table-templates.md)
- [Configuring the Tree Column](guides/tree-column.md)
