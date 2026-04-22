---
sidebar_label: grid_blank
title: grid_blank Vorlage
description: "Bestimmt den benutzerdefinierten Inhalt, der vor den Bezeichnungen der untergeordneten Elemente in der Baum-Spalte eingefügt wird"
---

# grid_blank

### Description

@short: Definiert den benutzerdefinierten Inhalt, der vor den Labels der untergeordneten Elemente in der Tree-Spalte angezeigt wird

@signature: grid_blank: (task: Task) =\> string;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.grid_blank = function(item) {
    return "<div class='gantt_tree_icon gantt_blank'></div>";
};
~~~

### Related Guides
- [Vorlagen des Grids](guides/table-templates.md)
- [Konfigurieren der Baumspalte](guides/tree-column.md)