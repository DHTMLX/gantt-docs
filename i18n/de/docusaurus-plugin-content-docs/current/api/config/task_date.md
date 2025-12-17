---
sidebar_label: task_date
title: task_date config
description: "definiert das Format für das Datumslabel, das im Abschnitt 'Time period' der Lightbox angezeigt wird"
---

# task_date

### Description

@short: Definiert das Format für das Datumslabel, das im Abschnitt „Time period" der Lightbox angezeigt wird

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Default value:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- ["Datumsformat-Spezifikation"](guides/date-format.md)

