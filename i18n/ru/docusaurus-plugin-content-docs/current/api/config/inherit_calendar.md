---
sidebar_label: inherit_calendar
title: конфигурация inherit_calendar
description: "определяет, следует ли задачам наследовать рабочие календари от их сводных родителей"
---

# inherit_calendar

:::info
Эта функциональность доступна только в PRO-версии.
:::

### Description

@short: Определяет, должны ли задачи наследовать рабочие календари от своих сводных родительских задач

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Значение по умолчанию:** false

### Related samples
- [Календари уровня проекта](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

:::note
pronote Эта функциональность доступна только в PRO-версии.
::: 

По умолчанию задачи, для которых не задан рабочий календарь, будут использовать глобальный рабочий календарь.

После установки этой конфигурации в значение `true` такие задачи будут использовать календарь их сводного (проектного) родительского задания.

### Related Guides
- [Расчет рабочего времени](guides/working-time.md)