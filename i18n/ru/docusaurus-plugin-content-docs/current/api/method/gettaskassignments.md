---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "получает разобранные назначения ресурсов для конкретной задачи из хранилища данных"
---

# getTaskAssignments
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Получает разобранные назначения ресурсов для конкретной задачи из хранилища данных

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string* - | number    ID задачи

### Returns
- ` param` - (ResourceAssignment[]) - массив объектов, представляющих назначения ресурсов для задачи

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> см. детали
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Метод **getTaskAssignments** не будет работать, если [process_resource_assignments](api/config/process_resource_assignments.md) отключён. 
:::

Метод возвращает массив объектов со структурой:

~~~js
[
    {
        task_id: 5,
        id: 1617254693938, 
        delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 3
    },
    {
        task_id: 5,
        id: 1617254693946, 
        delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 6
    }
]
~~~

Каждый объект содержит следующие свойства:

- **id** - (*string | number*) - уникальный ID назначения
- **task_id** - (*string | number*) - ID задачи, к которой назначен ресурс
- **resource_id** - (*string | number*) - ID ресурса, назначенного на задачу
- **value** - (*number | string*) - количество ресурсов, выделенных на задачу
- **delay** - (*number*) - смещение между датой начала назначения и датой начала задачи
- **start_date** - (*Date*) - дата начала назначения
- **end_date** - (*Date*) - дата окончания назначения
- **duration** - (*number*) - продолжительность назначения
- **mode** - (*string*) - метод расчёта времени назначения ресурса: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - любые дополнительные пользовательские свойства


:::note
 Свойства *delay*, *duration*, *start_date*, *end_date*, *id* и *mode* автоматически заполняются только если [process_resource_assignments](api/config/process_resource_assignments.md) включён. 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#assigningresources)

### Change log
- добавлено в v7.1

