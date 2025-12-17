---
sidebar_label: getTaskResources
title: getTaskResources method
description: "получает список уникальных ресурсов, назначенных конкретной задаче из хранилища данных"
---

# getTaskResources
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Получает список уникальных ресурсов, назначенных конкретной задаче из хранилища данных

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    идентификатор задачи

### Returns
- ` param` - (ResourceItem[]) - массив объектов ресурсов

### Example

~~~jsx
gantt.getTaskResources(5); // -> см. детали
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 Метод **getTaskResources** не будет работать, если [process_resource_assignments](api/config/process_resource_assignments.md) отключен. 
:::

Этот метод возвращает массив объектов **resourceItem** со следующими свойствами:

- **id** - (*string | number*) - ID элемента ресурса
- **open?** - (*boolean*) - показывает, раскрыт (*true*) или свернут (*false*) элемент ресурса в дереве
- **parent?** - (*string | number*) - ID родительского элемента ресурса
- **text?** - (*string*) - имя ресурса
- **unit?** - (*string*) - единица измерения для назначений
- **[customProperty: string]** - (*any*) - любое дополнительное кастомное свойство


~~~js
[
    {id: 6, text: "John", parent:1, unit: "hours/day" },
    {id: 7, text: "Mike", parent:2, unit: "hours/day" }
]
~~~

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Управление ресурсами](guides/resource-management.md#assigningresources)

### Change log
- добавлено в версии v8.0

