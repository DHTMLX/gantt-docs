---
sidebar_label: grid_indent
title: grid_indent Vorlage
description: "legt den Einzug der untergeordneten Elemente in einer Verzweigung (in der Baumspalte)"
---

# grid_indent

### Description

@short: Steuert die Einrückung von untergeordneten Elementen innerhalb eines Branches in der Tree-Spalte

@signature: grid_indent: (task: Task) => string;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Diagramm gerendert wird

### Example

~~~jsx
gantt.templates.grid_indent = function(item) {
    return "<div class='gantt_tree_indent'></div>";
};
~~~

### Related Guides
- [Konfigurieren der Baumspalte](guides/tree-column.md)
- [Vorlagen des Grids](guides/table-templates.md)