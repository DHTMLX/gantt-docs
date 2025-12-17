---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "проверяет, выбрана ли в данный момент указанная задача"
---

# isSelectedTask

### Description

@short: Проверяет, выбрана ли в данный момент указанная задача

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* -    идентификатор задачи

### Returns
- ` value` - (boolean) - возвращает 'true', если задача выбрана, иначе 'false'

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
note Этот метод предоставляется расширением **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Дополнительную информацию можно найти в статье [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

