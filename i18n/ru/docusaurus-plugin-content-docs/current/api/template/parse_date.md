---
sidebar_label: parse_date
title: parse_date template
description: "преобразует строку с датой в объект Date"
---

# parse_date

### Description

@short: Преобразует строку с датой в объект Date

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (required) *string* - строка, которую нужно распарсить

### Returns
- ` date` - (Date) - объект даты

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

Эта функция вызывается во время **gantt.load()** или **gantt.parse()** для преобразования полей *start_date/end_date* задач, если они приходят в виде строк. 
Если вы используете кастомный формат, который стандартный парсер не поддерживает, вы можете переопределить эту функцию. Подробнее смотрите в [Спецификация формата даты](guides/date-format.md).

[Узнайте больше об объектах date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## Загрузка дат в ISO формате

Gantt поддерживает ISO форматы дат. Чтобы использовать их, просто переопределите функции парсинга и форматирования даты следующим образом:

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
- [Загрузка данных](guides/loading.md)
- [Спецификация формата даты](guides/date-format.md)
- [Интеграция с серверной стороной](guides/server-side.md)

