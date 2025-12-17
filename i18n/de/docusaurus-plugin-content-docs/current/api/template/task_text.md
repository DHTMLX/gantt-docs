---
sidebar_label: task_text
title: task_text template
description: "Legt den Text fest, der in den Task-Balken und im Lightbox-Header angezeigt wird"
---

# task_text

### Description

@short: Legt den Text fest, der in den Task-Balken und im Lightbox-Header angezeigt wird

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - Das Datum, an dem die Aufgabe geplant ist zu starten  
- `end` - (required) *Date* - Das Datum, an dem die Aufgabe voraussichtlich beendet wird
- `task` - (required) *Task* - Das Task-Objekt selbst

### Returns
- ` text` - (string | number | void) - Der HTML-Inhalt, der innerhalb des Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
