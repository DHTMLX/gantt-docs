---
sidebar_label: auto_scheduling_compatibility
title: Auto_scheduling_compatibility config
description: "Отключает использование ограничений по времени для задач"
---

# auto_scheduling_compatibility

:::info
Эта функциональность доступна только в PRO-версии.
:::

:::warning
Свойство устарело в версии v9.1, используйте свойство `apply_constraints` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#apply_constraints) вместо этого.
:::

### Description

@short: Отключает использование ограничений по времени для задач

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
Эта конфигурация определяется в расширении **auto_scheduling**, поэтому необходимо включить плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности смотрите в статье [Auto Scheduling](guides/auto-scheduling.md).
:::

Функциональность [time constraints] была введена в версии v6.1 для улучшения логики автоматического планирования Gantt. 
Конфигурация **auto_scheduling_compatibility** была добавлена для [обеспечения обратной совместимости с предыдущими версиями](guides/auto-scheduling.md#version-compatibility).

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии v6.1 для совместимости с более ранними версиями