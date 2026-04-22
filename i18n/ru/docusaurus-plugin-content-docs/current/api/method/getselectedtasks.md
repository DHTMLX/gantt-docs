---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "возвращает массив текущих выбранных задач"
---

# getSelectedTasks

### Description

@short: Возвращает массив текущих выбранных задач

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - массив идентификаторов задач

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
Этот метод определён в расширении **multiselect**, поэтому нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности смотрите в статье [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)