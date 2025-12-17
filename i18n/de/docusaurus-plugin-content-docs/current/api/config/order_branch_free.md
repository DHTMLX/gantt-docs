---
sidebar_label: order_branch_free
title: order_branch_free config
description: "ermöglicht den 'branch'-Modus, der es erlaubt, Tasks überall innerhalb des gesamten Gantt-Diagramms neu anzuordnen"
---

# order_branch_free

### Description

@short: Ermöglicht den 'branch'-Modus, der es erlaubt, Tasks überall innerhalb des gesamten Gantt-Diagramms neu anzuordnen

@signature: order_branch_free: boolean

### Example

~~~jsx
// Neuordnung von Tasks innerhalb derselben Verschachtelungsebene
gantt.config.order_branch = true;
// Neuordnung von Tasks überall im gesamten Gantt-Diagramm
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- ["Aufgaben neu anordnen"](guides/reordering-tasks.md)

