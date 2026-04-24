---
sidebar_label: Fristen
title: Fristen-Konfiguration
description: "Aktiviert oder deaktiviert die Anzeige von Deadline-Elementen für Aufgaben"
---

# Fristen

### Description

@short: Aktiviert oder deaktiviert die Anzeige von Deadline-Elementen für Aufgaben

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Related samples
- [Fristen anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

Diese Konfiguration aktiviert oder deaktiviert die Anzeige von Deadline-Elementen für Aufgaben. Wenn sie aktiviert ist, prüft Gantt die Eigenschaft `task.deadline`, und falls sie ein gültiges Datum enthält, wird das Deadline-Element im Zeitstrahl angezeigt.

### Related Guides
- [Zusätzliche Elemente in der Timeline](guides/inbuilt-baselines.md)

### Change log
- Hinzugefügt in v9.0