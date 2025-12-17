---
sidebar_label: grid_file
title: grid_file template
description: "определяет иконку для дочерних элементов в колонке дерева"
---

# grid_file

### Description

@short: Определяет иконку для дочерних элементов в колонке дерева

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html-текст, который будет отображён в диаграмме Ганта

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [Шаблоны грида](guides/table-templates.md)
- [Настройка древовидной колонки](guides/tree-column.md)
