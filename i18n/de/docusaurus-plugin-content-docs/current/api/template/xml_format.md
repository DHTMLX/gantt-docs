---
sidebar_label: xml_format
title: xml_format-Vorlage
description: "Ein Datumsobjekt wird gemäß dieser Vorlage in eine Zeichenkette umgewandelt. Wird verwendet, um Daten an den Server zurückzusenden"
---

# xml_format
:::warning
Die Vorlage ist veraltet.
:::
### Description

@short: Ein Datumsobjekt wird gemäß dieser Vorlage in eine Zeichenkette umgewandelt. Wird verwendet, um Daten an den Server zurückzusenden

### Parameters

- `date` - (erforderlich) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Diagramm gerendert wird

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
Hinweis Die Vorlage ist veraltet. Verwenden Sie stattdessen [format_date](api/template/format_date.md):
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

Diese Vorlage wird automatisch aus der [xml_date](api/config/xml_date.md) Konfiguration generiert und kann nach der [Initialisierung von gantt](api/method/init.md) erneut definiert werden.

Eine benutzerdefinierte Vorlagenfunktion kann verwendet werden, wenn die Serverseite ein Format erwartet, das vom [gantt date helper](api/other/date.md) nicht unterstützt wird.

Zum Beispiel nehmen wir an, die Serverseite erwartet **start_date** als UNIX-Zeitstempel und die Request-Parameter sollten wie folgt aussehen:

- **start_date**:1503608400
- **duration**:4
- **text**:Aufgabe #2.2
- **parent**:3
- **end_date**:1503694800


Sie sollten die Gantt-Konfiguration wie folgt festlegen:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_format = function(date){
        return (date.valueOf() / 1000) + "";
    }
});

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~ 

### Related API
- [xml_date](api/config/xml_date.md)
- [date](api/other/date.md)
- [xml_date](api/template/xml_date.md)

### Related Guides
- [Templates for Date Conversion](guides/conversion-templates.md)
- [Server-Side Integration](guides/server-side.md)

### Change log
- Veraltet seit v6.2, entfernt seit v7.0

