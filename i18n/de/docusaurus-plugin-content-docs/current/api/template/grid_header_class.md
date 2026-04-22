---
sidebar_label: grid_header_class
title: grid_header_class Vorlage
description: "gibt die CSS-Klasse an, die auf die Überschriften der Tabellenspalten angewendet wird"
---

# grid_header_class

### Description

@short: Definiert die CSS-Klasse, die den Headern der Tabellenspalten zugewiesen wird

@signature: grid_header_class: (columnName: string, column: any) =\> string | void;

### Parameters

- `columnName` - (erforderlich) *string* - der Spaltenname (wie in der "name"-Eigenschaft des Spaltenobjekts angegeben)
- `column` - (erforderlich) *object* - Spaltenobjekt (wie in der <i>gantt.config.columns</i> Konfiguration angegeben)

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das betreffende Element

### Example

~~~jsx
gantt.templates.grid_header_class = function(columnName, column){
    return "";
};
~~~

### Related Guides
- [Grid-Vorlagen](guides/table-templates.md)