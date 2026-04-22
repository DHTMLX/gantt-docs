---
sidebar_label: task_date
title: task_date Konfiguration
description: "legt das Format des Datumslabels im Bereich 'Zeitraum' des Lightboxes fest"
---

# task_date

### Description

@short: Legt das Format des Datumslabels im Bereich 'Zeitraum' des Lightboxes fest

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Standardwert:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)