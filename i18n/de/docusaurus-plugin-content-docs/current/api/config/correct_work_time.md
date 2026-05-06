---
sidebar_label: correct_work_time
title: correct_work_time Konfiguration
description: "Ermöglicht das Anpassen des Start- und Enddatums der Aufgabe an die Arbeitszeit (während des Ziehens)"
---

# correct_work_time

### Description

@short: Ermöglicht das Anpassen des Start- und Enddatums der Aufgabe an die Arbeitszeit (während des Ziehens)

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Korrekte Position der Aufgabe beim Ziehen](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

Die Eigenschaft ist nur sinnvoll, wenn die [work_time](api/config/work_time.md) Eigenschaft aktiviert ist.

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)