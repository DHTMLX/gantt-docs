--- 
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity шаблон
description: "задает высоту линии, определяющей доступную емкость ресурса"
---

# histogram_cell_capacity
:::info
Эта функциональность доступна только в PRO-издании.
:::
### Description

@short: Задает высоту линии, определящей доступную емкость ресурса

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - начальная дата ячейки шкалы  
- `end_date` - (required) *Date* - конечная дата ячейки шкалы
- `resource` - (required) *object* - объект ресурса
- `tasks` - (required) *Array* - &lt;Task&gt;        задачи, назначенные указанному ресурсу и пересекающие даты начала/конца ячейки
- `assignments` - (required) *array* - назначения ресурсов, привязанные к указанным датам начала и конца задачи

### Returns
- ` height` - (number | void) - высота линии, определяющей доступную емкость ресурса

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
};
~~~

### Related Samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Аргумент "assignments" доступен только когда включена конфигурация [](api/config/process_resource_assignments.md) .
::: 

Значение шаблона может быть установлено от -1 до maxCapacity. Значения меньше 0 не будут отображаться как линия.

**Определение maxCapacity**

Если рассматривать каждую строку гистограммы как столбцовую диаграмму, maxCapacity — это высота Y-масштаба этой диаграммы. На приведённом ниже изображении maxCapacity = 24:

![maxCapacity](/img/maxcapacity.png)

По умолчанию **maxCapacity** равен 24 для всех ресурсов. Это означает, что если вернуть значение больше 24 в шаблоне *histogram_cell_capacity*, числа будут рассчитаны корректно, но площадь ячеек панели ресурсов может не заполниться так, как вы ожидаете.

![filled_capacity](/img/filled_capacity.png)

Однако есть возможность конфигурировать **maxCapacity** сразу для всей histogram и отдельно для каждого ресурса. См. пример ниже:

:::note
  https://snippet.dhtmlx.com/glnqcsgq Настройка maxCapacity 
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