---
sidebar_label: process_resource_assignments
title: конфигурация process_resource_assignments
description: "включает/выключает разбор назначений ресурсов"
---

# process_resource_assignments

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Включает/выключает парсинг назначений ресурсов

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Значение по умолчанию:** true

### Related samples
- [Назначение значений ресурсов на конкретные дни](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

Когда вы [назначаете ресурсы на конкретное время выполнения задачи](guides/resource-management.md#resourceassignmenttime), эта функциональность требует включения свойства **process_resource_assignments**.
Это связано с тем, что свойство обеспечивает парсинг значений из [gantt.config.resource_property](api/config/resource_property.md) задач во внутренние объекты назначений ресурсов. 

В результате вы сможете манипулировать назначениями ресурсов через объект DataStore, например получить нужный объект назначения или обновить его.

Но если вам нужно просто назначать ресурсы задачам без указания времени или длительности назначения, можно отключить парсинг назначений, установив конфигурацию:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [Управление ресурсами](guides/resource-management.md)

### Change log
- добавлено в v7.1