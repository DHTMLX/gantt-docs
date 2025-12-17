---
sidebar_label: correct_work_time
title: correct_work_time config
description: "Ermöglicht das Anpassen der Start- und Enddaten einer Aufgabe, damit sie während des Draggens innerhalb der Arbeitszeiten liegen"
---

# correct_work_time

### Description

@short: Ermöglicht das Anpassen der Start- und Enddaten einer Aufgabe, damit sie während des Draggens innerhalb der Arbeitszeiten liegen

@signature: correct_work_time: boolean

### Example

~~~jsx
gantt.config.work_time = true;
gantt.config.correct_work_time = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Correct task position on drag](https://docs.dhtmlx.com/gantt/samples/09_worktime/05_adjust_to_worktime.html)

### Details

Diese Einstellung wirkt nur, wenn die Eigenschaft aus [work_time](api/config/work_time.md) aktiviert ist.

<br>

![correct_work_time](/img/correct_work_time.png)

### Related API
- [work_time](api/config/work_time.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)

