---
sidebar_label: task_text
title: task_text Vorlage
description: "legt den Text in den Aufgabenbalken und der Überschrift der Lightbox fest"
---

# task_text

### Description

@short: Legt den Text fest, der in den Task-Balken und im Lightbox-Header angezeigt wird

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der im Gantt-Diagramm gerendert wird

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)