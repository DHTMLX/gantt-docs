---
sidebar_label: calculateDuration
title: calculateDuration method
description: "ermittelt die Dauer einer Aufgabe"
---

# calculateDuration

### Description

@short: Ermittelt die Dauer einer Aufgabe

@signature: calculateDuration: Calendar['calculateDuration']

### Parameters

- `config` - (required) *object* - | Date        kann entweder das [Konfigurationsobjekt](#configurationobjectproperties) sein, das einen Zeitraum beschreibt, oder nur das Startdatum der Aufgabe
- `end_date` - (optional) *Date* - optional, das Enddatum der Aufgabe. Dies wird benötigt, wenn der erste Parameter nur das start_date ist.einfach das Startdatum der Aufgabe

### Returns
- ` duration` - (number) - die Dauer der Aufgabe in den durch die Option [duration_unit](api/config/duration_unit.md) festgelegten Einheiten

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// ermittelt die Arbeitszeitdauer zwischen zwei Daten 
// (nützlich für Aufgaben mit mehreren Arbeitskalendern)
gantt.calculateDuration({
    start_date: new Date(2013,02,15), 
    end_date: new Date(2013,02,25)
    /*,task: task*/
});

// oder 
gantt.calculateDuration(task);

// oder 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~

### Details

:::note

Wenn die Option [work_time](api/config/work_time.md) aktiviert ist, berechnet diese Methode die Dauer der Aufgabe basierend auf der Arbeitszeit. 
 
:::


- Wenn keine Aufgabe angegeben wird, verwendet die Methode standardmäßig den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars). <br>
- Diese Methode kann auch direkt auf einem [Kalenderobjekt](api/other/calendar.md) verwendet werden.

## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

- **start_date** - (*Date*) wann die Aufgabe geplant ist zu starten
- **end_date** - (*Date*) wann die Aufgabe geplant ist zu enden
* **task** - (*object*)    optional, das Aufgabenobjekt, für das die Dauer berechnet werden soll

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- - ["Arbeitszeitberechnung"](guides/working-time.md)

