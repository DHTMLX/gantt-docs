---
sidebar_label: quick_info_content
title: quick_info_content template
description: "definiert, was im Pop-up-Bearbeitungsformular angezeigt wird"
---

# quick_info_content

### Description

@short: Definiert, was im Pop-up-Bearbeitungsformular angezeigt wird

@signature: quick_info_content: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - wann die Aufgabe beginnt
- `end` - (required) *Date* - wann die Aufgabe voraussichtlich abgeschlossen wird
- `task` - (required) *Task* - das Aufgabenobjekt selbst

### Returns
- ` text` - (string) - html-Inhalt, der im Gantt angezeigt wird

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
 Diese Vorlage ist Teil der **Quick Info**-Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
