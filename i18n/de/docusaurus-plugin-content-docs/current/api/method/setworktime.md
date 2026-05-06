---
sidebar_label: setWorkTime
title: setWorkTime-Methode
description: "setzt die Arbeitszeit für das Gantt-Diagramm"
---

# setWorkTime

### Description

@short: Setzt die Arbeitszeit für das Gantt-Diagramm

@signature: setWorkTime: Calendar['setWorkTime']

### Parameters

- `config` - (required) *object* - das Konfigurationsobjekt eines Zeitabschnitts

### Example

~~~jsx
gantt.config.work_time = true;

//ändert die Arbeitszeit der Arbeitstage von ["8:00-17:00"] zu ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
 
//macht alle Freitage zu freien Tagen
gantt.setWorkTime({ day:5, hours:false });
 
//ändert die Arbeitszeit für Freitage und Samstage 
// von ["8:00-17:00"] zu ["8:00-12:00"]
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
gantt.setWorkTime({day : 6, hours : ["8:00-12:00"]});
 
//macht den 31. März zu einem Arbeitstag 
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
//macht den 1. Januar zu einem freien Tag
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

//legt die Arbeitszeit als 2 Perioden fest: 8:30-12:00, 13:00-17:00 (wegen Mittagspause)
gantt.setWorkTime({hours : ["8:30-12:00", "13:00-17:00"]})
~~~


### Related samples
- [Berechnung der Arbeitsstunden](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

:::note
Die Methode macht nur Sinn, wenn [work_time](api/config/work_time.md) auf 'true' gesetzt ist. Andernfalls wird die Methode ignoriert.
:::

- Die Methode verwendet den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars), wenn kein Task angegeben ist. 
- Zusätzlich kann die Methode direkt von einem [Kalender-Objekt](api/other/calendar.md) aufgerufen werden.


Die Standard-Arbeitszeit ist Folgendes:

- **Arbeitstage**: Montag - Freitag.
- **Arbeitszeiten**: 08:00 - 17:00.

Die Methode dient dazu, die Standard-Einstellungen zu ändern.

## Konfigurationsobjekt-Eigenschaften


Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

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
  <td> eine Zahl des Wochentags [0 (<i>Sonntag</i>) - 6 (<i>Samstag</i>)]. Hinweis, Sie können jeweils nur einen Tag auf einmal festlegen</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//macht alle Montage zu freien Tagen
gantt.setWorkTime({ day:1, hours:false }); 
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2"><b id="date">date</b></td>
  <td> ein konkretes Datum, das als Arbeitstag oder Ruhetag festgelegt wird</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//macht ein konkretes Datum zu einem Ruhetag
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2"><b id="hours">hours</b></td>
  <td> ein Array von Arbeitsstunden als 'von'-'bis'-Paaren. <br/><i>'false'</i> Wert setzt einen Ruhetag, <i>'true' (Standardwert)</i> wendet die Standardstunden an (["8:00-17:00"])</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//legt die Arbeitszeit für Freitage von 8:00 bis 12:00 fest
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2"><b id="hours">customWeeks</b></td>
  <td> ein Objekt mit unterschiedlichen Arbeitszeitregeln für verschiedene Zeiträume. <br/> Das Objekt kann eine Reihe von <i>key:value</i>-Paaren enthalten, wobei <i>key</i> der Name eines Zeitabschnitts ist und <i>value</i> ein Objekt, das folgende Attribute beinhaltet:<ul><li><b>from</b> - (<i>Date</i>) verpflichtend, das Datum, an dem der Zeitraum beginnen soll</li><li><b>to</b> - (<i>Date</i>) verpflichtend, das Datum, an dem der Zeitraum beendet sein soll</li><li><b>hours</b> - (<i>array</i>) ein Array von Arbeitsstunden als 'von'-'bis'-Paaren. <br/><i>'false'</i> Wert setzt einen Ruhetag, <i>'true' (Standardwert)</i> wendet die Standardstunden an (["8:00-17:00"])</li><li><b>days</b> - (<i>array</i>) ein Array von 7 Wochentagen (von 0 - Sonntag bis 6 - Samstag), wobei 1/true für einen Arbeitstag steht und 0/false - ein Nicht-Arbeitstag.</li></ul></td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//ändert die Arbeitszeit für Wintermonate
gantt.setWorkTime({
	customWeeks: {
		winter: {
			from: new Date(2018, 11, 1), // 1. Dezember 2018
			to: new Date(2019, 2, 1), // 1. März 2019
			hours: ["9:00-13:00", "14:00-16:00"],
			days: [ 1, 1, 1, 1, 0, 0, 0]
		}
	}
});
~~~
		</td>
	</tr>
	</tbody>
</table>


## Setting working time hours for the night shift

Wenn Sie das Attribut **hours** im [setWorkTime](api/method/setworktime.md) Konfigurationsobjekt angeben, sollten die Intervalle von früh nach spät aufgelistet werden. Werden sie in absteigender Reihenfolge angegeben, können einige Intervalle ignoriert werden. Zum Beispiel werden Intervalle nach `18:00` im folgenden Fall ignoriert:

~~~js
// die untenstehenden Einstellungen sind falsch
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "14:00-15:00",  "08:00-10:00"]});
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "00:00-04:00",  "05:00-06:00"]});
~~~

Wenn Sie Arbeitszeiten für die Nachtschicht festlegen müssen, sollten Sie sie folgendermaßen angeben: 

- innerhalb von 24 Stunden für den ersten Tag
- innerhalb von 24 Stunden für den folgenden Tag

Zum Beispiel:

~~~js
gantt.setWorkTime({day : 5, hours : ["16:00-18:00"]});
gantt.setWorkTime({day : 6, hours : ["00:00-04:00",  "05:00-06:00"]});
~~~


## Re-writing a working time rule

Beachten Sie, dass jeder folgende Aufruf der Methode für dasselbe Datum die vorherige Arbeitszeitregel überschreibt:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
//das Ergebnis der obigen Befehle ist Arbeitszeit 13:00-17:00
//und kein Misch aus beiden Befehlen
~~~


## Setting custom working days/days-off

Beachten Sie, dass es nicht möglich ist, Arbeitszeit-Einstellungen anzuwenden, die keine Arbeitstage/Arbeitsstunden enthalten. Zum Beispiel wie folgt:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

Infolgedessen wird Gantt die Anwendung der Methode auf einen der Arbeitstage ignorieren, und es wird dennoch Arbeitsstunden enthalten. 

Wenn Sie versuchen würden, die nächsten Arbeitszeiten oder eine Dauer von einem bestimmten Datum aus zu berechnen, gäbe es weder ein solches Datum noch eine Dauer. 
Das bedeutet, dass das Festlegen eines solchen Kalenders keinen Sinn ergibt. Selbst wenn Sie bestimmte Daten mit Arbeitszeiten festlegen, würde es nicht korrekt funktionieren, da Gantt Daten nur innerhalb eines Datumsbereichs berechnen kann, der Arbeits- und Wochenstunden enthält. Das Berechnen von Daten außerhalb des Bereichs würde zur Abwesenheit des Datums und zu verschiedenen Fehlern führen. 

Wenn Sie einen Kalender erstellen möchten, in dem einige Monate oder sogar Jahre ausschließlich Nicht-Arbeitstage enthalten, sollten Sie die *customWeeks*-Einstellung der **setWorkTime()**-Methode verwenden. 
Um Arbeits- und Wochenstunden innerhalb des notwendigen Bereichs festzulegen, müssen Sie:

- ihn in Perioden ohne Arbeitsstunden aufteilen
- Arbeitsstunden für die erforderlichen Daten festlegen

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~


:::note
Beispiel: [Verwendung von `customWeeks`, um alle Tage im Kalender freizuhalten](https://snippet.dhtmlx.com/i0o74zg7)
:::


### Related API
- [work_time](api/config/work_time.md)
- [unsetWorkTime](api/method/unsetworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Arbeitszeitberechnung](guides/working-time.md)

### Change log
- die **customWeeks**-Eigenschaft wurde in v7.1 hinzugefügt;
- das Format der **hours**-Eigenschaft der Config wurde in Version 7.0 geändert.