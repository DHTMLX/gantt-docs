---
sidebar_label: quick_info_class
title: quick_info_class template
description: "definiert die CSS-Klasse, die auf das Pop-up-Bearbeitungsformular angewendet wird"
---

# quick_info_class

### Description

@short: Definiert die CSS-Klasse, die auf das Pop-up-Bearbeitungsformular angewendet wird

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - das Startdatum der geplanten Aufgabe
- `end` - (required) *Date* - das Enddatum, bis zu dem die Aufgabe abgeschlossen sein soll
- `task` - (required) *Task* - das Aufgabenobjekt selbst

### Returns
- ` text` - (string | void) - der CSS-Klassenname, der für das Quick Info Popup verwendet wird

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
note Diese Vorlage ist Teil der **Quick Info** Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin zuerst aktiviert ist. 
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
