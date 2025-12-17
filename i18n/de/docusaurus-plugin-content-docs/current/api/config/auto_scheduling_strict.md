---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "aktiviert den Auto-Scheduling-Modus, bei dem Aufgaben bei jeder Änderung auf das frühestmögliche Datum neu geplant werden"
---

# auto_scheduling_strict
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Aktiviert den Auto-Scheduling-Modus, bei dem Aufgaben bei jeder Änderung auf das frühestmögliche Datum neu geplant werden

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
note Diese Einstellung ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md).<br>

Beachten Sie, dass diese Konfiguration in den Versionen 6.1.0 bis 7.1.3 nur funktioniert, wenn die Option [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist. 
:::


Normalerweise werden Aufgaben nur dann neu geplant, wenn ein neues Datum eine Einschränkung verletzt.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

