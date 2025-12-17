---
sidebar_label: grid_open
title: grid_open template
description: "указывает иконку, используемую для индикатора открытия/закрытия в колонке дерева"
---

# grid_open

### Description

@short: Указывает иконку, используемую для индикатора открытия/закрытия в колонке дерева

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html-текст, который будет отображаться в gantt

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [Настройка древовидной колонки](guides/tree-column.md)
- [Шаблоны грида](guides/table-templates.md)
