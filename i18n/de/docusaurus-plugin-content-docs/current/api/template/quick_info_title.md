---
sidebar_label: quick_info_title
title: quick_info_title Vorlage
description: "legt den Titel des Pop-up-Bearbeitungsformulars fest"
---

# quick_info_title

### Description

@short: Legt den Titel des Pop-up-Bearbeitungsformulars fest

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der im Gantt-Diagramm gerendert wird

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Diese Vorlage ist in der **Quick Info**-Erweiterung definiert, daher muss das [quick_info](guides/extensions-list.md#quick-info)-Plugin aktiviert werden.
:::

### Related Guides
- [Vorlagen der 'Quick Info' Erweiterung (Touch-Unterstützung)](guides/touch-templates.md)