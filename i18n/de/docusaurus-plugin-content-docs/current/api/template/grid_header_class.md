---
sidebar_label: grid_header_class
title: grid_header_class template
description: "definiert die CSS-Klasse, die den Headern der Tabellenspalten zugewiesen wird"
---

# grid_header_class

### Description

@short: Definiert die CSS-Klasse, die den Headern der Tabellenspalten zugewiesen wird

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (required) *string* - der Name der Spalte (entsprechend der "name"-Eigenschaft im Spaltenobjekt)
- `column` - (required) *object* - das Spaltenobjekt selbst (aus der <i>gantt.config.columns</i>-Konfiguration)

### Returns
- ` text` - (string | void) - die CSS-Klasse, die auf den angegebenen Header angewendet wird

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- ["Vorlagen des Grids"](guides/table-templates.md)
