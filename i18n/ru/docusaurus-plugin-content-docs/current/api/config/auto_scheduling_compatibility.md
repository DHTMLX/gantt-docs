---
sidebar_label: auto_scheduling_compatibility
title: auto_scheduling_compatibility config
description: "отключает использование временных ограничений для задач"
---

# auto_scheduling_compatibility
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Отключает использование временных ограничений для задач

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details


:::note
 Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Для получения дополнительной информации смотрите статью [Автоматическое планирование](guides/auto-scheduling.md). 
:::

Функционал [временных ограничений](guides/auto-scheduling.md#timeconstraintsfortasks) был введён в версии 6.1 для расширения возможностей авто-планирования в Gantt. 
Опция **auto_scheduling_compatibility** была добавлена для [поддержки совместимости с предыдущими версиями](guides/auto-scheduling.md#versioncompatibility).

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии 6.1 для поддержки совместимости с предыдущими версиями
