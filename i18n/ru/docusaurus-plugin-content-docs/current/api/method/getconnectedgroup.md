---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "возвращает все задачи и связи, с которыми связана задача"
---

# getConnectedGroup

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Возвращает все задачи и связи, с которыми связана задача

@signature: getConnectedGroup: (id?: string | number) => any

### Parameters
- `name` - (optional) *string | number* - идентификатор задачи

### Returns
- ` connections` - (object) - объект, содержащий задачи и связи, с которыми связана задача

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

Без параметров метод возвращает все группы задач и связей, которые образуют соединения.

:::note
 Метод требует, чтобы на странице был подключен плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) для автоматического планирования.
:::

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)