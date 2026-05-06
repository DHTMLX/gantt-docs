---
sidebar_label: rightside_text
title: rightside_text Vorlage
description: "Legt den Text fest, der den Aufgabenbalken auf der rechten Seite zugewiesen wird"
---

# rightside_text

### Description

@short: Legt den Text fest, der den Aufgabenbalken auf der rechten Seite zugewiesen wird

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe beginnen soll
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe abgeschlossen werden soll
- `task` - (erforderlich) *Task* - das Aufgabenobjekt

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der im Gantt-Diagramm gerendert wird

### Examples

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Seiteninhalt definieren](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)
- [Aufgabeninhalte anzeigen](guides/text-block-for-task.md)