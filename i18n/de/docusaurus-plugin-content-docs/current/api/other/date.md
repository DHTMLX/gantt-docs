---
sidebar_label: date
title: date formatting methods
description: "A set of date formatting methods"
---

# date

### Description

@short: Eine Sammlung von Datumsformatierungsfunktionen

@signature: date: DateHelpers

### Methoden

#### add(date, number, unit)
Fügt das angegebene Zeitintervall dem Datum hinzu bzw. subtrahiert es

**Parameter**:
- `date` - (Date) - Das Datumsobjekt
- `number` - (number) - Die Anzahl der Einheiten, die hinzugefügt (positiv) oder subtrahiert (negativ) werden
- `unit` - (string) - Zeiteinheit: 'minute', 'hour', 'day', 'week', 'month', 'year'

**Rückgabe**: Date - Das neue Datumsobjekt

**Beispiel**:
~~~js
// fügt dem angegebenen Datum 1 Jahr hinzu: 29. Juni 2019 -> 29. Juni 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

---

#### add_quarter(date, number)
Fügt dem Datum die angegebene Anzahl von Quartalen hinzu bzw. subtrahiert sie

**Parameter**:
- `date` - (Date) - Das Datumsobjekt
- `number` - (number) - Die Anzahl der hinzuzufügenden (positiv) oder abzuziehenden (negativ) Quartale

**Rückgabe**: Date - Das neue Datumsobjekt

**Beispiel**:
~~~js
// fügt dem angegebenen Datum 1 Quartal (3 Monate) hinzu: 
// 29. Juni 2019 -> 29. September 2020
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~

---

#### convert_to_utc(date)
Konvertiert die lokale Zeit zu UTC

**Parameter**:
- `date` - (Date) - Das zu konvertierende Datumsobjekt

**Rückgabe**: Date - Das UTC-Datumsobjekt

**Beispiel**:
~~~js
// 29. Juni 2019 14:00 (lokale Zeit) -> 29. Juni 2019 12:00 (UTC)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

---

#### copy(date)
Kopiert ein Date-Objekt

**Parameter**:
- `date` - (Date) - Das zu kopierende Datumsobjekt

**Rückgabe**: Date - Das kopierte Datumsobjekt

**Beispiel**:
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29)); // -> 29 June, 2019
~~~

---

#### date_part(date)
Setzt den Zeitanteil des übergebenen Datums auf 00:00:00 zurück

**Parameter**:
- `date` - (Date) - Das zu formatierende Datum

**Rückgabe**: Date - Das Datum mit der Zeit auf 00:00:00 zurückgesetzt

**Beispiel**:
~~~js
// 29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### date_to_str(format, utc)
Gibt eine Funktion zurück, die ein Date-Objekt in einen String des angegebenen Formats konvertiert

**Parameter**:
- `format` - (string) - Das Datumsformat (siehe guides/date-format.md)
- `utc` - (boolean, optional) - Ob in UTC konvertiert werden soll

**Rückgabe**: Function - Die Formatierungsfunktion

**Beispiel**:
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~

---

#### day_start(date)
Setzt den Zeitanteil des übergebenen Datums auf 00:00:00 (Alias von date_part)

**Parameter**:
- `date` - (Date) - Das zu formatierende Datum

**Rückgabe**: Date - Das Datum mit der Zeit auf 00:00:00 zurückgesetzt

**Beispiel**:
~~~js
// 29. Juni 2019 14:30:10 -> 29. Juni 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### getISOWeek(date)
Gibt die ISO-8601-Wochennummer des Datums zurück (Wochen beginnen am Montag)

**Parameter**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getUTCISOWeek(date)
Gibt die Wochennummer des Datums nach der Umrechnung in UTC zurück

**Parameter**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getWeek(date)
Gibt die Wochennummer des Datums zurück (der Wochenbeginn hängt von gantt.config.start_on_monday ab)

**Parameter**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
// Wochen beginnen am Sonntag
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~

---

#### month_start(date)
Gibt den ersten Tag des Monats zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameter**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: Date - Der erste Tag des Monats

**Beispiel**:
~~~js
// 29. Juni 2019 14:30 -> 01. Juni 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### parseDate(date, format)

Konvertiert eine Datumszeichenfolge in ein Date-Objekt. Diese Methode wird während [gantt.load()](api/method/load.md) und [gantt.parse()](api/method/parse.md) aufgerufen, um Aufgaben- und Link-Datumseigenschaften zu parsen.

**Parameter**:
- `date` - (string) - Die zu parseende Datumszeichenfolge
- `format` - (string | function, optional) - Ein Datumsformat-String (siehe [Date Format Specification](guides/date-format.md)) oder eine benutzerdefinierte Parser-Funktion `(dateStr) => Date`

**Rückgabe**: Date - Das geparste Datum-Objekt

**Parsing-Logik** (seit v9.1.3):

1. **ISO 8601 Prüfung** – Falls der String einem ISO 8601-Muster entspricht (z. B. `"2026-01-06"`, `"2026-01-06T10:30:00Z"`), wird er direkt geparst und `format` wird nicht berücksichtigt. Falls der Benutzer `gantt.templates.parse_date` explizit überschrieben hat, wird die ISO-Auto-Erkennung übersprungen und die Funktion des Benutzers übernimmt das Parsen.
2. **`format`-Argument** – Wird es als String bereitgestellt, wird es durch `gantt.date.str_to_date(format)` in eine Parser-Funktion umgewandelt; wird es als Funktion bereitgestellt, wird es direkt aufgerufen
3. **Fallback** – Falls kein `format` angegeben ist, wird das [parse_date](api/template/parse_date.md) Template verwendet

**Beispiele**:
~~~js
// mit explizitem Format-String
var date = gantt.date.parseDate("29/06/2019", "%d/%m/%Y");
// -> 29. Juni 2019 00:00:00

// ISO-String - automatisch geparst, Format wird ignoriert
var date2 = gantt.date.parseDate("2026-01-06T10:30:00Z");
// -> 6. Januar 2026 10:30:00 UTC

// mit eigener Parser-Funktion
var date3 = gantt.date.parseDate("Jan 6, 2026", function(str) {
    return new Date(str);
});
~~~

---

#### str_to_date(format, utc)
Gibt eine Funktion zurück, die eine Zeichenkette in ein Date-Objekt konvertiert

**Parameter**:
- `format` - (string) - Das Datumsformat (siehe guides/date-format.md)
- `utc` - (boolean, optional) - Ob in UTC konvertiert werden soll

**Rückgabe**: Function - Die Parsing-Funktion

**Beispiel**:
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29. Juni, 2019 00:00:00
~~~

---

#### time_part(date)
Gibt die Zeit als Sekunden seit Mitternacht zurück

**Parameter**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Sekunden seit Mitternacht

**Beispiel**:
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### to_fixed(num)
Fügt führende Null bei Zahlen < 10 hinzu

**Parameter**:
- `num` - (number) - Die zu formatierende Zahl

**Rückgabe**: string - Der formatierte String

**Beispiel**:
~~~js
var num1 = gantt.date.to_fixed(2); // ->"02"
var num2 = gantt.date.to_fixed(10); // ->10
~~~

---

#### minute_start(date)
Setzt Sekunden auf 00

**Parameter**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Das formatierte Datum

**Beispiel**:
~~~js
// 29. Juni 2019 14:30:10 -> 29. Juni 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### hour_start(date)
Setzt Minuten und Sekunden auf 00

**Parameter**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Das formatierte Datum

**Beispiel**:
~~~js
// 29. Juni 2019 14:30:10 -> 29. Juni 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### week_start(date)
Gibt den ersten Tag der Woche zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameter**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag der Woche

**Beispiel**:
~~~js
// 29. Juni 2019 14:30 -> 24. Juni 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### quarter_start(date)
Gibt den ersten Monat des Quartals zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameter**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag des Quartals

**Beispiel**:
~~~js
// 29. Juni 2019 14:30:10 -> 01 April, 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### year_start(date)
Gibt den ersten Tag des Jahres zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameter**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag des Jahres

**Beispiel**:
~~~js
// 29. Juni 2019 14:30 -> 01 Januar, 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~