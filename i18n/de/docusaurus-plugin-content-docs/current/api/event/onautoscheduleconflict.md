--- 
sidebar_label: onAutoScheduleConflict
title: onAutoScheduleConflict event
description: "feuert bei jedem Konflikt, der während der automatischen Terminplanung gefunden wird"
---

# onAutoScheduleConflict
:::info
Diese Funktionalität ist in der PRO Edition nur verfügbar. 
:::
### Description

@short: Feuert bei jedem Konflikt, der während der automatischen Terminplanung gefunden wird

@signature: onAutoScheduleConflict: (conflict: object) => void;

### Parameters

- `conflict` - (erforderlich) *object* - der Konflikt, der während der Terminplanung gefunden wurde. Die Menge der Felder hängt von der Konflikt `kind` ab.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleConflict", function(conflict){
    if (conflict.kind === "constraint-violation") {
        console.warn(`Task ${conflict.taskId}: the ${conflict.constraintType} constraint could not be satisfied`);
    }
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Dieses Ereignis ist in der **auto_scheduling** Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md). 
:::

Das Ereignis wird genau einmal pro Konflikt ausgelöst, auf den Auto Scheduling stößt. Auto Scheduling liefert dennoch ein Ergebnis – das Ereignis ermöglicht es Ihnen, die Konflikte in der UI sichtbar zu machen oder darauf zu reagieren.

Das Feld `conflict.kind` definiert den Typ des Konflikts und die verfügbaren Felder:

| `kind` | Beschreibung | Felder |
|---|---|---|
| `"constraint-violation"` | Die Einschränkung einer Aufgabe konnte an der geplanten Position nicht erfüllt werden. | `taskId`, `constraintType`, `required` *(Date)*, `actual` *(Date)* |
| `"calendar-non-working"` | Eine Aufgabe landete in ihrer eigenen Nicht-Arbeitszeit. Wird nur gemeldet, wenn [strict_calendar](api/config/auto_scheduling.md#strict_calendar) aktiviert ist. | `taskId`, `proposedDate` *(Date)*, `snappedDate` *(Date)* |
| `"unscheduled-dependency"` | Eine Aufgabe hängt von einer Aufgabe ab, die nicht geplant ist. | `taskId`, `blockedBy` |

Abhängigkeits-Schleifen werden über das separate onAutoScheduleCircularLink-Ereignis gemeldet, nicht hier.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onAutoScheduleNoConverge](api/event/onautoschedulenoconverge.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 10.0