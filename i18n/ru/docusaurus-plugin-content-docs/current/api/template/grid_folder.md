---
sidebar_label: grid_folder
title: grid_folder шаблон
description: "указывается значок родительских элементов в столбце дерева"
---

# grid_folder

### Description

@short: Определяет значок родительских элементов в столбце дерева

@signature: grid_folder: (task: Task) => string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html-текст, который будет отображаться в диаграмме Ганта

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}' >
   </div>`;
};
~~~

### Related Guides
- [Шаблоны Grid](guides/table-templates.md)
- [Настройка столбца дерева](guides/tree-column.md)