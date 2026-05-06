---
sidebar_label: eachTask
title: eachTask method
description: "Durchläuft alle untergeordneten Aufgaben einer bestimmten Aufgabe oder des gesamten Gantt-Diagramms"
---

# eachTask

### Description

@short: Durchläuft alle untergeordneten Aufgaben einer bestimmten Aufgabe oder des gesamten Gantt-Diagramms

@signature: eachTask: (code: GanttCallback, parent?: string | number, master?: any) =\> void

### Parameters

- `code` - (erforderlich) *function* - Eine Funktion, die über Aufgaben iteriert. Nimmt ein Task-Objekt als Parameter
- `parent` - (optional) *string | number* - die Parent-ID. Falls angegeben, wird die Funktion über die Kinder der angegebenen Parent iterieren
- `master` - (optional) *object* - das Objekt, auf das sich `this` bezieht

### Example

~~~jsx
gantt.eachTask(function(task){alert(task.text);})
~~~

### Details

Die Methode verwendet [Tiefensuche im Baum](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)) (Depth-First Tree Traversal) von links nach rechts, um alle Aufgaben zu durchlaufen. Jedes Elternelement wird vor seinem Kind besucht.

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)