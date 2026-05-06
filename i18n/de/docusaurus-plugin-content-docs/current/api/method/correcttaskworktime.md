---
sidebar_label: correctTaskWorkTime
title: correctTaskWorkTime method
description: "Berechnet die Dauer der Aufgabe in der Arbeitszeit neu"
---

# correctTaskWorkTime

### Description

@short: Berechnet die Dauer der Aufgabe in der Arbeitszeit neu

@signature: correctTaskWorkTime: (task: Task) =\> void

### Parameters

- `task` - (erforderlich) *Task* - das Objekt der Aufgabe

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
~~~

### Details

Die Methode erfordert die folgenden Konfigurationsoptionen, die angegeben werden müssen:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)