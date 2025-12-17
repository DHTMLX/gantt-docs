---
sidebar_label: rightside_text
title: rightside_text template
description: "definiert den Text, der auf der rechten Seite der Task-Balken angezeigt wird"
---

# rightside_text

### Description

@short: Definiert den Text, der auf der rechten Seite der Task-Balken angezeigt wird

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe beginnen soll
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu enden
- `task` - (required) *Task* - das Task-Objekt selbst

### Returns
- ` text` - (string | number | void) - einen HTML-String, der im Gantt angezeigt wird

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
- ["Anzeigen von Aufgabeninhalten"](guides/text-block-for-task.md)

