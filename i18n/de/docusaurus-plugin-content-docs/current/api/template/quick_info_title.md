---
sidebar_label: quick_info_title
title: quick_info_title template
description: "Legt den Titel für das Pop-up-Bearbeitungsformular fest"
---

# quick_info_title

### Description

@short: Legt den Titel für das Pop-up-Bearbeitungsformular fest

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - Das Datum, an dem die Aufgabe geplant ist zu starten
- `end` - (required) *Date* - Das Datum, an dem die Aufgabe voraussichtlich abgeschlossen wird
- `task` - (required) *Task* - Das Aufgabenobjekt selbst

### Returns
- ` text` - (string | number | void) - einen HTML-String, der im Gantt angezeigt wird

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
 Diese Vorlage ist Teil der **Quick Info**-Erweiterung, daher stellen Sie sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
