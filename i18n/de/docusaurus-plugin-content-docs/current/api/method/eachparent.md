---
sidebar_label: eachParent
title: eachParent method
description: "iteriert durch alle übergeordneten Aufgaben einer bestimmten Aufgabe im Gantt-Diagramm"
---

# eachParent

### Description

@short: Iteriert durch alle übergeordneten Aufgaben einer bestimmten Aufgabe im Gantt-Diagramm

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - eine Callback-Funktion, die jedes Aufgabenobjekt verarbeitet
- `startTask` - (required) *string | number* - die ID der Aufgabe, deren übergeordnete Aufgaben durchlaufen werden sollen
- `master` - (required) *object* - das Kontextobjekt, das innerhalb der Callback-Funktion als 'this' verwendet wird

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)

