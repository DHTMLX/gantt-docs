---
sidebar_label: progress_text
title: progress_text template
description: "definiert den Text, der im abgeschlossenen Bereich der Task-Leiste angezeigt wird"
---

# progress_text

### Description

@short: Definiert den Text, der im abgeschlossenen Bereich der Task-Leiste angezeigt wird

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem die Aufgabe geplant ist zu starten  
- `end` - (required) *Date* - das Datum, an dem die Aufgabe voraussichtlich endet
- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string | number | void) - ein HTML-Text, der innerhalb des gantt angezeigt wird

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
