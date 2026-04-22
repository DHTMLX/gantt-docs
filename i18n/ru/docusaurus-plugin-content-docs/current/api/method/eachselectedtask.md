---
sidebar_label: eachSelectedTask
title: метод eachSelectedTask
description: "перебирает все выбранные задачи на диаграмме Ганта"
---

# eachSelectedTask

### Description

@short: Перебирает все выбранные задачи на диаграмме Ганта

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (required) *function* - функция, которая будет перебирать задачи. Принимает идентификатор задачи в качестве параметра

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
- [Множественный выбор и Indent/Outdent задач](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
Этот метод определяется в расширении **multiselect**, поэтому нужно активировать плагин [multiselect](guides/extensions-list.md#multitaskselection). Подробности читайте в статье [Multi-Task Selection](guides/multiselection.md).
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
- [Выбор нескольких задач](guides/multiselection.md)