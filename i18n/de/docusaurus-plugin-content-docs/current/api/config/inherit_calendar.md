---
sidebar_label: inherit_calendar
title: inherit_calendar Konfiguration
description: "definiert, ob Aufgaben Arbeitskalender von ihren übergeordneten Aufgaben übernehmen sollen"
---

# inherit_calendar

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Definiert, ob Aufgaben Arbeitskalender von ihren übergeordneten Aufgaben übernehmen sollen

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Standardwert:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details

:::note
Hinweis: Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Standardmäßig verwenden Aufgaben, denen kein Arbeitskalender zugewiesen ist, den globalen Arbeitskalender.

Nachdem diese Konfiguration auf `true` gesetzt wurde, verwenden solche Aufgaben den Kalender ihrer Summen- bzw. Projekt-Elternaufgabe.

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)
