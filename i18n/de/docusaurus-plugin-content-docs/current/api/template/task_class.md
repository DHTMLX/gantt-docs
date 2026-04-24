---
sidebar_label: task_class
title: task_class Vorlage
description: "bestimmt die CSS-Klasse, die auf Aufgabenbalken angewendet wird"
---

# task_class

### Description

@short: Definiert die CSS-Klasse, die auf die Task-Balken angewendet wird

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe beginnen soll  
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das betreffende Element

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)