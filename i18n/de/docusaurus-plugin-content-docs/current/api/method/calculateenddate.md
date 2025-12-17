---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "ermittelt das Enddatum einer Aufgabe"
---

# calculateEndDate

### Description

@short: Ermittelt das Enddatum einer Aufgabe

@signature: calculateEndDate: Calendar['calculateEndDate']

### Parameters

- `config` - (required) *object | Date* -         kann entweder das <a href="#configurationobjectproperties">Konfigurationsobjekt</a> sein, das den Zeitraum beschreibt, oder einfach das Startdatum der Aufgabe
- `duration` - (optional) *	number* - optional, die Länge der Aufgabe. Dies wird benötigt, wenn der erste Parameter nur ein start_date ist

### Returns
- ` end_date` - (Date) - das Datum, an dem die Aufgabe voraussichtlich abgeschlossen sein wird

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// ermittelt das Enddatum basierend auf den globalen Arbeitszeiteinstellungen
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// oder
gantt.calculateEndDate(new Date(2013,02,15), 48);

// ermittelt das Enddatum für einen spezifischen Aufgaben-Kalender
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// oder, eine Abkürzung:
// verwendet den Kalender, der der Aufgabe zugewiesen ist, sowie das eigene start_date und die Dauer der Aufgabe
gantt.calculateEndDate(task);
~~~

### Details

:::note

Wenn die Option [work_time](api/config/work_time.md) aktiviert ist, behandelt die Methode die Dauer als Arbeitszeit. 
 
:::

- Wenn keine Aufgabe angegeben wird, verwendet die Methode standardmäßig den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars). <br>
- Die Methode kann auch direkt auf ein [Kalenderobjekt](api/other/calendar.md) angewendet werden.

Sie können auch das Startdatum mit **calculateEndDate** wie folgt ermitteln:

~~~js
// ermittelt das Startdatum:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

- **start_date** - (*Date*) wann die Aufgabe geplant ist zu starten
- **duration** - (*number*)    Länge der Aufgabe
* **unit** - (*string*)    optionale Zeiteinheit für die Dauer: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)    optionale Aufgabenobjekt, dessen Dauer berechnet werden soll

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

