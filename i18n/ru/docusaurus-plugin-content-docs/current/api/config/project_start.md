---
sidebar_label: project_start
title: project_start config
description: "устанавливает дату начала проекта"
---

# project_start
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Устанавливает дату начала проекта

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

Этот параметр задаёт дату начала по умолчанию для новых задач при включённом авторассчитывании расписания.

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)
