---
sidebar_label: process_resource_assignments
title: process_resource_assignments config
description: "включает или отключает разбор назначений ресурсов"
---

# process_resource_assignments
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Включает или отключает разбор назначений ресурсов

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details


При назначении ресурсов на конкретное время в задаче требуется включить свойство **process_resource_assignments**.
Это необходимо, поскольку данное свойство отвечает за разбор значений из [gantt.config.resource_property](api/config/resource_property.md) задач в внутренние объекты назначений ресурсов.

Это позволяет работать с назначениями ресурсов через объект DataStore, например, получать или обновлять объекты назначений.


Если ваша задача - просто назначить ресурсы задачам без установки конкретного времени или длительности для назначений, вы можете отключить разбор назначений с помощью этой настройки:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [Управление ресурсами](guides/resource-management.md#managingresourceassignments)

### Change log
- добавлено в версии v7.1

