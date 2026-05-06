---
sidebar_label: multiselect
title: Конфигурация multiselect
description: "включает/выключает выбор нескольких задач в диаграмме Ганта"
---

# multiselect

### Description

@short: Включает/выключает многозадачный выбор в диаграмме Ганта

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; //disables multi-task selection
gantt.init('gantt_here');
~~~

**Значение по умолчанию:** true

### Details

:::note
Эта опция определяется в расширении **multiselect**, поэтому вам нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)