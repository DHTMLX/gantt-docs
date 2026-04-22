---
sidebar_label: xml_date
title: xml_date конфигурация
description: "определяет форматы дат, которые используются для разбора данных из набора данных и отправки данных на сервер"
---

# xml_date

:::warning
Свойство устарело.
:::

### Description

@short: Определяет форматы дат, которые используются для разбора данных из набора данных и отправки данных на сервер

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Значение по умолчанию:** "%d-%m-%Y %H:%i"

### Details

:::note
Свойство **xml_date** устарело. Используйте [date_format](api/config/date_format.md) вместо него:
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
- устарело с версии v6.2, удалено с версии v7.0