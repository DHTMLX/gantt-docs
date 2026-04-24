---
sidebar_label: isSelectedTask
title: isSelectedTask метод
description: "проверяет, выбрана ли указанная задача в данный момент"
---

# isSelectedTask

### Description

@short: Проверяет, выбрана ли указанная задача в данный момент

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* - идентификатор задачи

### Returns
- ` value` - (boolean) - 'true' если указанная задача в данный момент выбрана, иначе - 'false'

### Example

~~~jsx
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
Этот метод определяется в расширении **multiselect**, поэтому вам необходимо активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)