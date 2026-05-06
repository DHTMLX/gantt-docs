---
sidebar_label: min_duration
title: min_duration Konfiguration
description: "setzt die minimale Dauer (in Millisekunden), die während der Größenänderung einer Aufgabe festgelegt werden kann."
---

# min_duration

### Description

@short: Legt die minimale Dauer (in Millisekunden) fest, die während der Größenänderung einer Aufgabe festgelegt werden kann.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 day)
~~~

### Details

- Der Config-Wert gibt den Zeitraum zwischen dem Start- und Enddatum einer Aufgabe an (task.start_date - task.end_date); der Wert wird nicht durch [Arbeitszeit-Einstellungen](guides/working-time.md) oder [Dauerberechnungen](api/method/calculateduration.md) beeinflusst.

### Related Guides
- [Aufgaben im Zeitstrahl verschieben](guides/dnd.md)

**Standardwert:** 60*60*1000, oder 3600000 ms, 1 Stunde