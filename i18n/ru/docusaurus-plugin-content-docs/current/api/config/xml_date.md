---
sidebar_label: xml_date
title: xml_date config
description: "определяет форматы даты, используемые для парсинга данных из набора данных и отправки данных на сервер"
---

# xml_date

### Description

@short: Определяет форматы даты, используемые для парсинга данных из набора данных и отправки данных на сервер

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
 Свойство **xml_date** устарело. Пожалуйста, используйте вместо него [date_format](api/config/date_format.md): 
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
- [Спецификация формата даты](guides/date-format.md)

### Change log
- устарело с версии v6.2, удалено с версии v7.0

