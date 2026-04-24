---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "возвращает все задачи, назначенные ресурсу"
---

# getResourceAssignments

:::info
Эта функциональность доступна только в PRO-версии.  
:::

### Description

@short: Возвращает все задачи, назначенные ресурсу

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) => ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - идентификатор ресурса
- `taskId` - (required) *string | number* - идентификатор задачи, к которой назначен ресурс


### Returns
- `assignments` - (ResourceAssignment[]) - массив объектов, в которых задачи назначены ресурсу

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> see details
~~~

### Related samples
- [Гистограмма ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Назначение рабочей нагрузки в процентах](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Рабочие и материальные ресурсы](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Метод возвращает массив объектов, как показано ниже:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

Каждый объект содержит следующие свойства:

- **id** - (*string | number*) - идентификатор назначения
- **task_id** - (*string | number*) - ID задачи, к которой назначен ресурс
- **resource_id** - (*string | number*) - ID ресурса, назначенного задаче
- **value** - (*number | string*) - количество ресурсов, назначенных задаче
- **delay** - (*number*) - разница между датой начала назначения и датой начала задачи
- **start_date** - (*Date*) - дата начала назначения
- **end_date** - (*Date*) - дата окончания назначения
- **duration** - (*number*) - продолжительность назначения
- **mode** - (*string*) - режим расчета времени назначения ресурса: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - любое произвольное свойство

:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* будут заполняться автоматически только если включен [process_resource_assignments](api/config/process_resource_assignments.md).  
 :::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- возвращаемый объект будет содержать свойства *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* начиная с версии v7.1