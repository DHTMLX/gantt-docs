---
sidebar_label: inherit_calendar
title: inherit_calendar config
description: "definiert, ob Aufgaben die Arbeitskalender von ihren übergeordneten Summary-Aufgaben erben sollen"
---

# inherit_calendar
:::info
 Diese Funktion ist nur in der PRO-Version verfügbar. 
:::
### Description

@short: Definiert, ob Aufgaben die Arbeitskalender von ihren übergeordneten Summary-Aufgaben erben sollen

@signature: inherit_calendar: boolean

### Example

~~~jsx
gantt.config.inherit_calendar = true;
~~~

**Default value:** false

### Related samples
- [Project level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/08_project_calendars.html)

### Details


Standardmäßig verwenden Aufgaben ohne einen angegebenen Arbeitskalender den globalen Arbeitskalender.

Wenn diese Option auf `true` gesetzt ist, übernehmen diese Aufgaben den Kalender ihrer übergeordneten Summary-(Projekt-)Aufgabe.

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)
