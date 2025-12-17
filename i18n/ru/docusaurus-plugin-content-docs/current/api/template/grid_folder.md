---
sidebar_label: grid_folder
title: grid_folder template
description: "определяет иконку, используемую для родительских элементов в tree колонке"
---

# grid_folder

### Description

@short: Определяет иконку, используемую для родительских элементов в tree колонке

@signature: grid_folder: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}'>
   </div>`;
};
~~~

### Related Guides
- [Шаблоны грида](guides/table-templates.md)
- [Настройка древовидной колонки](guides/tree-column.md)
