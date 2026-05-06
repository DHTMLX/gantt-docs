---
sidebar_label: date_format
title: date_format config
description: "legt das Datumsformat fest, das verwendet wird, um Daten aus einem Datensatz zu parsen und Datumsangaben an den Server zurückzusenden"
---

# date_format

### Description

@short: Legt das Datumsformat fest, das verwendet wird, um Daten aus einem Datensatz zu parsen und Datumsangaben an den Server zurückzusenden

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Standardwert:** "%d-%m-%Y %H:%i"

### Details

Dieser Config-Wert wird verwendet, um die Template-Funktionen [`parse_date`](api/template/parse_date.md) und [`format_date`](api/template/format_date.md) zu erzeugen. Wenn Sie ein benutzerdefiniertes Format verwenden möchten, können Sie entweder diese Konfiguration ändern oder direkt die Templates parse_date und format_date neu definieren.

## Loading dates in ISO format

Seit Version 9.1.3 erkennt Gantt automatisch ISO-8601-Datumsstrings und parst sie. Der date_format-Konfigurationswert ist für ISO-Strings nicht nötig – sie werden automatisch erkannt und direkt geparst.

Wenn ISO-Datumsstrings bei der Eingabe erkannt werden, werden sie beim Weiterreichen an den DataProcessor automatisch wieder als ISO-Strings serialisiert. Nur-Datum-Strings (z. B. "2026-01-06") werden als Datums-Strings serialisiert, wobei das ursprüngliche Format beibehalten wird.

Der date_format-Konfigurationswert gilt weiterhin für Nicht-ISO-Datumsstrings.

:::tip Gantt v9.1.2 und älter
In Versionen vor v9.1.3 wurden ISO-Datumsangaben nicht automatisch erkannt. Wenn Sie eine ältere Version verwenden, müssen Sie die Templates `parse_date` und `format_date` überschreiben, um ISO-Strings zu behandeln:

~~~js
gantt.templates.parse_date = (date) => new Date(date);
gantt.templates.format_date = (date) => date.toISOString();
~~~

:::

Für weitere Details siehe [Laden von Datumsangaben im ISO-Format](guides/loading.md#loading-dates-in-iso-format).

## Dynamische Änderung des Datumsformats

Wenn Sie das Datumsformat dynamisch ändern müssen, ist es notwendig, das [`parse_date`](api/template/parse_date.md) Template wie folgt zu ändern:

~~~js
const config = gantt.config;
const parseDate = gantt.date.str_to_date(config.date_format, config.server_utc);

gantt.templates.parse_date = (date) => parseDate(date);
~~~

### Verwandte API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Verwandte Guides
- [Datumsformat-Spezifikation](guides/date-format.md)