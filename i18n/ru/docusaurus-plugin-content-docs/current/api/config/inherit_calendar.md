---
sidebar_label: inherit_calendar
title: inherit_calendar config
description: "определяет, должны ли задачи наследовать рабочие календари от своих родительских задач-итогов"
---

# inherit_calendar
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, должны ли задачи наследовать рабочие календари от своих родительских задач-итогов

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

По умолчанию задачи без заданного рабочего календаря используют глобальный рабочий календарь.

Если эта опция установлена в `true`, такие задачи будут использовать календарь своей родительской задачи-итога (проекта).

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md)
