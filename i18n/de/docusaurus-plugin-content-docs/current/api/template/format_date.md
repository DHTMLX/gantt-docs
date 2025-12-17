---
sidebar_label: format_date
title: format_date template
description: "wandelt ein Date-Objekt in einen Datumsstring um. Dies ist nützlich, wenn Daten zurück an den Server gesendet werden."
---

# format_date

### Description

@short: Wandelt ein Date-Objekt in einen Datumsstring um. Dies ist nützlich, wenn Daten zurück an den Server gesendet werden.

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - eine String-Darstellung des Datums

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Siehe ["Datumsformat-Spezifikation"](guides/date-format.md) für weitere Details.

## Laden von Daten im ISO-Format

Gantt unterstützt das ISO-Datumsformat. Um es zu verwenden, müssen Sie nur die Funktionen neu definieren, die für das Parsen und Formatieren von Daten zuständig sind:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Dynamisches Ändern des Datumsformats

Wenn Sie das [Datumsformat](api/config/date_format.md) zur Laufzeit ändern möchten, sollten Sie auch die [parse_date](api/template/parse_date.md) Vorlage wie folgt aktualisieren:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- ["Datenladen"](guides/loading.md)
- ["Operationen mit Datumsangaben"](guides/date-operations.md)
- ["Serverseitige Integration"](guides/server-side.md)
- ["Datumsformat-Spezifikation"](guides/date-format.md)

