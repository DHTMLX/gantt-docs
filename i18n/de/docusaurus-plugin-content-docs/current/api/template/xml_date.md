---
sidebar_label: xml_date
title: xml_date template
description: "Diese Vorlage konvertiert einen String aus einer XML-Datei in ein Datumsobjekt basierend auf einem angegebenen Format."
---

# xml_date

### Description

@short: Diese Vorlage konvertiert einen String aus einer XML-Datei in ein Datumsobjekt basierend auf einem angegebenen Format.

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll.

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Chart angezeigt wird.

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 Diese Vorlage ist veraltet. Bitte verwenden Sie stattdessen [parse_date](api/template/parse_date.md): 
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

Diese Vorlage wird automatisch aus der Konfiguration [xml_date](api/config/xml_date.md) generiert und kann nach der [Gantt-Initialisierung](api/method/init.md) angepasst werden.

Sie können eine eigene Template-Funktion erstellen, wenn das Server-Datumsformat vom [Gantt date helper](api/other/date.md) nicht unterstützt wird.

Zum Beispiel bei Verwendung von UNIX-Zeit für **start_date**: 

~~~js
{
    "data":[
    {
        "id":1,
        "start_date":1503608400,
        "duration":10,
        "text":"Task #1",
        "parent":0,
    },
    {
        "id":2,
        "start_date":1503694800,
        "duration":4,
        "text":"Task #2",
        "parent":0,
    }],

    "links":[
    ]
}
~~~

Die Gantt-Konfiguration sollte wie folgt eingerichtet werden:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_date = function(dateString){
        return new Date(dateString * 1000);
    }
});

gantt.init("gantt_here");
gantt.load("/data");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [xml_format](api/template/xml_format.md)
- [date](api/other/date.md)

### Related Guides
- ["Vorlagen für die Datumskonvertierung"](guides/conversion-templates.md)

### Change log
- Veraltet seit Version 6.2, entfernt in Version 7.0

