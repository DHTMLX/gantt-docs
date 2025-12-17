---
sidebar_label: duration_step
title: duration_step config
description: "Definiert, wie viele Einheiten von 'gantt.config.duration_unit' eine Einheit der 'duration' Daten-Eigenschaft ausmachen."
---

# duration_step

### Description

@short: Definiert, wie viele Einheiten von 'gantt.config.duration_unit' eine Einheit der 'duration' Daten-Eigenschaft ausmachen.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";  
gantt.config.duration_step = 3;  
// wenn task.duration = 2 ist, dauert die Aufgabe also 6 Stunden (3*2)
~~~

**Default value:** 1

### Details

Wenn die duration_unit auf "hour" oder "minute" gesetzt wird, ist es empfehlenswert, den [duration_step](api/config/duration_step.md) auf 1 zu belassen. Diese Konfiguration ermöglicht einige Optimierungen bei der Berechnung der Arbeitszeit, die nur korrekt funktionieren, wenn der Schritt auf 1 gesetzt ist. Beachten Sie, dass es erhebliche Performance-Unterschiede zwischen dem "optimierten" und dem "nicht-optimierten" Modus gibt.

### Related API
- [duration_unit](api/config/duration_unit.md)

