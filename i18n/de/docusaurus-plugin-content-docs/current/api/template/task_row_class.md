---
sidebar_label: task_row_class
title: task_row_class Vorlage
description: "gibt die CSS-Klasse an, die der Zeile des Timeline-Bereichs zugewiesen wird"
---

# task_row_class

### Description

@short: Gibt die CSS-Klasse an, die der Zeile des Timeline-Bereichs zugewiesen wird

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe beginnen soll  
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe abgeschlossen werden soll
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- `text` - (string | void) - eine CSS-Klasse für das betreffende Element

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Gibt die CSS-Klasse für das betreffende Element zurück.

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)