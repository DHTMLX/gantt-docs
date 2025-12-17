---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "включает обратное планирование"
---

# schedule_from_end
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Включает обратное планирование

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details


Включение этой опции путём установки значения `true` переключает режим автопланирования на «как можно позже».

Эта настройка вступает в силу только если также задан [project_end](api/config/project_end.md).

### Related API
- [project_end](api/config/project_end.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

