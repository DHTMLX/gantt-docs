---
sidebar_label: sort
title: sort config
description: "enables sorting in the table"
---

# sort

### Description

@short: Enables sorting in the table

@signature: sort: boolean

### Example

~~~jsx
gantt.config.sort = true;

gantt.init("gantt_here");
gantt.parse("tasks.json");
~~~

**Default value:** false

### Related samples
- [Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)

### Related API
- [sort](api/method/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Sorting Columns](guides/sorting.md)

