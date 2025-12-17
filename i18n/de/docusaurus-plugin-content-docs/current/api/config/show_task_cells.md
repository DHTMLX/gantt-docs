---
sidebar_label: show_task_cells
title: show_task_cells config
description: "Schaltet die Spaltenränder im Chart-Bereich ein oder aus"
---

# show_task_cells

### Description

@short: Schaltet die Spaltenränder im Chart-Bereich ein oder aus

@signature: show_task_cells: boolean

### Example

~~~jsx
//blendet die Spaltenränder in der Zeitachse aus
gantt.config.show_task_cells = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Wenn diese Eigenschaft auf *'false'* gesetzt wird, werden die einzelnen Zellen nicht mehr gezeichnet, sondern nur noch die Zeilen angezeigt.<br> Dies kann die Performance verbessern, insbesondere bei einer großen Anzahl von Tasks im Chart.
