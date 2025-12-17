---
sidebar_label: grid_blank
title: grid_blank template
description: "definiert den benutzerdefinierten Inhalt, der vor den Labels der untergeordneten Elemente in der Tree-Spalte angezeigt wird"
---

# grid_blank

### Description

@short: Definiert den benutzerdefinierten Inhalt, der vor den Labels der untergeordneten Elemente in der Tree-Spalte angezeigt wird

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - html-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)
- ["Konfiguration der Baumspalte"](guides/tree-column.md)
