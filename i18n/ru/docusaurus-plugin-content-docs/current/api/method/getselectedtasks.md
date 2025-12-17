---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "возвращает массив выбранных в данный момент задач"
---

# getSelectedTasks

### Description

@short: Возвращает массив выбранных в данный момент задач

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (массив) - массив идентификаторов задач

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
 Этот метод предоставляется расширением **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Для подробностей смотрите статью [Множественный выбор задач](guides/multiselection.md). 
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
- [Множественный выбор задач](guides/multiselection.md)

