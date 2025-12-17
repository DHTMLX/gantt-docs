---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "Berechnet die Aufgabendauer basierend auf der Arbeitszeit neu"
---

# correctTaskWorkTime

### Description

@short: Berechnet die Aufgabendauer basierend auf der Arbeitszeit neu

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

Diese Methode funktioniert, wenn die folgenden Konfigurationsoptionen aktiviert sind:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)
