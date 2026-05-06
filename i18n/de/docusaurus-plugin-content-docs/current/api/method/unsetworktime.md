---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "entfernt eine Arbeitszeit im Gantt-Diagramm"
---

# unsetWorkTime

### Description

@short: Setzt eine Arbeitszeit im Gantt-Diagramm zurück

@signature: unsetWorkTime: (config: object) =\> void

### Parameters

- `config` - (erforderlich) *Objekt* - das Konfigurationsobjekt eines Zeitabschnitts

### Example

~~~jsx
gantt.config.work_time = true;
 
// aktualisiert die Arbeitszeiten an Arbeitstagen von ["8:00-17:00"] auf ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
// entfernt die Konfiguration der Arbeitszeiten
gantt.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

### Related samples
- [Arbeitsstunden berechnen](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

hinzugefügt in Version 4.1

- Die Methode verwendet den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars), falls keine Aufgabe angegeben ist.
- Außerdem kann die Methode direkt von einem [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.

## Konfigurationsobjekt-Eigenschaften


Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

<table class="list" cellspacing="0" cellpadding="5" border="0">
    <thead>
    <tr>
        <th>
            Eigenschaft 
        </th>
        <th>
            Beschreibung
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td rowspan="2"><b id="day">day</b></td>
  <td> eine Zahl des Wochentags [0 (<i>Sonntag</i>) - 6 (<i>Samstag</i>)]. Hinweis: Sie können jeweils nur einen Tag gleichzeitig festlegen</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for Mondays 
gantt.unsetWorkTime({ day: 1, hours: false }); 
~~~
        </td>
    </tr>
    <tr>
        <td rowspan="2"><b id="date">date</b></td>
  <td> ein spezifisches Datum, für das Arbeitszeiten festgelegt bzw. aufgehoben werden</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for a specific date 
gantt.unsetWorkTime({ 
    date: new Date(2025, 11, 1), 
    hours: false 
});
~~~
        </td>
    </tr>
  <tr>
        <td rowspan="2"><b id="hours">hours</b></td>
  <td> ein Array von Arbeitszeiten als 'von'-'bis'-Paaren. <br/><i>'false'</i> Wert entfernt Arbeitszeiten, <i>'true' (Standardwert)</i> wendet die Standardzeiten an (["8:00-17:00"])</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets the working time for Fridays from 8:00 till 12:00
gantt.unsetWorkTime({ day : 5, hours : ["8:00-12:00"] });
~~~
        </td>
    </tr>
    </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md#unsetting-the-working-time)