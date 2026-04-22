---
sidebar_label: task_time
title: task_time template
description: "legt den Datumszeitraum im Kopfbereich der Lightbox fest"
---

# task_time

### Description

@short: legt den Datumszeitraum im Kopfbereich der Lightbox fest

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt  
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

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
- [Templates of the Lightbox](guides/lightbox-templates.md)