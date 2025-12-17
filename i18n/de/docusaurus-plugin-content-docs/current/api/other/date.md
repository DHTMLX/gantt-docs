---
sidebar_label: date
title: date config
description: "eine Sammlung von Datumsformatierungs-Utilities"
---

# date

### Description

@short: Eine Sammlung von Datumsformatierungs-Utilities

@signature: date: DateHelpers

### Example

~~~jsx

~~~

### Details

Das **date**-Objekt bietet eine Vielzahl von Methoden zur Arbeit mit Datumswerten:

<ul>
  <li>
  <b>add (date, number, unit): Date</b> - passt das übergebene Datum an, indem eine bestimmte Zeitspanne hinzugefügt oder subtrahiert wird
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu ändernde Datum </li>
  <li><b><i>number</i></b> - (<i>number</i>) die Anzahl der Einheiten, die hinzugefügt (positiv) oder subtrahiert (negativ) werden sollen </li>
  <li><b><i>unit</i></b> - (<i>string</i>) die Zeiteinheit: 'minute', 'hour', 'day', 'week', 'month', 'year'. </li>
~~~js
//fügt dem angegebenen Datum 1 Jahr hinzu: 29. Juni 2019 -> 29. Juni 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~
  </ul>
  </li>
  <li>
  <b>add_quarter (date, number): Date</b> - addiert oder subtrahiert eine Anzahl von Quartalen (jeweils 3 Monate) zu/von einem Datum
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
  <li><b><i>number</i></b> - (<i>number</i>) Anzahl der hinzuzufügenden (positiv) oder abzuziehenden (negativ) Quartale </li> 
~~~js
//fügt dem angegebenen Datum 1 Quartal (3 Monate) hinzu: 
//29. Juni 2019 -> 29. September 2019
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~
  </ul>
  </li>
  <li>
  <b>convert_to_utc (date): Date</b> - wandelt lokale Zeit in UTC-Zeit um
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu konvertierende Datum </li>
~~~js
//29. Juni 2019 14:00 (lokale Zeit) -> 29. Juni 2019 12:00 (UTC)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~
  </ul>
  </li>
  <li>
  <b>copy (date): Date</b> - erstellt eine Kopie eines Date-Objekts
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu kopierende Datum </li>
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29));// -> 29. Juni 2019
~~~
  </ul>
  </li>
  <li>
  <b>date_part (date): Date</b> - setzt den Zeitanteil des Datums auf Mitternacht (00:00:00) zurück
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>date_to_str (format, utc): Function</b> - erzeugt eine Funktion, die ein Date-Objekt in einen formatierten String umwandelt
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) das gewünschte Datumsformat (siehe [Date Format Specification](guides/date-format.md)) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) ob lokale Zeit in UTC umgewandelt werden soll </li>
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
  </ul>
  </li>
  <li>
  <b>day_start (date): Date</b> - setzt die Zeit des Datums auf Mitternacht, identisch zu <b>date_part</b>. Wird in der Tagesansicht verwendet, um das angezeigte Datum zu bestimmen, und kann angepasst werden
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>getISOWeek (date): number</b> - gibt die ISO-8601-Wochennummer für das Datum zurück, wobei die Woche am Montag beginnt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu bewertende Datum </li>
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getUTCISOWeek (date): number</b> - gibt die Wochennummer des Datums zurück, nachdem lokale Zeit in UTC umgewandelt wurde
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu bewertende Datum </li>
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29));// ->26
~~~
  </ul>
  </li>
  <li>
  <b>getWeek (date): number</b> - gibt die Wochennummer des Datums zurück, wobei die Woche je nach Konfiguration in [start_on_monday](api/config/start_on_monday.md) entweder am Montag oder Sonntag beginnt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu bewertende Datum </li>
~~~js
// Wochen beginnen am Sonntag
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~
  </ul>
  </li>
  <li>
  <b>month_start (date): Date</b> - gibt ein Date-Objekt zurück, das auf den ersten Tag des Monats des angegebenen Datums gesetzt ist, mit Zeit auf Mitternacht zurückgesetzt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30 -> 01. Juni 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>parseDate (date, format): Date</b> - wandelt einen String, der im angegebenen Format vorliegt, in ein Date-Objekt um
  <ul>
  <li><b><i>date</i></b> - (<i>string</i>) der Datumsstring </li>
  <li><b><i>format</i></b> - (<i>string</i>) das Format des Datumsstrings (siehe [Date Format Specification](guides/date-format.md)) </li>
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y");//-> 29. Juni 2019 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>str_to_date (format, utc): Function</b> - erzeugt eine Funktion, die Strings eines bestimmten Formats in Date-Objekte umwandelt
  <ul>
  <li><b><i>format</i></b> - (<i>string</i>) das erwartete Datumsformat (siehe [Date Format Specification](guides/date-format.md)) </li>
  <li><b><i>utc?</i></b> - (<i>boolean</i>) ob lokale Zeit in UTC umgewandelt werden soll </li>
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29. Juni 2019 00:00:00
~~~
  </ul>
  </li>
  <li>
  <b>time_part (date): number</b> - gibt den Zeitanteil eines Date-Objekts als Anzahl der Sekunden seit Mitternacht zurück
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das zu bewertende Datum </li>
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>to_fixed (num): string</b> - formatiert Zahlen kleiner als 10 mit führender Null, Zahlen ab 10 werden unverändert als Strings zurückgegeben
  <ul>
  <li><b><i>num</i></b> - (<i>number</i>) die zu formatierende Zahl </li>
~~~js
var num1 = gantt.date.to_fixed(2);// ->"02"
var num2 = gantt.date.to_fixed(10);// ->10
~~~
  </ul>
  </li>
  <li>
  <b>minute_start (date): Date</b> - gibt das Datum mit Sekunden auf Null zurück, wobei Jahr, Monat, Tag, Stunde und Minute erhalten bleiben
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>hour_start (date): Date</b> - gibt das Datum mit Minuten und Sekunden auf Null zurück, wobei Jahr, Monat, Tag und Stunde erhalten bleiben
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30:10 -> 29. Juni 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>week_start (date): Date</b> - gibt den ersten Tag der Woche für das angegebene Datum zurück, die Zeit wird auf Mitternacht zurückgesetzt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30 -> 24. Juni 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
  <li>
  <b>quarter_start (date): Date</b> - gibt den ersten Monat des Quartals für das Datum zurück, die Zeit wird auf Mitternacht zurückgesetzt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30:10 -> 01. April 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
  </ul>
  </li>
  <li>
  <b>year_start (date): Date</b> - gibt den ersten Tag des Jahres für das angegebene Datum zurück, die Zeit wird auf Mitternacht gesetzt
  <ul>
  <li><b><i>date</i></b> - (<i>Date</i>) das anzupassende Datum </li>
~~~js
//29. Juni 2019 14:30 -> 01. Januar 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
  </ul>
  </li>
</ul>

