--- 
sidebar_label: parse_date
title: parse_date template
description: "преобразует строку даты в объект Date"
---

# parse_date

### Description

@short: Преобразует строку даты в объект Date

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (обязательный) *строка* - строка, которую необходимо распарсить

### Returns
- ` date` - (Date) - объект Date

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

Эта функция может вызываться из вызовов **gantt.load()** или **gantt.parse()** для разбора свойств дат задач, если они заданы в строковом формате.

Эту функцию можно переопределить, если вы используете собственный формат даты, который метод по умолчанию не может распарсить. Смотрите [Спецификация форматов дат](guides/date-format.md).

[Подробнее об объектах Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## Загрузка дат в формате ISO

С версии 9.1.3 Gantt автоматически распознаёт и распарсивает даты в формате ISO 8601. Ручное переопределение `parse_date` для ISO-дат не требуется. Однако если вы переопределите этот шаблон, ваша функция имеет приоритет - автоматическое обнаружение ISO будет пропущено и ваша функция будет обрабатывать все строковые даты.

:::tip Gantt v9.1.2 and earlier
В версиях до v9.1.3 ISO-даты не распознавались автоматически. Если вы используете более старую версию, вам нужно переопределить этот шаблон для обработки ISO-строк:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

В v9.1.3+, эти переопределения не требуются для ISO-дат.
:::

Для получения дополнительной информации см. [Загрузка дат в формате ISO](guides/loading.md#loading-dates-in-iso-format).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Загрузка данных](guides/loading.md)
- [Спецификация форматов дат](guides/date-format.md)
- [Серверная интеграция](guides/server-side.md)