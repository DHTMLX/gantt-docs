--- 
sidebar_label: getLastSelectedTask
title: метод getLastSelectedTask
description: "возвращает идентификатор последней выбранной задачи"
---

# getLastSelectedTask

### Description

@short: Возвращает идентификатор последней выбранной задачи

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - идентификатор последней выбранной задачи

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
Этот метод определяется в расширении **multiselect**, поэтому необходимо активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)