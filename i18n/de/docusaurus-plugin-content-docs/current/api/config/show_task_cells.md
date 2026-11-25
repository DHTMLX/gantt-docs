---
sidebar_label: show_task_cells
title: show_task_cells Konfiguration
description: "Aktiviert/deaktiviert die Anzeige von Spaltenrändern im Diagrammbereich"
---

# show_task_cells

### Description

@short: Aktiviert/deaktiviert die Anzeige von Spaltenrändern im Diagrammbereich

@signature: show_task_cells: boolean

### Example

~~~jsx
//blendet die Spaltenränder in der Zeitachse aus
gantt.config.show_task_cells = false;

gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Wenn die Eigenschaft auf *'false'* gesetzt ist, deaktiviert sie das Rendering der einzelnen Zellen – es werden nur Zeilen gerendert.

### Related API
- [timeline_cell_class](api/template/timeline_cell_class.md)