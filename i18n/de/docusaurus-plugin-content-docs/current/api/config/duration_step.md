---
sidebar_label: duration_step
title: duration_step Konfiguration
description: "Legt die Anzahl der 'gantt.config.duration_unit'-Einheiten fest, die einer Einheit der 'duration'-Daten-Eigenschaft entsprechen."
---

# duration_step

### Description

@short: Legt die Anzahl der 'gantt.config.duration_unit'-Einheiten fest, die einer Einheit der 'duration'-Daten-Eigenschaft entsprechen.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours (3*2)
~~~

**Standardwert:** 1

### Details

Wenn Sie die duration_unit auf "hour" oder "minute" festlegen, empfehlen wir, den [duration_step](api/config/duration_step.md) auf 1 zu setzen.
Eine solche Kombination aktiviert bestimmte Optimierungen bei der Berechnung der Arbeitszeit, die nur funktionieren, wenn der Schritt auf 1 gesetzt ist. Beachten Sie, dass es erhebliche Leistungsunterschiede zwischen den 'optimierten' und 'nicht optimierten' Modi gibt.

### Related API
- [duration_unit](api/config/duration_unit.md)