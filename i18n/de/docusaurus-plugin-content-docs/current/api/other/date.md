---
sidebar_label: date
title: date formatting methods
description: "Eine Sammlung von Datumsformatierungsfunktionen"
---

# date

### Description

@short: Eine Sammlung von Datumsformatierungsfunktionen

@signature: date: DateHelpers

### Methods

#### `add(date, number, unit)`
Fügt das angegebene Zeitintervall dem Datum hinzu bzw. subtrahiert es

**Parameters**:
- `date` - (Date) - Das Datumsobjekt
- `number` - (number) - Die Anzahl der Einheiten, die hinzugefügt (positiv) oder subtrahiert (negativ) werden
- `unit` - (string) - Zeiteinheit: `minute`, `hour`, `day`, `week`, `month`, `year`

**Rückgabe**: Date - Das neue Datumsobjekt

**Beispiel**:
~~~js
// adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2028
const newDate = gantt.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

---

#### `add_quarter(date, number)`
Fügt dem Datum die angegebene Anzahl von Quartalen hinzu bzw. subtrahiert sie

**Parameters**:
- `date` - (Date) - Das Datumsobjekt
- `number` - (number) - Die Anzahl der hinzuzufügenden (positiv) oder abzuziehenden (negativ) Quartale

**Rückgabe**: Date - Das neue Datumsobjekt

**Beispiel**:
~~~js
// fügt dem angegebenen Datum 1 Quartal (3 Monate) hinzu: 
// 29. Juni 2027 -> 29. September 2027
const newDate = gantt.date.add_quarter(new Date(2027, 5, 29), 1);
~~~

---

#### `convert_to_utc(date)`
Konvertiert die lokale Zeit zu UTC

**Parameters**:
- `date` - (Date) - Das zu konvertierende Datumsobjekt

**Rückgabe**: Date - Das UTC-Datumsobjekt

**Beispiel**:
~~~js
// 29. Juni 2027 14:00 (lokale Zeit) -> 29. Juni 2027 12:00 (UTC)
const utcTime = gantt.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

---

#### `copy(date)`
Kopiert ein Date-Objekt

**Parameters**:
- `date` - (Date) - Das zu kopierende Datumsobjekt

**Rückgabe**: Date - Das kopierte Datumsobjekt

**Beispiel**:
~~~js
const copiedDate = gantt.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~

---

#### `date_part(date)`
Setzt den Zeitanteil des übergebenen Datums auf 00:00:00 zurück

**Parameters**:
- `date` - (Date) - Das zu formatierende Datum

**Rückgabe**: Date - Das Datum mit der Zeit auf 00:00:00 zurückgesetzt

**Beispiel**:
~~~js
// 29. Juni 2027 14:30:10 -> 29. Juni 2027 00:00:00
const dateWithoutTime = gantt.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `date_to_str(format, utc)`
Gibt eine Funktion zurück, die ein Date-Objekt in einen String des angegebenen Formats konvertiert

**Parameters**:
- `format` - (string) - Das Datumsformat (siehe [Datums-Format-Spezifikation](guides/date-format.md))
- `utc` - (boolean, optional) - Ob in UTC konvertiert werden soll

**Rückgabe**: Function - Die Formatierungsfunktion

**Beispiel**:
~~~js
const formatDate = gantt.date.date_to_str("%d/%m/%Y");
const formattedDate = formatDate(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~

---

#### `day_start(date)`
Gibt eine Kopie des Datums zurück, bei der der Zeitanteil auf 00:00:00 zurückgesetzt ist (Alias von `date_part()`)

**Parameters**:
- `date` - (Date) - Das zu formatierende Datum

**Rückgabe**: Date - Das Datum mit der Zeit auf 00:00:00 zurückgesetzt

**Beispiel**:
~~~js
// 29. Juni 2027 14:30:10 -> 29. Juni 2027 00:00:00
const dayStart = gantt.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `getISOWeek(date)`
Gibt die ISO-8601-Wochennummer des Datums zurück (Wochen beginnen am Montag)

**Parameters**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
const isoWeek = gantt.date.getISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getUTCISOWeek(date)`
Gibt die Wochennummer des Datums nach der Umrechnung in UTC zurück

**Parameters**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
const utcIsoWeek = gantt.date.getUTCISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getWeek(date)`
Gibt die Wochennummer des Datums zurück (Wochenbeginn hängt von `gantt.config.start_on_monday` ab)

**Parameters**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Die Wochennummer

**Beispiel**:
~~~js
// Wochen beginnen am Sonntag
gantt.config.start_on_monday = false;

const isoWeek = gantt.date.getISOWeek(new Date(2027, 2, 25)); // ->12
const week = gantt.date.getWeek(new Date(2027, 2, 25)); // ->13
~~~

---

#### `month_start(date)`
Gibt den ersten Tag des Monats zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameters**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: Date - Der erste Tag des Monats

**Beispiel**:
~~~js
// 29. Juni 2027 14:30 -> 01. Juni 2027 00:00
const firstDayOfMonth = gantt.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `parseDate(date, format)`

Konvertiert eine Datumszeichenfolge in ein Date-Objekt. Diese Methode wird während [`load()`](api/method/load.md) und [`parse()`](api/method/parse.md) aufgerufen, um Aufgaben- und Link-Datumseigenschaften zu parsen.

**Parameters**:
- `date` - (string) - Die zu parseende Datumszeichenfolge
- `format` - (string | function, optional) - Ein Datumsformat-String (siehe [Date Format Specification](guides/date-format.md)) oder eine benutzerdefinierte Parser-Funktion `(dateStr) => Date`

**Rückgabe**: Date - Das geparste Datum-Objekt

**Parsing-Logik** (seit v9.1.3):

1. **ISO 8601 Prüfung** – Falls der String einem ISO 8601-Muster entspricht (z. B. `"2026-01-06"`, `"2026-01-06T10:30:00Z"`), wird er direkt geparst und `format` wird nicht berücksichtigt. Falls der Benutzer `gantt.templates.parse_date` explizit überschrieben hat, wird die ISO-Auto-Erkennung übersprungen und die Funktion des Benutzers übernimmt das Parsen.
2. **`format`-Argument** – Wird es als String bereitgestellt, wird es durch `gantt.date.str_to_date(format)` in eine Parser-Funktion umgewandelt; wird es als Funktion bereitgestellt, wird es direkt aufgerufen
3. **Fallback** – Falls kein `format` angegeben ist, wird das [`parse_date`](api/template/parse_date.md) Template verwendet

**Beispiele**:
~~~js
// with an explicit format string
const parsedDate = gantt.date.parseDate("29/06/2027", "%d/%m/%Y");
// -> 29 June, 2027 00:00:00

// ISO string - parsed automatically, format is ignored
const parsedIsoDate = gantt.date.parseDate("2027-01-06T10:30:00Z");
// -> 6 January, 2027 10:30:00 UTC

// with a custom parser function
const parsedCustomDate = gantt.date.parseDate("Jan 6, 2027", (str) => {
    return new Date(str);
});
~~~

---

#### `str_to_date(format, utc)`
Gibt eine Funktion zurück, die eine Zeichenkette in ein Date-Objekt konvertiert

**Parameters**:
- `format` - (string) - Das Datumsformat (siehe [Datums-Format-Spezifikation](guides/date-format.md))
- `utc` - (boolean, optional) - Ob in UTC konvertiert werden soll

**Rückgabe**: Function - Die Parsing-Funktion

**Beispiel**:
~~~js
const parseDate = gantt.date.str_to_date("%d/%m/%Y");
const parsedDate = parseDate("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~

---

#### `time_part(date)`
Gibt die Zeit als Sekunden seit Mitternacht zurück

**Parameters**:
- `date` - (Date) - Das Datumsobjekt

**Rückgabe**: number - Sekunden seit Mitternacht

**Beispiel**:
~~~js
const secondsSinceMidnight = gantt.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `to_fixed(num)`
Fügt führende Null bei Zahlen < 10 hinzu

**Parameters**:
- `num` - (number) - Die zu formatierende Zahl

**Rückgabe**: string - Der formatierte String

**Beispiel**:
~~~js
const paddedNumber = gantt.date.to_fixed(2); // ->"02"
const unchangedNumber = gantt.date.to_fixed(10); // ->10
~~~

---

#### `minute_start(date)`
Setzt Sekunden auf 00

**Parameters**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Das formatierte Datum

**Beispiel**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:30:00
const minuteStart = gantt.date.minute_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `hour_start(date)`
Gibt eine Kopie des Datums zurück, bei dem Minuten und Sekunden auf 00 zurückgesetzt werden

**Parameters**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Das formatierte Datum

**Beispiel**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:00:00
const hourStart = gantt.date.hour_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `week_start(date)`
Gibt den ersten Tag der Woche zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameters**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag der Woche

**Beispiel**:
~~~js
// 29 June, 2027 14:30 -> 28 June, 2027 00:00
const weekStart = gantt.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `quarter_start(date)`
Gibt den ersten Monat des Quartals zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameters**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag des Quartals

**Beispiel**:
~~~js
// 29 June, 2027 14:30:10 -> 01 April, 2027 00:00:00
const quarterStart = gantt.date.quarter_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `year_start(date)`
Gibt den ersten Tag des Jahres zurück, wobei die Zeit auf 00:00:00 zurückgesetzt wird

**Parameters**:
- `date` - (Date) - Das Datum

**Rückgabe**: Date - Der erste Tag des Jahres

**Beispiel**:
~~~js
// 29 June, 2027 14:30 -> 01 January, 2027 00:00
const yearStart = gantt.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~