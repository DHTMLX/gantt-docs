---
sidebar_label: grid_indent
title: grid_indent template
description: "контролирует отступ дочерних элементов внутри ветки в tree column"
---

# grid_indent

### Description

@short: Контролирует отступ дочерних элементов внутри ветки в tree column

@signature: grid_indent: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` text` - (string) - html текст, который будет отображён в gantt

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [Настройка древовидной колонки](guides/tree-column.md)
- [Шаблоны грида](guides/table-templates.md)
