---
sidebar_label: xml_date
title: xml_date Konfiguration
description: "definiert Datumsformate, die verwendet werden, um Daten aus einem Datensatz zu parsen und Daten an einen Server zu senden"
---

# xml_date

:::warning
Die Eigenschaft ist veraltet.
:::

### Description

@short: Definiert Datumsformate, die verwendet werden, um Daten aus einem Datensatz zu parsen und Daten an einen Server zu senden

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Standardwert:** "%d-%m-%Y %H:%i"

### Details

:::note
Die **xml_date** Eigenschaft ist veraltet. Verwenden Sie stattdessen [date_format](api/config/date_format.md):
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
- [Datumsformat-Spezifikation](guides/date-format.md)

### Change log
- veraltet seit v6.2, entfernt seit v7.0