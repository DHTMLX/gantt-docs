---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "возвращает все задачи и связи, связанные с конкретной задачей"
---

# getConnectedGroup
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает все задачи и связи, связанные с конкретной задачей

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters

- `id` - (optional) *string | number* - необязательный, идентификатор задачи

### Returns
- ` connections` - (object) - объект, содержащий задачи и связи, связанные с указанной задачей

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

При вызове без параметров этот метод возвращает все группы задач и связей, образующих соединения.

:::note
 Для работы метода необходимо подключить плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) на странице. 
:::

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)
