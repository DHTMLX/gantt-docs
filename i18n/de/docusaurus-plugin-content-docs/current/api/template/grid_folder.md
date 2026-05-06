---
sidebar_label: grid_folder
title: grid_folder Vorlage
description: "legt das Symbol der übergeordneten Elemente in der Baumspalte fest"
---

# grid_folder

### Description

@short: Definiert das Icon, das für übergeordnete Elemente in der Tree-Spalte verwendet wird

@signature: grid_folder: (task: Task) =\> string;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.grid_folder = function(item) {
  return `<div 
   class='gantt_tree_icon gantt_folder_${(item.$open ? "open" : "closed")}' >
   </div>`;
};
~~~

### Related Guides
- [Vorlagen des Grids](guides/table-templates.md)
- [Konfiguration der Baumspalte](guides/tree-column.md)
