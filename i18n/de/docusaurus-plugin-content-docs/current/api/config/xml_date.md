---
sidebar_label: xml_date
title: xml_date config
description: "Gibt die Datumsformate an, die zum Parsen von Daten aus einem Dataset und zum Senden von Daten an einen Server verwendet werden."
---

# xml_date

### Description

@short: Gibt die Datumsformate an, die zum Parsen von Daten aus einem Dataset und zum Senden von Daten an einen Server verwendet werden.

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

:::note
 Die **xml_date** Eigenschaft ist veraltet. Bitte verwenden Sie stattdessen [date_format](api/config/date_format.md): 
:::

~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

### Related API
- [xml_date](api/template/xml_date.md)
- [xml_format](api/template/xml_format.md)

### Related Guides
- ["Datumsformat-Spezifikation"](guides/date-format.md)

### Change log
- veraltet seit v6.2, entfernt seit v7.0

