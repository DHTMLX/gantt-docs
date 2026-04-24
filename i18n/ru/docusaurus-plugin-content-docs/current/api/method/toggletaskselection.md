---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "переключает выделение указанной задачи: если задача не была выделена — она становится выделенной, иначе выделение снимается"
---

# toggleTaskSelection

### Description

@short: Переключает выделение указанной задачи: если задача не была выделена — выделяется, иначе выделение снимается

@signature: toggleTaskSelection: (taskId: string | number) => void

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
Этот метод определяется в расширении **multiselect**, поэтому необходимо активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности смотрите в статье [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)