---
sidebar_label: project_start
title: конфигурация project_start
description: "задает начальную дату проекта"
---

# project_start

:::info
Эта функциональность доступна только в версии PRO.
:::

### Description

@short: Указывает начальную дату проекта

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Автоматическое планирование от начала проекта и ограничений](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

Значение этой конфигурации может использоваться как дата начала по умолчанию для новых задач, когда включено автоматическое планирование.

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)