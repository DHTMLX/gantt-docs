---
sidebar_label: eachSelectedTask
title: eachSelectedTask method
description: "проходит по всем выбранным задачам на диаграмме Ганта"
---

# eachSelectedTask

### Description

@short: Проходит по всем выбранным задачам на диаграмме Ганта

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (required) *function* - функция, которая будет выполнена для каждой выбранной задачи. В качестве аргумента она получает id задачи

### Example

~~~jsx
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
 Этот метод является частью расширения **multiselect**, поэтому убедитесь, что плагин [multiselect](guides/extensions-list.md#multitaskselection) включен. Более подробную информацию можно найти в статье [Множественный выбор задач](guides/multiselection.md). 
:::

### Related API
- [eachTask](api/method/eachtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)
- [batchUpdate](api/method/batchupdate.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

