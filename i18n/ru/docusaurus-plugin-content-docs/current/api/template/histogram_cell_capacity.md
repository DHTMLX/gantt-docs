---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity template
description: "определяет высоту линии, которая отображает доступную ёмкость ресурса"
---

# histogram_cell_capacity
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет высоту линии, которая отображает доступную ёмкость ресурса

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные ресурсу и пересекающиеся с датами начала/окончания ячейки
- `assignments` - (required) *array* - назначения ресурса, связанные с указанными датами начала/окончания задачи

### Returns
- ` height` - (number | void) - высота линии, указывающей доступную ёмкость ресурса

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
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

Возвращаемое значение шаблона может быть в диапазоне от -1 до maxCapacity. Значения меньше 0 предотвратят отрисовку линии.

**Пояснение maxCapacity**

Представьте каждую строку гистограммы как столбчатую диаграмму; maxCapacity - это высота по оси Y этой диаграммы. На изображении ниже maxCapacity равен 24:

![maxCapacity](/img/maxcapacity.png)

По умолчанию **maxCapacity** установлен в 24 для всех ресурсов. Возвращение значения выше 24 в шаблоне *histogram_cell_capacity* будет корректно вычислено, но области ячеек в панели ресурсов могут не заполниться как ожидается.

![filled_capacity](/img/filled_capacity.png)

Также существует возможность настроить **maxCapacity** глобально для всей гистограммы или индивидуально для каждого ресурса. См. пример ниже:

:::note
Sample: [Настройка maxCapacity](https://snippet.dhtmlx.com/glnqcsgq) 
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#resourceviewpanel)

### Change log
- параметр **assignments** добавлен в версии v7.1

