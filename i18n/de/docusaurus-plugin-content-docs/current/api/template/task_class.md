---
sidebar_label: task_class
title: task_class template
description: "definiert die CSS-Klasse, die auf die Task-Balken angewendet wird"
---

# task_class

### Description

@short: Definiert die CSS-Klasse, die auf die Task-Balken angewendet wird

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beginnen  
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu enden
- `task` - (required) *Task* - das Task-Objekt selbst

### Returns
- ` text` - (string | void) - eine CSS-Klasse, die dem Item zugewiesen wird

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
