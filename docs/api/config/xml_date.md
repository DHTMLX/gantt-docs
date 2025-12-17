---
sidebar_label: xml_date
title: xml_date config
description: "defines date formats that are used to parse data from a data set and to send data to a server"
---

# xml_date

:::warning
The property is deprecated.
:::

### Description

@short: Defines date formats that are used to parse data from a data set and to send data to a server

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
The **xml_date** property is deprecated. Use [date_format](api/config/date_format.md) instead: 
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
- [Date Format Specification](guides/date-format.md)

### Change log
- deprecated since v6.2, removed since v7.0

