---
sidebar_label: grid_open
title: Шаблон grid_open
description: "задает иконку знака открытия/закрытия в столбце дерева"
---

# grid_open

### Description

@short: Указывает иконку для знака открытия/закрытия в столбце дерева

@signature: grid_open: (task: Task) => string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - HTML-текст, который будет отрисован в gantt

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [Настройка столбца дерева](guides/tree-column.md)
- [Шаблоны грида](guides/table-templates.md)