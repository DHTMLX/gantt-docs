---
sidebar_label: leftside_text
title: leftside_text Vorlage
description: "legt den Text fest, der den Aufgabenbalken auf der linken Seite zugewiesen wird"
---

# leftside_text

### Description

@short: Gibt den Text an, der den Aufgabenbalken auf der linken Seite zugewiesen wird

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beginnen
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beenden
- `task` - (erforderlich) *Task* - das Aufgabenobjekt

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der im Gantt-Diagramm gerendert wird

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
- [Vorlagen für den Timeline-Bereich](guides/timeline-templates.md)
- [Anzeigen von Aufgabeninhalten](guides/text-block-for-task.md)
- [Formatters-Erweiterung](guides/formatters-ext.md#durationformatter)

