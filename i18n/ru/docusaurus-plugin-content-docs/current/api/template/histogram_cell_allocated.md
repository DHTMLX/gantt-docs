---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated template
description: "устанавливает высоту заполненной части в resourceHistogram"
---

# histogram_cell_allocated
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Устанавливает высоту заполненной части в resourceHistogram

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные данному ресурсу, пересекающиеся с началом/концом ячейки
- `assignments` - (required) *array* - назначения ресурса, связанные с указанными начальной/конечной датами задачи

### Returns
- ` height` - (number | void) - высота заполненной части в resourceHistogram

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
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
 Параметр "assignments" доступен только при включённой конфигурации [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

Возвращаемое значение шаблона может варьироваться от 0 до *maxCapacity*.

**Объяснение maxCapacity**

Если рассматривать каждую строку гистограммы как столбчатую диаграмму, maxCapacity представляет высоту оси Y этой диаграммы. На примере ниже maxCapacity равен 24:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** был добавлен в версии v7.1

