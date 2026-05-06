---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated шаблон
description: "определяет высоту заполненной области в resourceHistogram"
---

# histogram_cell_allocated
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет высоту заполненной области в resourceHistogram

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные для указанного ресурса и перекрывающие даты начала/конца ячейки
- `assignments` - (required) *array* - назначения ресурса, которые назначены на указанные даты начала/конца задачи

### Returns
- ` height` - (number | void) - высота заполненной области в resourceHistogram

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
    assignments){
     return tasks.length * 8;
};
~~~

### Related samples
- [Гистограмма ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Назначение загрузки в процентах](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Аргумент "assignments" доступен только когда включена конфигурация [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

Значение шаблона может быть от 0 до *maxCapacity*.

**Определение maxCapacity**

Если рассматривать каждую строку гистограммы как столбчатую диаграмму, maxCapacity — высота Y-оси этой диаграммы. На изображении ниже maxCapacity = 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Resource Management](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** добавлен в версии v7.1