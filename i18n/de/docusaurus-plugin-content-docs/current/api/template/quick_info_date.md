---
sidebar_label: quick_info_date
title: quick_info_date Vorlage
description: "legt das Datum des Pop-up-Bearbeitungsformulars fest"
---

# quick_info_date

### Description

@short: Specifies the date of the pop-up edit form

@signature: quick_info_date: (start: Date, end: Date, task) => string;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe beginnen soll
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe beendet werden soll
- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Diagramm gerendert wird

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
Diese Vorlage ist in der **Quick Info**-Erweiterung definiert, daher müssen Sie das [quick_info](guides/extensions-list.md#quick-info) Plugin aktivieren.
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)