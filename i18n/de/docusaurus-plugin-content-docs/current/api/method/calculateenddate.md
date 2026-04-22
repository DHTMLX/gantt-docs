---
sidebar_label: calculateEndDate
title: calculateEndDate Methode
description: "Berechnet das Enddatum einer Aufgabe"
---

# calculateEndDate

### Description

@short: Berechnet das Enddatum einer Aufgabe

@signature: calculateEndDate: (config: object, duration: number) =\> Date

### Parameters

- `config` - (erforderlich) *object | Date* - entweder das <a href="#configuration-object-properties">Konfigurationsobjekt</a> eines Zeitraums oder das Startdatum der Aufgabe
- `duration` - (optional) *number* - die Dauer der Aufgabe. Der Parameter ist erforderlich, wenn der erste Parameter als start_date angegeben wird

### Returns
- ` end_date` - (Date) - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// ermittelt das Enddatum basierend auf den globalen Arbeitszeiteinstellungen
gantt.calculateEndDate({start_date: new Date(2026,02,15), duration: 48});
// oder
gantt.calculateEndDate(new Date(2026,02,15), 48);

// ermittelt das Enddatum für einen spezifischen Aufgaben-Kalender
gantt.calculateEndDate({start_date: new Date(2026,02,15), duration: 48, task:task});
// oder, eine Abkürzung:
// verwendet den Kalender, der der Aufgabe zugewiesen ist, sowie das eigene start_date und die Dauer der Aufgabe
gantt.calculateEndDate(task);
~~~

### Details

:::note
Wenn die Option [work_time](api/config/work_time.md) aktiviert ist, berücksichtigt die Methode die Dauer als Arbeitszeit. 
:::

- Die Methode wird den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars) verwenden, falls kein task angegeben ist. 
- Außerdem kann die Methode direkt für ein [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.


Sie können auch das Startdatum berechnen, indem Sie die Methode **calculateEndDate** verwenden:

~~~js
// ermittelt das Startdatum:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

- **start_date** - (*Date*) das Datum, an dem eine Aufgabe voraussichtlich beginnt
- **duration** - (*number*) die Dauer einer Aufgabe
* **unit** - (*string*) optional, die Zeiteinheit der Dauer: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*) optional, das Objekt der Aufgabe, dessen Dauer berechnet werden soll

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)