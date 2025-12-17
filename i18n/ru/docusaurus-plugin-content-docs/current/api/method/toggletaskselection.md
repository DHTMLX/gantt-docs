---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "переключает состояние выбора указанной задачи - выбирает её, если она не выбрана, или снимает выбор, если она уже выбрана"
---

# toggleTaskSelection

### Description

@short: Переключает состояние выбора указанной задачи - выбирает её, если она не выбрана, или снимает выбор, если она уже выбрана

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -        ID задачи

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
note Этот метод является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включён. Для получения дополнительной информации смотрите статью [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

