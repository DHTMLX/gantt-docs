---
sidebar_label: order_branch_free
title: order_branch_free Konfiguration
description: "aktiviert den 'branch'-Modus, der das Neuordnen von Aufgaben im gesamten Gantt-Diagramm ermöglicht"
---

# order_branch_free

### Description

@short: Aktiviert den 'branch'-Modus, der das Neuordnen von Aufgaben im gesamten Gantt ermöglicht

@signature: order_branch_free: boolean

### Example

~~~jsx
// Neuordnung von Tasks innerhalb derselben Verschachtelungsebene
gantt.config.order_branch = true;
// Neuordnung von Tasks überall im gesamten Gantt-Diagramm
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Ziehen und Ablegen von Zeilen im Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Aufgaben neu ordnen](guides/reordering-tasks.md)