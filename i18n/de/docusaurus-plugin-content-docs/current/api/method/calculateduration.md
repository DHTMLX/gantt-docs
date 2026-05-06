---
sidebar_label: calculateDuration
title: calculateDuration Methode
description: "berechnet die Dauer einer Aufgabe"
---

# calculateDuration

### Description

@short: Berechnet die Dauer einer Aufgabe

@signature: calculateDuration: (config: object, end_date: Date) =\> number

### Parameters

- `config` - (erforderlich) *object | Date* -        entweder das <a href="#configuration-object-properties">Konfigurationsobjekt eines Zeitraums</a> oder das Startdatum der Aufgabe
- `end_date` - (optional) *Date* -  das Enddatum der Aufgabe. Der Parameter ist erforderlich, wenn der erste Parameter als start_date angegeben wird.

### Returns
- ` duration` - (number) - die Dauer einer Aufgabe in den durch die Option [duration_unit](api/config/duration_unit.md) angegebenen Einheiten

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// berechnet die Arbeitszeitdauer zwischen angegebenen Daten 
// (für eine bestimmte Aufgabe, wenn mehrere Arbeitskalender verwendet werden)
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
Wenn die [work_time](api/config/work_time.md) Option aktiviert ist, berechnet die Methode die Dauer der Aufgabe in der Arbeitszeit. 
:::

- Die Methode wird den globalen Arbeitszeitkalender verwenden, wenn keine Aufgabe angegeben wird. 
- Außerdem kann die Methode direkt für ein [Kalender-Objekt](api/other/calendar.md) aufgerufen werden.

## Eigenschaften des Konfigurationsobjekts

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- **start_date** - (*Date*) das Datum, an dem eine Aufgabe voraussichtlich beginnt
- **end_date** - (*Date*) das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
* **task** - (*object*) optional, das Objekt der Aufgabe, dessen Dauer berechnet werden soll

### Verwandte API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Verwandte Guides
- [Arbeitszeitberechnung](guides/working-time.md)