---
sidebar_label: quick_info_content
title: quick_info_content template
description: "Legt den Inhalt des Pop-up-Bearbeitungsformulars fest"
---

# quick_info_content

### Description

@short: Legt den Inhalt des Pop-up-Bearbeitungsformulars fest

@signature: quick_info_content: (start: Date, end: Date, task: Task) => string;

### Parameter

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe beginnen soll
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe beendet werden soll
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Diagramm dargestellt wird

### Example

~~~jsx
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
Diese Vorlage ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
