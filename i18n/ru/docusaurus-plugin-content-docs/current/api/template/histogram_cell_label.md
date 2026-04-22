---
sidebar_label: histogram_cell_label
title: шаблон histogram_cell_label
description: "определяет метку внутри ячейки"
---

# histogram_cell_label
:::info
Эта функциональность доступна только в версии PRO.
:::
### Description

@short: Определяет метку внутри ячейки

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные указанному ресурсу и пересекающиеся с датами начала и конца ячейки
- `assignments` - (required) *array* - назначения ресурса, которые назначены на указанные даты начала и конца задачи

### Returns
- ` label` - (string | number | void) - HTML-текст для метки внутри ячейки гистограммы

### Example

~~~jsx
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
    assignments){
    return tasks.length * 8;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details
:::note
Аргумент "assignments" доступен только при включенной конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** добавлен в v7.1