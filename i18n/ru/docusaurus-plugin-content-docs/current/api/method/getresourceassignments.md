---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "возвращает все задачи, связанные с указанным ресурсом"
---

# getResourceAssignments
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает все задачи, связанные с указанным ресурсом

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - идентификатор ресурса
- `taskId` - (required) *string | number* - идентификатор задачи

### Returns
- ` assignments` - (ResourceAssignment[]) - массив объектов, представляющих задачи, назначенные ресурсу

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> отображаются детали
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Этот метод возвращает массив объектов со следующей структурой:

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

- **id** - (*string | number*) - уникальный идентификатор назначения
- **task_id** - (*string | number*) - ID задачи, назначенной ресурсу
- **resource_id** - (*string | number*) - ID ресурса, назначенного задаче
- **value** - (*number | string*) - количество ресурса, выделенного на задачу
- **delay** - (*number*) - смещение между датой начала назначения и датой начала задачи
- **start_date** - (*Date*) - дата, когда назначение планируется начать
- **end_date** - (*Date*) - дата, когда назначение планируется завершить
- **duration** - (*number*) - продолжительность назначения
- **mode** - (*string*) - режим, используемый для расчёта времени назначения ресурса: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - любые дополнительные пользовательские свойства


:::note
 Свойства *delay*, *duration*, *start_date*, *end_date*, *id* и *mode* заполняются автоматически только при включённом [process_resource_assignments](api/config/process_resource_assignments.md). 
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- начиная с v7.1, возвращаемый объект включает свойства *delay*, *duration*, *start_date*, *end_date*, *id* и *mode*

