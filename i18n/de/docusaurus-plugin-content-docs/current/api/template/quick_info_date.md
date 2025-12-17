---
sidebar_label: quick_info_date
title: quick_info_date template
description: "Legt das Datum fest, das im Pop-up-Bearbeitungsformular angezeigt wird"
---

# quick_info_date

### Description

@short: Legt das Datum fest, das im Pop-up-Bearbeitungsformular angezeigt wird

@signature: quick_info_date: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - Das Datum, an dem eine Aufgabe geplant ist zu beginnen
- `end` - (required) *Date* - Das Datum, an dem eine Aufgabe geplant ist zu enden
- `task` - (required) *Task* - Das Task-Objekt

### Returns
- ` text` - (string) - html-Inhalt, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
 Diese Vorlage ist Teil der **Quick Info**-Erweiterung. Stellen Sie daher sicher, dass das [quick_info](guides/extensions-list.md#quickinfo) Plugin aktiviert ist. 
:::

### Related Guides
- ["Vorlagen der 'Quick Info'-Erweiterung (Touch-Unterstützung)"](guides/touch-templates.md)
