---
sidebar_label: grid_indent
title: grid_indent template
description: "Steuert die Einrückung von untergeordneten Elementen innerhalb eines Branches in der Tree-Spalte"
---

# grid_indent

### Description

@short: Steuert die Einrückung von untergeordneten Elementen innerhalb eines Branches in der Tree-Spalte

@signature: grid_indent: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - html-Text, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- ["Konfiguration der Baumspalte"](guides/tree-column.md)
- ["Vorlagen des Grids"](guides/table-templates.md)
