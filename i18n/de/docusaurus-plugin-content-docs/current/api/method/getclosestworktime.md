---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime-Methode
description: "Gibt die nächstgelegene Arbeitszeit zurück"
---

# getClosestWorkTime

### Description

@short: Gibt die nächstgelegene Arbeitszeit zurück

@signature: getClosestWorkTime: (config: object) =\> Date

### Parameters

- `config` - (required) *object* - das Konfigurationsobjekt oder das Datum

### Returns
- ` date` - (Date) - ein Date-Objekt der nächstgelegenen Arbeitszeit

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
If the [work_time](api/config/work_time.md) option is disabled, the method returns the date unchanged. 
:::

- The method will use the [global work time calendar](guides/working-time.md#getting-calendars) if no task is specified. 
- Besides, the method can be called directly from a [calendar object](api/other/calendar.md).

## Configuration object properties

The configuration object can contain the following properties:

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
		<td rowspan="2" style="text-align:center"><b id="date">date</b></td>
  <td>ein Datum, für das die nächstgelegene Arbeitszeit ermittelt wird</td>
  </tr>
  <tr>
		<td colspan="2">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,26),
    dir:"future"
});
		// -> Mon May 27 2019 00:00:00 if duration_unit="day"
		// -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~		
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> or <i>'past'</i>) gibt die Richtung der nächstgelegenen Zeit an</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
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
		<td rowspan="2" style="text-align:center"><b id="unit">unit</b></td>
  <td> eine Zeiteinheit, nach der die nächstgelegene Arbeitszeit gesucht wird</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//searches for the closest working hour
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
		<td rowspan="2" style="text-align:center"><b id="unit">task</b></td>
  <td> optional, das Objekt der Aufgabe, deren Dauer berechnet werden soll</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
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

~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
	// -> Mon May 27 2019 00:00:00 if duration_unit="day"
	// -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~



  dir
  ('future' or 'past') gibt die Richtung der nächstgelegenen Zeit an
  
  
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
	// -> Sat May 18 2019 00:00:00
~~~


  unit
  eine Zeiteinheit, nach der die nächstgelegene Arbeitszeit gesucht wird
  
  
~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Mon May 20 2019 08:00:00
~~~


  task
  optional, das Task-Objekt, dessen Dauer berechnet werden soll
  
  
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)