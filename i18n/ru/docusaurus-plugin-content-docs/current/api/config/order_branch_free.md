---
sidebar_label: order_branch_free
title: Конфигурация order_branch_free
description: "активирует режим 'branch', который позволяет переупорядочивать задачи во всей диаграмме Ганта"
---

# order_branch_free

### Description

@short: Activates the 'branch' mode that allows reordering tasks within the whole gantt

@signature: order_branch_free: boolean

### Example

~~~jsx
// переупорядочивание задач на одном уровне вложенности
gantt.config.order_branch = true;
// переупорядочивание задач по всей диаграмме Ганта
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Related samples
- [Перетаскивание строк в Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Переупорядочение задач](guides/reordering-tasks.md)