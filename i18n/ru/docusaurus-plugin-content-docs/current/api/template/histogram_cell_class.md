---
sidebar_label: histogram_cell_class
title: шаблон histogram_cell_class
description: "определяет CSS-класс, который применяется к ячейке панели ресурсов"
---

# histogram_cell_class
:::info
Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Определяет CSS-класс, который применяется к ячейке панели ресурсов

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) => string | void;

### Parameters

- `start_date` - (required) *Date* - дата начала ячейки шкалы  
- `end_date` - (required) *Date* - дата окончания ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные указанному ресурсу и перекрывающие даты начала/окончания ячейки
- `assignments` - (required) *array* - назначения ресурсов, которые назначены на указанные даты начала/окончания задачи

### Returns
- ` className` - (string | void) - CSS-класс для ячейки временной шкалы диаграммы Ганта

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Аргумент "assignments" доступен только когда включена конфигурация [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

### Related API
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** добавлен в версии v7.1