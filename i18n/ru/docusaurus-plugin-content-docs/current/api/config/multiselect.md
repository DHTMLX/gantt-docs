---
sidebar_label: multiselect
title: multiselect config
description: "управляет возможностью выбора нескольких задач одновременно на диаграмме Ганта"
---

# multiselect

### Description

@short: Управляет возможностью выбора нескольких задач одновременно на диаграмме Ганта

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; // отключает выбор нескольких задач
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
 Эта настройка является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Подробнее можно узнать в статье [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

