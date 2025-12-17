---
sidebar_label: grid_file
title: grid_file template
description: "definiert das Icon für untergeordnete Elemente in der Baumspalte"
---

# grid_file

### Description

@short: Definiert das Icon für untergeordnete Elemente in der Baumspalte

@signature: grid_file: (task: Task) =\> string;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - html-Text, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.grid_file = function(item) {
    return "<div class='gantt_tree_icon gantt_file'></div>";
};
~~~

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)
- ["Konfiguration der Baumspalte"](guides/tree-column.md)
