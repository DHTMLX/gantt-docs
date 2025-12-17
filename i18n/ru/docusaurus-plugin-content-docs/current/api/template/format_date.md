---
sidebar_label: format_date
title: format_date template
description: "преобразует объект даты в строку даты. Это полезно при отправке данных обратно на сервер."
---

# format_date

### Description

@short: Преобразует объект даты в строку даты. Это полезно при отправке данных обратно на сервер.

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - строковое представление даты

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Подробнее смотрите в [Спецификация формата даты](guides/date-format.md).

## Загрузка дат в формате ISO

Gantt поддерживает ISO формат даты. Чтобы использовать его, нужно просто переопределить функции, отвечающие за парсинг и форматирование дат:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Динамическое изменение формата даты

Если вы хотите обновить [формат даты](api/config/date_format.md) на лету, нужно также обновить шаблон [parse_date](api/template/parse_date.md) следующим образом:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Загрузка данных](guides/loading.md)
- [Операции с датами](guides/date-operations.md)
- [Интеграция с серверной стороной](guides/server-side.md)
- [Спецификация формата даты](guides/date-format.md)

