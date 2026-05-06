---
sidebar_label: grid_open
title: grid_open Vorlage
description: "bestimmt das Symbol zum Öffnen/Schließen in der Baumspalte"
---

# grid_open

### Description

@short: Gibt das Icon an, das als Open/Close-Indikator in der Tree-Spalte verwendet wird

@signature: grid_open: (task: Task) => string;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.grid_open = function(item) {
    return "<div class='gantt_tree_icon gantt_" + 
    (item.$open ? "close" : "open") + "'></div>";
};
~~~

### Related Guides
- [Konfiguration der Baum-Spalte](guides/tree-column.md)
- [Vorlagen des Grids](guides/table-templates.md)