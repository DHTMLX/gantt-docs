---
sidebar_label: onAutoScheduleNoConverge
title: onAutoScheduleNoConverge-Ereignis
description: "Wird ausgelöst, wenn das automatische Planen kein stabiles Ergebnis finden kann"
---

# onAutoScheduleNoConverge
:::info
Diese Funktionalität ist in der PRO Edition nur verfügbar. 
:::
### Description

@short: Wird ausgelöst, wenn das automatische Planen kein stabiles Ergebnis finden kann

@signature: onAutoScheduleNoConverge: (result: object) => void;

### Parameters

- `result` - (erforderlich) *object* - Details des Scheduling-Laufs, einschließlich der Anzahl der durchgeführten `iterations` und der Liste der gesammelten `conflicts`.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleNoConverge", function(result){
    console.warn("Auto scheduling did not converge", result.conflicts);
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Dieses Ereignis ist in der **auto_scheduling** Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md). 
:::

Auto scheduling platziert Aufgaben in wiederholten Durchläufen, bis das Ergebnis sich nicht mehr ändert. Dieses Ereignis wird ausgelöst, wenn das Ergebnis weiterhin Änderungen aufweist und die Engine nach einer Anzahl von Durchläufen stoppt, ohne einen stabilen Zustand zu erreichen. In der Praxis deutet dies auf ein überkonstruiertes Projekt hin – zum Beispiel eine Reihe von Einschränkungen und Abhängigkeiten, die nicht alle gleichzeitig erfüllt werden können.

Der Parameter `result` enthält die Details des Laufs:

- `iterations` - *Zahl* - wie viele Durchläufe durchgeführt wurden.
- `converged` - *Boolean* - `false` in diesem Ereignis.
- `conflicts` - *array* - Die während der Scheduling durchgesetzten Konflikte (siehe [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) für die Konfliktfelder).

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
- [onAutoScheduleConflict](api/event/onautoscheduleconflict.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Hinzugefügt in Version 10.0