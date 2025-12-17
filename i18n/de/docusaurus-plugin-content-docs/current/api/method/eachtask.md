---
sidebar_label: eachTask
title: eachTask method
description: "durchläuft alle untergeordneten Aufgaben einer bestimmten Aufgabe oder des gesamten Gantt-Diagramms"
---

# eachTask

### Description

@short: Durchläuft alle untergeordneten Aufgaben einer bestimmten Aufgabe oder des gesamten Gantt-Diagramms

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 	eine Funktion, die für jede Aufgabe aufgerufen wird. Sie erhält ein Aufgabenobjekt als Argument
- `parent` - (optional) *string | number* - 	die Eltern-ID. Wenn angegeben, wird die Funktion über die Kinder des
spezifizierten Elternteils iterieren
- `master` - (optional) *object* - das Objekt, das innerhalb der Funktion als 'this' verwendet wird

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

Diese Methode führt eine [Tiefensuche (depth-first tree traversal)](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) von links nach rechts durch und besucht dabei jede Aufgabe. Elternaufgaben werden vor ihren Kindern verarbeitet.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)

