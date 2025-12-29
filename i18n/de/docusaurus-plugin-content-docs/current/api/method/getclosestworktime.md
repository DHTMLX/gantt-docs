---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "Gibt die nächstgelegene Arbeitszeit zurück"
---

# getClosestWorkTime

### Description

@short: Gibt die nächstgelegene Arbeitszeit zurück

@signature: getClosestWorkTime: Calendar['getClosestWorkTime']

### Parameters

- `config` - (required) *object* - Das Konfigurationsobjekt oder das Datum

### Returns
- ` date` - (Date) - Ein Date-Objekt, das die nächstgelegene Arbeitszeit repräsentiert

### Example

~~~jsx
// Überprüft, ob das angegebene Datum ein Arbeitstag gemäß den globalen Einstellungen ist
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// oder
gantt.getClosestWorkTime(new Date(2019,04,26));

// Überprüft, ob das angegebene Datum ein Arbeitstag für eine bestimmte Aufgabe ist
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note

Wenn die Option [work_time](api/config/work_time.md) deaktiviert ist, gibt die Methode das Datum unverändert zurück.
 
:::

- Wenn keine Aufgabe angegeben wird, verwendet die Methode den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars). <br>
- Zusätzlich kann diese Methode direkt von einem [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.

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
  <td rowspan="2"><b id="date">date</b></td>
  <td>Das Datum, für das die nächstgelegene Arbeitszeit angefragt wird</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> Mon May 27 2019 00:00:00 wenn duration_unit="day"
// -> Mon May 27 2019 08:00:00 wenn duration_unit="hour"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> oder <i>'past'</i>) Gibt die Richtung an, in der die nächstgelegene Zeit gesucht wird</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
// -> Sat May 18 2019 00:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">unit</b></td>
  <td>Die Zeiteinheit, die verwendet wird, um die nächstgelegene Arbeitszeit zu ermitteln</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// sucht die nächstgelegene Arbeitsstunde
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Mon May 20 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">task</b></td>
  <td>Optional, das Task-Objekt, für das die Dauer berechnet werden soll</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~
  </td>
  </tr>
  </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

