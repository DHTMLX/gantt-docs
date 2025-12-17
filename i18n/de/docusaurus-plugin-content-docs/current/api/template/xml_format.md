---
sidebar_label: xml_format
title: xml_format template
description: "Wandelt ein Date-Objekt in einen String um, der diesem Template folgt. Dies wird verwendet, um Daten zurück an den Server zu senden."
---

# xml_format

### Description

@short: Wandelt ein Date-Objekt in einen String um, der diesem Template folgt. Dies wird verwendet, um Daten zurück an den Server zu senden.

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden soll.

### Returns
- ` text` - (string) - HTML-Text, der im Gantt-Chart angezeigt wird.

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 Dieses Template ist veraltet. Bitte verwenden Sie stattdessen [format_date](api/template/format_date.md): 
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

Dieses Template wird automatisch aus der Konfiguration [xml_date](api/config/xml_date.md) generiert und kann nach der [Gantt-Initialisierung](api/method/init.md) neu definiert werden.

Eine benutzerdefinierte Template-Funktion kann erstellt werden, wenn der Server ein Datumsformat verlangt, das vom [Gantt date helper](api/other/date.md) nicht unterstützt wird.

Beispielsweise, wenn der Server **start_date** als UNIX-Timestamp erwartet und die Anfrageparameter wie folgt sein sollen:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800

kann die Gantt-Konfiguration so eingerichtet werden:

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
- ["Vorlagen für die Datumskonvertierung"](guides/conversion-templates.md)
- ["Serverseitige Integration"](guides/server-side.md)

### Change log
- Veraltet seit v6.2, entfernt seit v7.0

