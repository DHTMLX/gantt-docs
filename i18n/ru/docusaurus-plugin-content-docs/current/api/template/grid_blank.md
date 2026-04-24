---
sidebar_label: grid_blank
title: grid_blank template
description: "указывает на пользовательский контент, который вставляется перед метками дочерних элементов в столбце дерева"
---

# grid_blank

### Description

@short: Указывает пользовательский контент, который вставляется перед метками дочерних элементов в столбце дерева

@signature: grid_blank: (task: Task) => string;

### Parameters

- `task` - (обязательный) *Task* - объект задачи

### Returns
- ` text` - (string) - html-текст, который будет отрисован в gantt

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [Шаблоны Grid](guides/table-templates.md)
- [Настройка столбца дерева](guides/tree-column.md)