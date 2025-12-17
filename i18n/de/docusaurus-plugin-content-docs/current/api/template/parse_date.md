---
sidebar_label: parse_date
title: parse_date template
description: "wandelt einen Datums-String in ein Date-Objekt um"
---

# parse_date

### Description

@short: Wandelt einen Datums-String in ein Date-Objekt um

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (required) *string* - der String, der geparst werden soll

### Returns
- ` date` - (Date) - Date-Objekt

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

Diese Funktion wird während **gantt.load()** oder **gantt.parse()** aufgerufen, um die *start_date/end_date*-Felder von Tasks zu konvertieren, wenn diese als Strings übergeben werden. 
Wenn Sie ein benutzerdefiniertes Format verwenden, das der Standardparser nicht verarbeiten kann, können Sie diese Funktion überschreiben. Weitere Details finden Sie in ["Datumsformat-Spezifikation"](guides/date-format.md).

[Mehr über Date-Objekte erfahren](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## Laden von Daten im ISO-Format

Gantt unterstützt ISO-Datumsformate. Um diese zu verwenden, überschreiben Sie einfach die Funktionen zum Parsen und Formatieren von Daten wie folgt:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- ["Datenladen"](guides/loading.md)
- ["Datumsformat-Spezifikation"](guides/date-format.md)
- ["Serverseitige Integration"](guides/server-side.md)

