---
sidebar_label: date_format
title: date_format config
description: "указывает формат даты, используемый для интерпретации данных из набора данных и для отправки дат обратно на сервер"
---

# date_format

### Description

@short: Указывает формат даты, используемый для интерпретации данных из набора данных и для отправки дат обратно на сервер

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

Этот параметр конфигурации используется для создания шаблонных функций [parse_date](api/template/parse_date.md) и [format_date](api/template/format_date.md). 
Чтобы использовать пользовательский формат, вы можете либо изменить это значение конфигурации, либо переопределить шаблоны **parse_date** и **format_date** напрямую.

## Загрузка дат в формате ISO

Gantt поддерживает ISO формат даты. Чтобы включить это, необходимо переопределить функции, отвечающие за парсинг и сериализацию дат:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Динамическое изменение формата даты

Чтобы динамически обновить формат даты, измените шаблон [parse_date](api/template/parse_date.md) следующим образом:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Спецификация формата даты](guides/date-format.md)

