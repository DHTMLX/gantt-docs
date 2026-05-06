---
sidebar_label: parse_date
title: parse_date template
description: "wandelt Datumszeichenfolge in ein Date-Objekt um"
---

# parse_date

### Description

@short: Wandelt Datumszeichenfolge in ein Date-Objekt um

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (erforderlich) *string* - der String, der geparst werden muss

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

Diese Funktion kann aus Aufrufen zu **gantt.load()** oder **gantt.parse()** aufgerufen werden, um Datumsangaben von Aufgaben zu parsen, falls sie im Zeichenkettenformat vorliegen. 

Diese Funktion kann neu definiert werden, wenn Sie ein benutzerdefiniertes Datumsformat verwenden, das von der Standardmethode nicht parsen kann. Siehe [Datumsformat-Spezifikation](guides/date-format.md).

[Weitere Informationen zu Date-Objekten](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Laden von Datumsangaben im ISO-Format

Seit v9.1.3 erkennt und parst ISO-8601-Datumsstrings automatisch Gantt. Ein manueller `parse_date` Override ist für ISO-Datumsangaben nicht erforderlich. Wenn Sie diese Vorlage jedoch überschreiben, hat Ihre Funktion Vorrang - ISO-Autodetektion wird übersprungen und Ihre Funktion verarbeitet alle Datumsstrings.

:::tip Gantt v9.1.2 und früher
In Versionen vor v9.1.3 wurden ISO-Datumsangaben nicht automatisch erkannt. Wenn Sie eine ältere Version verwenden, müssen Sie diese Vorlage überschreiben, um ISO-Strings zu behandeln:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

In v9.1.3+, these overrides are unnecessary for ISO dates.
:::


Für weitere Details siehe [Laden von Datumsangaben im ISO-Format](guides/loading.md#loading-dates-in-iso-format).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Datenladen](guides/loading.md)
- [Datumsformat-Spezifikation](guides/date-format.md)
- [Server-seitige Integration](guides/server-side.md)