---
sidebar_label: lightbox_header
title: lightbox_header template
description: "spezifiziert den Header der lightbox"
---

# lightbox_header

### Description

@short: Spezifiziert den Header der lightbox

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beginnen  
- `end_date` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist abgeschlossen zu sein
- `task` - (required) *Task* - das Objekt der Aufgabe

### Returns
- ` text` - (string) - ein HTML-Text zur Darstellung im Gantt

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- ["Vorlagen des Lightbox"](guides/lightbox-templates.md)
