---
sidebar_label: work_time
title: work_time Konfiguration
description: "ermöglicht die Berechnung der Dauer von Aufgaben in Arbeitszeit statt Kalenderzeit"
---

# work_time

### Description

@short: Ermöglicht die Berechnung der Dauer von Aufgaben in Arbeitszeit statt Kalenderzeit

@signature: work_time: boolean

### Example

~~~jsx
//zeigt die Dauer in Arbeitsstunden an und schließt nicht-arbeitszeitliche Perioden aus dem Chart aus
gantt.config.duration_unit = "hour";
gantt.config.work_time = true;

gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Dauer umfasst nur Arbeitstage](https://docs.dhtmlx.com/gantt/samples/09_worktime/02_working_days.html)
- [Arbeitsstunden berechnen](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [skip_off_time](api/config/skip_off_time.md)

### Related Guides
- [Arbeitszeitberechnung](guides/working-time.md)