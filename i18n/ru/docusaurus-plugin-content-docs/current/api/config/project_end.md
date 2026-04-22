---
sidebar_label: project_end
title: конфигурация project_end
description: "указывает конечную дату проекта"
---

# project_end

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Указывает конечную дату проекта

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Автоматическое планирование от конца проекта (обратное)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Значение этой конфигурации может использоваться как дата окончания по умолчанию для новых задач, когда включено обратное планирование.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)