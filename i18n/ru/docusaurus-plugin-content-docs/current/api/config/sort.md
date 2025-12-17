---
sidebar_label: sort
title: sort config
description: "позволяет выполнять сортировку внутри таблицы"
---

# sort

### Description

@short: Позволяет выполнять сортировку внутри таблицы

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
- [Сортировка столбцов](guides/sorting.md)

