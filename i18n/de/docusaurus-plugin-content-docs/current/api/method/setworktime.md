---
sidebar_label: setWorkTime
title: setWorkTime method
description: "setzt die Arbeitszeit für das Gantt-Diagramm"
---

# setWorkTime

### Description

@short: Setzt die Arbeitszeit für das Gantt-Diagramm

@signature: setWorkTime: (config: object) =\> boolean

### Parameters

- `config` - (required) *object* - das Konfigurationsobjekt für einen Zeitraum

### Example

~~~jsx
gantt.config.work_time = true;

// aktualisiert die Arbeitszeiten für Arbeitstage von ["8:00-17:00"] auf ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
 
// markiert alle Freitage als arbeitsfreie Tage
gantt.setWorkTime({ day:5, hours:false });
 
// passt die Arbeitszeiten für Freitage und Samstage an 
// von ["8:00-17:00"] auf ["8:00-12:00"]
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
gantt.setWorkTime({day : 6, hours : ["8:00-12:00"]});
 
// definiert den 31. März als Arbeitstag
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
// setzt den 1. Januar als arbeitsfreien Tag
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

// definiert die Arbeitszeit als zwei Intervalle: 8:30-12:00, 13:00-17:00 (Pausenzeit inklusive)
gantt.setWorkTime({hours : ["8:30-12:00", "13:00-17:00"]})
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

:::note

Diese Methode wirkt nur, wenn [work_time](api/config/work_time.md) aktiviert ist. Andernfalls wird sie ignoriert.
 
:::

- Wenn keine Aufgabe angegeben ist, gilt die Methode für den [globalen Arbeitszeitkalender](guides/working-time.md#multipleworktimecalendars). <br>
- Zusätzlich kann sie direkt von einem [Kalenderobjekt](api/other/calendar.md) aufgerufen werden.

Standardmäßig sind die Arbeitszeiten wie folgt eingestellt:

- **Arbeitstage**: Montag bis Freitag.
- **Arbeitszeiten**: 08:00 - 17:00.

Diese Methode ermöglicht es, diese Standardwerte anzupassen.

## Eigenschaften des Konfigurationsobjekts {#configurationobjectproperties}

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
  <td> die Zahl, die einen Wochentag repräsentiert [0 (<i>Sonntag</i>) - 6 (<i>Samstag</i>)]. Es kann jeweils nur ein Tag gesetzt werden.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// markiert alle Montage als arbeitsfreie Tage
gantt.setWorkTime({ day:1, hours:false }); 
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
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> ein Array von Arbeitszeiten, angegeben als 'von'-'bis' Intervalle. <br><i>'false'</i> definiert den Tag als arbeitsfrei, während <i>'true' (Standard)</i> die Standardzeiten (["8:00-17:00"]) anwendet</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// setzt die Arbeitszeiten für Freitage von 8:00 bis 12:00
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">customWeeks</b></td>
  <td> ein Objekt, das unterschiedliche Arbeitszeitregeln für verschiedene Zeiträume definiert.<br> Das Objekt kann Schlüssel-Wert-Paare enthalten, wobei <i>key</i> der Name eines Zeitraums ist und <i>value</i> ein Objekt mit folgenden Attributen:
  <ul><li><b>from</b> - (<i>Date</i>) erforderlich, Startdatum des Zeitraums</li><li><b>to</b> - (<i>Date</i>) erforderlich, Enddatum des Zeitraums</li><li><b>hours</b> - (<i>array</i>) ein Array von Arbeitszeiten als 'von'-'bis' Intervalle. <br><i>'false'</i> bedeutet arbeitsfrei, <i>'true' (Standard)</i> setzt die Standardzeiten (["8:00-17:00"])</li><li><b>days</b> - (<i>array</i>) ein Array mit 7 Elementen, die die Wochentage repräsentieren (0 - Sonntag bis 6 - Samstag), wobei 1/true Arbeitstag und 0/false arbeitsfrei bedeutet.</li></ul></td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// ändert die Arbeitszeiten für die Wintermonate
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2018, 11, 1), // 1. Dezember 2018
            to: new Date(2019, 2, 1), // 1. März 2019 00:00
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

## Arbeitszeiten für Nachtschicht einstellen

Wenn Sie das Attribut **hours** im [setWorkTime](api/method/setworktime.md) Konfigurationsobjekt angeben, sollten die Intervalle von früh nach spät aufgelistet werden. Werden sie in absteigender Reihenfolge angegeben, können einige Intervalle ignoriert werden. Zum Beispiel werden Intervalle nach `18:00` im folgenden Fall ignoriert:

~~~js
// falsches Einstellungsbeispiel
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "14:00-15:00",  "08:00-10:00"]});
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "00:00-04:00",  "05:00-06:00"]});
~~~

Um Nachtschichtzeiten korrekt anzugeben, sollten diese auf zwei Tage verteilt werden:

- innerhalb von 24 Stunden für den ersten Tag
- innerhalb von 24 Stunden für den folgenden Tag

Beispiel:

~~~js
gantt.setWorkTime({day : 5, hours : ["16:00-18:00"]});
gantt.setWorkTime({day : 6, hours : ["00:00-04:00",  "05:00-06:00"]});
~~~

## Überschreiben einer Arbeitszeitregel

Jeder weitere Aufruf dieser Methode für dasselbe Datum überschreibt die vorherige Einstellung der Arbeitszeit:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
// die endgültige Arbeitszeit ist 13:00-17:00,
// nicht eine Kombination beider Intervalle
~~~

## Eigene Arbeitstage und freie Tage festlegen

Es ist nicht möglich, Arbeitszeitregeln zu setzen, die alle Arbeitstage oder Arbeitsstunden ausschließen. Zum Beispiel funktionieren folgende Einstellungen nicht:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

In solchen Fällen ignoriert Gantt den Methodenaufruf für einen der Arbeitstage, sodass dieser weiterhin Arbeitszeiten hat.

Wenn Sie versuchen, die nächste Arbeitszeit oder Dauer von einem Datum mit solchen Einstellungen zu berechnen, wird kein gültiges Datum oder Dauer gefunden. Im Grunde ist eine solche Kalenderkonfiguration wirkungslos. Selbst wenn bestimmte Daten Arbeitszeiten haben, funktionieren Berechnungen nur korrekt innerhalb von Bereichen mit Arbeitstagen und -zeiten. Berechnungen außerhalb dieser Bereiche können Fehler oder keine Ergebnisse liefern.

Um einen Kalender zu erstellen, bei dem einige Monate oder Jahre vollständig arbeitsfrei sind, verwenden Sie die *customWeeks*-Option von **setWorkTime()**. Um Arbeitstage und -zeiten innerhalb des notwendigen Bereichs zu definieren, sollten Sie:

- die Zeitachse in Perioden ohne Arbeitszeiten aufteilen
- Arbeitszeiten explizit für benötigte Daten setzen

Beispiel:

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
Sample: [Verwendung von `customWeeks`, um alle Tage im Kalender als arbeitsfrei zu markieren ](https://snippet.dhtmlx.com/i0o74zg7)
:::

### Related API
- [work_time](api/config/work_time.md)
- [unsetWorkTime](api/method/unsetworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

### Change log
- Die Eigenschaft **customWeeks** wurde in Version 7.1 eingeführt;
- Das Format der Eigenschaft **hours** im Konfigurationsobjekt wurde in Version 7.0 geändert.

