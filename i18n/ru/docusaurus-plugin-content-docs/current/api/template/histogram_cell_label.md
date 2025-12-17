---
sidebar_label: histogram_cell_label
title: histogram_cell_label template
description: "определяет label, отображаемый внутри ячейки"
---

# histogram_cell_label
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет label, отображаемый внутри ячейки

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса, связанный с ячейкой
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные указанному ресурсу, которые пересекаются с начальной и конечной датами ячейки
- `assignments` - (required) *array* - назначения ресурса, связанные с указанными датами начала/окончания задач

### Returns
- ` label` - (string | number | void) - HTML-строка или число, используемые как label внутри ячейки гистограммы

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
 Параметр "assignments" передается только при включенной конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** был добавлен в версии 7.1

