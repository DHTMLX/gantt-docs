---
sidebar_label: deadlines
title: deadlines config
description: "Schaltet die Anzeige von Deadline-Elementen für Aufgaben ein oder aus"
---

# deadlines

### Description

@short: Schaltet die Anzeige von Deadline-Elementen für Aufgaben ein oder aus

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

Diese Einstellung steuert, ob Deadline-Elemente für Aufgaben angezeigt werden. Wenn aktiviert, überprüft Gantt die Eigenschaft `task.deadline` und wenn sie ein gültiges Datum enthält, wird die Deadline auf der Timeline angezeigt.

### Related Guides
- ["Zusätzliche Elemente in der Zeitleiste"](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0
