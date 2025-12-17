---
sidebar_label: isWorkTime
title: isWorkTime method
description: "bestimmt, ob das angegebene Datum innerhalb der Arbeitszeit liegt"
---

# isWorkTime

### Description

@short: Bestimmt, ob das angegebene Datum innerhalb der Arbeitszeit liegt

@signature: isWorkTime: (config: Date | object, time_unit?: string)

### Parameters
- `config` - (required) *object | Date* -        kann entweder ein Konfigurationsobjekt sein, das einen Zeitraum beschreibt, oder ein spezifisches Datum

### Returns
- ` isWorkTime` - (boolean) - <i>true</i>, wenn das angegebene Datum innerhalb der Arbeitszeit liegt; andernfalls <i>false</i>

### Example

~~~jsx
//prüft, ob das angegebene Datum ein Arbeitstag gemäß den globalen Einstellungen ist
gantt.isWorkTime({ date: new Date(2023,3,5) });
// oder
gantt.isWorkTime(new Date(2023,3,5));

//prüft, ob das angegebene Datum ein Arbeitstag für eine bestimmte Aufgabe ist
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note

Wenn die Option [work_time](api/config/work_time.md) deaktiviert ist, gibt diese Methode immer `true` zurück. 
 
:::

- Wenn keine Aufgabe angegeben wird, bezieht sich die Methode auf den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars). <br>
- Diese Methode kann auch direkt von einem [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.


Betrachten Sie die folgende Arbeitszeiteinstellung für das Diagramm:

- **Arbeitstage**: Montag bis Freitag
- **Arbeitszeiten**: 6:00 Uhr bis 15:00 Uhr

Wenn Sie Montag, den 3. April 2023, wie unten gezeigt prüfen, sind die Ergebnisse:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, weil 17:00 bis 18:00 Uhr außerhalb der Arbeitszeit liegt

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, da Montag ein Arbeitstag ist
~~~

## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

- **date** - (*Date*) das zu prüfende Datum 
* **unit** - (string)    optionale Angabe der Zeiteinheit: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)    optionale Angabe des Aufgabenobjekts, für das die Arbeitsdauer bestimmt werden soll

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("Arbeitszeit der Aufgabe " + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md)

