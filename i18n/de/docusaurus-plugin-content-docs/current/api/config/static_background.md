---
sidebar_label: static_background
title: static_background config
description: "erstellt ein Hintergrundbild für den Timeline-Bereich, anstatt die Linien der Spalten und Zeilen direkt zu zeichnen"
---

# static_background

### Description

@short: Erstellt ein Hintergrundbild für den Timeline-Bereich, anstatt die Linien der Spalten und Zeilen direkt zu zeichnen

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

:::note
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::

Ab Version 6.2 erzeugt diese Einstellung ein PNG-Hintergrundbild zusammen mit allen Zellen, die über CSS-Klassen formatiert sind, welche durch die [timeline_cell_class](api/template/timeline_cell_class.md) Template-Funktion zugewiesen werden.

Um zum Verhalten aus Version 6.1 zurückzukehren (das nur das Hintergrundbild rendert), kann die [static_background_cells](api/config/static_background_cells.md) Konfiguration verwendet werden:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- ["Performance: Möglichkeiten zur Verbesserung"](guides/performance.md)

