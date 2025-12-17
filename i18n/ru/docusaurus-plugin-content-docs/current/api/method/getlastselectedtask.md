---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "возвращает id самой последней выбранной задачи"
---

# getLastSelectedTask

### Description

@short: Возвращает id самой последней выбранной задачи

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - id самой последней выбранной задачи

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
 Этот метод является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включён. Более подробная информация доступна в статье [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

