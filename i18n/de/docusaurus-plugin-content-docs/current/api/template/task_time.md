---
sidebar_label: task_time
title: task_time template
description: "definiert den Datumsbereich, der im Header der Lightbox angezeigt wird"
---

# task_time

### Description

@short: Definiert den Datumsbereich, der im Header der Lightbox angezeigt wird

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - das Datum, an dem die Aufgabe beginnt  
- `end` - (required) *Date* - das Datum, an dem die Aufgabe voraussichtlich endet
- `task` - (required) *Task* - das Aufgabenobjekt selbst

### Returns
- ` text` - (string) - html-Inhalt, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.task_time = function(start,end,task){
    return gantt.templates.task_date(start)+" - "+gantt.templates.task_end_date(end);
};
~~~

### Related API
- [task_date](api/template/task_date.md)
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- ["Vorlagen des Lightbox"](guides/lightbox-templates.md)

