---
sidebar_label: grid_file
title: grid_file шаблон
description: "задает иконку дочерних элементов в столбце дерева"
---

# grid_file

### Description

@short: Задает иконку дочерних элементов в столбце дерева

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (обязательно) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML-текст, который будет отрисован в диаграмме Ганта

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- [Шаблоны Grid](guides/table-templates.md)
- [Настройка столбца дерева](guides/tree-column.md)