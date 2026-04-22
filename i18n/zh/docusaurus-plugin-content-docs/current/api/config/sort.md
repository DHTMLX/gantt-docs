---
sidebar_label: sort
title: sort config
description: "允许在表格中进行排序"
---

# sort

### Description

@short: 启用表格中的排序

@signature: sort: boolean

### Example

~~~jsx
gantt.config.sort = true;

gantt.init("gantt_here");
gantt.parse("tasks.json");
~~~

**默认值：** false

### Related samples
- [Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)

### Related API
- [sort](api/method/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [Sorting Columns](guides/sorting.md)