---
sidebar_label: resetProjectDates
title: resetProjectDates Methode
description: "berechnet die Dauer einer Projektaufgabe neu basierend auf den Terminen ihrer Unteraufgaben"
---

# resetProjectDates

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Berechnet erneut die Dauer einer Projektaufgabe basierend auf den Terminen ihrer Unteraufgaben

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

Die Methode modifiziert die **start_date**, **end_date** und **duration** Eigenschaften des übergebenen Objekts.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)