---
sidebar_label: getTaskAssignments
title: метод getTaskAssignments
description: "возвращает распарсенные назначения ресурсов конкретной задачи из хранилища данных"
---

# getTaskAssignments

:::info
This functionality is available in the PRO edition only. 
::: 

### Description

@short: Возвращает распарсенные назначения ресурсов конкретной задачи из хранилища данных

@signature: getTaskAssignments: (taskId: string | number) => ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* - идентификатор задачи

### Returns
- ` param` - (ResourceAssignment[]) - массив объектов с назначениями ресурсов для задачи

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> see details
~~~

### Related samples
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
Метод **getTaskAssignments** недоступен, если отключён [process_resource_assignments](api/config/process_resource_assignments.md). 
::: 

Метод возвращает массив объектов, как показано ниже:

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

- **id** - (*string | number*) - идентификатор назначения
- **task_id** - (*string | number*) - идентификатор задачи, к которой привязан ресурс
- **resource_id** - (*string | number*) - идентификатор ресурса, назначенного на задачу
- **value** - (*number | string*) - количество ресурсов, назначенных на задачу
- **delay** - (*number*) - разница между датой начала назначения и датой начала задачи
- **start_date** - (*Date*) - дата начала назначения
- **end_date** - (*Date*) - дата окончания назначения
- **duration** - (*number*) - продолжительность назначения
- **mode** - (*string*) - режим расчета времени для назначения ресурса: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - любое пользовательское свойство


:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* будут автоматически заполняться только при включённом [process_resource_assignments](api/config/process_resource_assignments.md). 
::: 

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md#assigningresources)

### Change log
- добавлено в версии v7.1