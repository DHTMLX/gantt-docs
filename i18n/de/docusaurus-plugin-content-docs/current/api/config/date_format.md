---
sidebar_label: date_format
title: date_format config
description: "gibt das Datumsformat an, das verwendet wird, um Daten aus einem Datensatz zu interpretieren und Daten zurück an den Server zu senden"
---

# date_format

### Description

@short: Gibt das Datumsformat an, das verwendet wird, um Daten aus einem Datensatz zu interpretieren und Daten zurück an den Server zu senden

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

Diese Konfigurationsoption wird genutzt, um die Template-Funktionen [parse_date](api/template/parse_date.md) und [format_date](api/template/format_date.md) zu erstellen. 
Um ein benutzerdefiniertes Format zu verwenden, können Sie entweder diesen Config-Wert anpassen oder die **parse_date** und **format_date** Templates direkt überschreiben.

## Laden von Daten im ISO-Format

Gantt unterstützt das ISO-Datumsformat. Um dies zu aktivieren, müssen Sie die Funktionen überschreiben, die für das Parsen und Serialisieren von Daten verantwortlich sind:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Dynamisches Ändern des Datumsformats

Um das Datumsformat dynamisch zu aktualisieren, ändern Sie das [parse_date](api/template/parse_date.md) Template wie folgt:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- ["Datumsformat-Spezifikation"](guides/date-format.md)

