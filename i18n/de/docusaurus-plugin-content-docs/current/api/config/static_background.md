---
sidebar_label: static_background
title: static_background Konfiguration
description: "Generiert ein Hintergrundbild für den Timeline-Bereich, statt die tatsächlichen Spalten- und Zeilenlinien darzustellen"
---

# static_background
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Generiert ein Hintergrundbild für den Timeline-Bereich, statt der tatsächlichen Spalten- und Zeilenlinien.

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Leistungsoptimierungen](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

Seit Version 6.2 rendert diese Konfiguration den PNG-Hintergrund UND alle Zellen, denen über die Template-Funktion timeline_cell_class eine CSS-Klasse zugewiesen wurde.

Wenn Sie zum Verhalten von v6.1 zurückkehren möchten (das nur das Hintergrundbild rendert), verwenden Sie die [static_background_cells](api/config/static_background_cells.md) Konfiguration:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [Performance: Möglichkeiten zur Verbesserung](guides/performance.md)