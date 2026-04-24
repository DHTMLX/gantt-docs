---
sidebar_label: format_date
title: format_date template
description: "преобразует объект даты в строку даты. Используется для отправки данных обратно на сервер"
---

# format_date

### Description

@short: Преобразует объект даты в строку даты. Используется для отправки данных обратно на сервер

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - текстовое представление даты

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

Проверьте [Спецификация формата даты](guides/date-format.md).

## Загрузка дат в формате ISO

С версии v9.1.3, когда на входе обнаруживаются даты в формате ISO 8601, даты автоматически сериализуются обратно в строки ISO — если вы явно не переопределите этот шаблон. Если вы определяете пользовательскую функцию `format_date`, она имеет приоритет и применяется ко всем датам, включая ISO.

:::tip Gantt v9.1.2 and earlier
В версиях до v9.1.3 ISO-даты не распознавались автоматически. Если вы используете более старую версию, вам нужно переопределить шаблоны для обработки ISO-строк:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

В версии v9.1.3+ эти переопределения не требуются для ISO дат.
:::

Для получения дополнительных сведений смотрите [Загрузка дат в формате ISO](guides/loading.md#loading-dates-in-iso-format).

## Изменение формата даты динамически

Если вам нужно динамически изменить [date format](api/config/date_format.md), необходимо изменить шаблон [parse_date](api/template/parse_date.md) следующим образом:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Data Loading](guides/loading.md)
- [Operations with Dates](guides/date-operations.md)
- [Server-Side Integration](guides/server-side.md)
- [Date Format Specification](guides/date-format.md)