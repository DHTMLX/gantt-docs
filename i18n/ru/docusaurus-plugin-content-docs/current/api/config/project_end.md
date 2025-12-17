---
sidebar_label: project_end
title: project_end config
description: "устанавливает дату окончания проекта"
---

# project_end
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Устанавливает дату окончания проекта

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Этот параметр может использоваться как дата окончания по умолчанию для новых задач при включенном обратном планировании.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

