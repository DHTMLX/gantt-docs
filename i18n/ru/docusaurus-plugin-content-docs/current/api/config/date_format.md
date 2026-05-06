---
sidebar_label: date_format
title: date_format config
description: "устанавливает формат даты, который используется для разбора данных из набора данных и отправки дат обратно на сервер"
---

# date_format

### Description

@short: Устанавливает формат даты, который используется для разбора данных из набора данных и отправки дат обратно на сервер

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Значение по умолчанию:** "%d-%m-%Y %H:%i"

### Details

Это значение конфигурации используется для генерации [`parse_date`](api/template/parse_date.md) и [`format_date`](api/template/format_date.md) шаблонных функций.
Если вы хотите использовать собственный формат, вы можете либо изменить эту конфигурацию, либо напрямую переопределить шаблоны `parse_date` и `format_date`.

## Loading dates in ISO format

С версии v9.1.3 Gantt автоматически распознаёт и парсит даты в формате ISO 8601. Конфигурация `date_format` не нужна для ISO-строк — они распознаются и парсятся напрямую.

Когда на входе обнаруживаются даты в формате ISO, они автоматически сериализуются обратно в ISO-строки при передаче в [DataProcessor](api/method/dataprocessor.md). Строки, содержащие только дату (например, "2026-01-06"), сериализуются обратно как строки с датой, сохраняя исходный формат.

Конфигурация `date_format` по-прежнему применяется к не-ISO строкам дат.

:::tip Gantt v9.1.2 и ранее
В версиях до v9.1.3 ISO-даты не распознавались автоматически. Если вы используете более старую версию, вам нужно переопределить шаблоны `parse_date` и `format_date`, чтобы обрабатывать ISO-строки:

~~~js
gantt.templates.parse_date = (date) => new Date(date);
gantt.templates.format_date = (date) => date.toISOString();
~~~

:::

Для получения дополнительных сведений смотрите [Загрузка дат в формате ISO](guides/loading.md#loading-dates-in-iso-format).

## Changing the date format dynamically

Если вам нужно динамически изменить формат даты, необходимо изменить шаблон [`parse_date`](api/template/parse_date.md) следующим образом:

~~~js
const config = gantt.config;
const parseDate = gantt.date.str_to_date(config.date_format, config.server_utc);

gantt.templates.parse_date = (date) => parseDate(date);
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)