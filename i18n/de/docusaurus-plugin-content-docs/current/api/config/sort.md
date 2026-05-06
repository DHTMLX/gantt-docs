---
sidebar_label: sort
title: sort config
description: "ermöglicht das Sortieren innerhalb der Tabelle"
---

# sort

### Description

@short: Ermöglicht das Sortieren in der Tabelle

@signature: sort: boolean

### Example

~~~jsx
gantt.config.sort = true;

gantt.init("gantt_here");
gantt.parse("tasks.json");
~~~

**Standardwert:** false

### Related samples
- [Eingebaute Sortierung](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)

### Related API
- [sort](api/method/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Spalten sortieren](guides/sorting.md)