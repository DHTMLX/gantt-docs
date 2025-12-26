---
sidebar_label: resetProjectDates
title: resetProjectDates method
description: "Berechnet die Dauer einer Projektaufgabe basierend auf den Terminen ihrer untergeordneten Aufgaben neu"
---

# resetProjectDates
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Berechnet die Dauer einer Projektaufgabe basierend auf den Terminen ihrer untergeordneten Aufgaben neu

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - Das Aufgabenobjekt

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

Diese Methode aktualisiert die Eigenschaften **start_date**, **end_date** und **duration** des angegebenen Aufgabenobjekts basierend auf den Terminen seiner untergeordneten Aufgaben.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)

