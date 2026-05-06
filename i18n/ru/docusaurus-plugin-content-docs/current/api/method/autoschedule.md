---
sidebar_label: autoSchedule
title: Метод autoSchedule
description: "Пересчитывает расписание проекта"
---

# autoSchedule

:::info
Эта функция доступна только в PRO-издании.
:::

### Description

@short: Пересчитывает расписание проекта

@signature: autoSchedule: (taskId?: string | number) => void

### Parameters
- `taskId` - (необязательный) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

Чтобы пересчитать расписание для группы связанных задач, передайте идентификатор одной из задач в этой группе в качестве аргумента методу **autoSchedule()**:

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
Метод требует подключения плагина [auto_scheduling](guides/extensions-list.md#autoscheduling) к странице.
:::

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)