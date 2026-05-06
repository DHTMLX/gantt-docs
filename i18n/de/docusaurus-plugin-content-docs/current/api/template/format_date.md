---
sidebar_label: format_date
title: format_date template
description: "Konvertiert ein Date-Objekt in eine Datumszeichenkette. Wird verwendet, um Daten an den Server zurückzusenden"
---

# format_date

### Description

@short: Wandelt ein Date-Objekt in eine Datumszeichenkette um. Wird verwendet, um Daten an den Server zurückzusenden

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

- ` text` - (string) - eine Textdarstellung des Datums

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Check [Datumsformat-Spezifikation](guides/date-format.md).

## Laden von Daten im ISO-Format

Seit v9.1.3 werden ISO 8601-Daten, die beim Eingang erkannt werden, automatisch wieder als ISO-Strings serialisiert – es sei denn, Sie überschreiben diese Vorlage explizit. Wenn Sie eine benutzerdefinierte `format_date`-Funktion definieren, hat sie Vorrang und wird für alle Daten verwendet, einschließlich ISO.

:::tip Gantt v9.1.2 und früher
In Versionen vor v9.1.3 wurden ISO-Daten nicht automatisch erkannt. Wenn Sie eine ältere Version verwenden, müssen Sie die Vorlagen überschreiben, um ISO-Zeichenfolgen zu behandeln:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

Ab v9.1.3+ sind diese Überschreibungen für ISO-Daten nicht mehr notwendig.
:::

Für weitere Details siehe [Laden von Daten im ISO-Format](guides/loading.md#loading-dates-in-iso-format).

## Dynamische Änderung des Datumsformats

Wenn Sie das [Datumsformat](api/config/date_format.md) dynamisch ändern müssen, ist es notwendig, die [parse_date](api/template/parse_date.md) Vorlage wie folgt zu ändern:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Datenladen](guides/loading.md)
- [Operationen mit Datumsangaben](guides/date-operations.md)
- [Serverseitige Integration](guides/server-side.md)
- [Datumsformat-Spezifikation](guides/date-format.md)

