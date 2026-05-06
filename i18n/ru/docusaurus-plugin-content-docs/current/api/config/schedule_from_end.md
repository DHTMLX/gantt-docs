---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "включает обратное планирование"
---

# schedule_from_end
:::info
Эта функциональность доступна только в версии PRO.
:::

:::warning
Свойство устарело в версии v9.1, используйте свойство `schedule_from_end` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_from_end) вместо этого.
:::
### Description

@short: Включает обратное планирование

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2025, 10, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Установка этого параметра в значение `true` переключит автоматическое планирование на режим `as late as possible`.

Значение будет применяться только если также указан [project_end](api/config/project_end.md).

### Related API
- [project_end](api/config/project_end.md)
- [auto_scheduling](api/config/auto_scheduling.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- свойство устарело в версии v9.1