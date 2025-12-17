---
sidebar_label: grid_blank
title: grid_blank template
description: "определяет пользовательский контент, который отображается перед метками дочерних элементов в колонке дерева"
---

# grid_blank

### Description

@short: Определяет пользовательский контент, который отображается перед метками дочерних элементов в колонке дерева

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [Шаблоны грида](guides/table-templates.md)
- [Настройка древовидной колонки](guides/tree-column.md)
