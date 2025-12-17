---
sidebar_label: task_row_class
title: task_row_class template
description: "gibt die CSS-Klasse an, die auf die Zeile im Timeline-Bereich angewendet wird"
---

# task_row_class

### Description

@short: Gibt die CSS-Klasse an, die auf die Zeile im Timeline-Bereich angewendet wird

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe beginnen soll  
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe enden soll
- `task` - (required) *Task* - das Aufgabenobjekt selbst

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das aktuell verarbeitete Element

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

Stellt die CSS-Klasse für das angegebene Element bereit.

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
