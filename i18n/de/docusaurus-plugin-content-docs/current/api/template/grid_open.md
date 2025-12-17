---
sidebar_label: grid_open
title: grid_open template
description: "Gibt das Icon an, das als Open/Close-Indikator in der Tree-Spalte verwendet wird"
---

# grid_open

### Description

@short: Gibt das Icon an, das als Open/Close-Indikator in der Tree-Spalte verwendet wird

@signature: grid_open: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - Das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- ["Konfiguration der Baumspalte"](guides/tree-column.md)
- ["Vorlagen des Grids"](guides/table-templates.md)
