---
sidebar_label: autoSchedule
title: autoSchedule method
description: "автоматически обновляет расписание проекта"
---

# autoSchedule
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Автоматически обновляет расписание проекта

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters

- `taskId` - (optional) *string | number* -        необязательно, идентификатор задачи

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

Чтобы обновить расписание, начиная с конкретной задачи, просто передайте id задачи в качестве аргумента методу **autoSchedule()**:

~~~js
gantt.autoSchedule(taskId);
~~~


:::note
 Убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) подключен на странице, так как он необходим для работы этого метода. 
:::

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)
