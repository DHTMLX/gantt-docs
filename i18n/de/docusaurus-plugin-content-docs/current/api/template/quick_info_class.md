---
sidebar_label: quick_info_class
title: quick_info_class Vorlage
description: "legt die CSS-Klasse fest, die dem Pop-up-Bearbeitungsformular angewendet wird"
---

# quick_info_class

### Description

@short: Definiert die CSS-Klasse, die auf das Pop-up-Bearbeitungsformular angewendet wird

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string | void) - eine Klassenbezeichnung, die dem Quick Info-Popup zugewiesen wird

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
Diese Vorlage ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info)-Plugin aktivieren.
:::

### Related Guides
- [Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)](guides/touch-templates.md)
