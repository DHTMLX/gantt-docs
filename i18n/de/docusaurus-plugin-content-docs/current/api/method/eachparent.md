---
sidebar_label: eachParent
title: eachParent Methode
description: "Durchläuft alle übergeordneten Aufgaben der angegebenen Aufgabe im Gantt-Diagramm"
---

# eachParent

### Description

@short: Durchläuft alle übergeordneten Aufgaben der angegebenen Aufgabe im Gantt-Diagramm

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (erfordert) *Funktion* - eine Funktion, die über Aufgaben iteriert. Nimmt ein Task-Objekt als Parameter
- `startTask` - (erfordert) *string | number* - die ID des Elements, dessen Elternaufgaben durchlaufen werden sollen

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)