---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "entfernt eine Arbeitszeiteinstellung im Gantt Chart"
---

# unsetWorkTime

### Description

@short: Entfernt eine Arbeitszeiteinstellung im Gantt Chart

@signature: unsetWorkTime: Calendar['unsetWorkTime']

### Parameters

- `config` - (required) *object* - das Konfigurationsobjekt, das den Zeitrahmen definiert

### Example

~~~jsx
gantt.config.work_time = true;
 
// aktualisiert die Arbeitszeiten an Arbeitstagen von ["8:00-17:00"] auf ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
// entfernt die Konfiguration der Arbeitszeiten
gantt.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

hinzugefügt in Version 4.1

- Diese Methode wendet den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars) an, wenn keine spezifische Aufgabe angegeben ist. <br/>
- Zusätzlich kann sie direkt auf einem [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.


## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

Das Konfigurationsobjekt kann folgende Eigenschaften enthalten:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Property 
  </th>
  <th>
  Beschreibung
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="day">day</b></td>
  <td> die Nummer eines Wochentags [0 (<i>Sonntag</i>) - 6 (<i>Samstag</i>)]. Beachten Sie, dass jeweils nur ein Tag gesetzt werden kann</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// markiert alle Montage als arbeitsfreie Tage
gantt.unsetWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> ein bestimmtes Datum, das als Arbeitstag oder freier Tag definiert wird</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// markiert ein bestimmtes Datum als arbeitsfreien Tag
gantt.unsetWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> ein Array von Arbeitszeiten, ausgedrückt als 'von'-'bis' Intervalle. <br><i>'false'</i> bedeutet ein freier Tag, <i>'true' (Standard)</i> verwendet die Standardarbeitszeiten (["8:00-17:00"])</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// entfernt die Arbeitszeiten für Freitage von 8:00 bis 12:00
gantt.unsetWorkTime({day : 5, hours : ["8:00-12:00"]});
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
- ["Arbeitszeitberechnung"](guides/working-time.md#unsettingtheworkingtime)

