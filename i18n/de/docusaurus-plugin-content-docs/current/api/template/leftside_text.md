---
sidebar_label: leftside_text
title: leftside_text template
description: "definiert den Text, der auf der linken Seite der Task-Balken angezeigt wird"
---

# leftside_text

### Description

@short: Definiert den Text, der auf der linken Seite der Task-Balken angezeigt wird

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beginnen
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (required) *Task* - das Task-Objekt selbst

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der im Gantt-Chart angezeigt wird

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
- ["Anzeigen von Aufgabeninhalten"](guides/text-block-for-task.md)
- ["Formatters-Erweiterung"](guides/formatters-ext.md#durationformatter)

