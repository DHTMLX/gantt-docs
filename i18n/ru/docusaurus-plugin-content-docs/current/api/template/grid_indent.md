---
sidebar_label: grid_indent
title: шаблон grid_indent
description: "задаёт отступ дочерних элементов в ветке (в столбце дерева)"
---

# grid_indent

### Description

@short: Указывает отступ дочерних элементов в ветке (в столбце дерева)

@signature: grid_indent: (task: Task) => string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML-текст, который будет отрисован в Gantt

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [Настройка столбца дерева](guides/tree-column.md)
- [Шаблоны Grid](guides/table-templates.md)