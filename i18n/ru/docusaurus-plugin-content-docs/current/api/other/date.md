---
sidebar_label: date
title: date formatting methods
description: "A set of date formatting methods"
---

# date

### Description

@short: Набор методов форматирования дат 

@signature: date: DateHelpers


### Methods

#### add(date, number, unit)
Добавляет к дате или вычитает из неё указанный интервал времени

**Parameters**:
- `date` - (Date) - Объект даты
- `number` - (number) - Число единиц, которое нужно добавить (положительное) или вычесть (отрицательное)
- `unit` - (string) - Единица времени: 'minute', 'hour', 'day', 'week', 'month', 'year'

**Returns**: Date - Новый объект даты

**Example**:
~~~js
// adds 1 year to the specified date: 29 June, 2019 -> 29 June, 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

---

#### add_quarter(date, number)
Добавляет к дате или вычитает из неё указанное количество кварталов

**Parameters**:
- `date` - (Date) - Объект даты
- `number` - (number) - Число кварталов, которые нужно добавить (положительное) или вычесть (отрицательное)

**Returns**: Date - Новый объект даты

**Example**:
~~~js
// adds 1 quarter (3 months) to the specified date: 
// 29 June, 2019 -> 29 September, 2020
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~

---

#### convert_to_utc(date)
Преобразует локальное время в UTC

**Parameters**:
- `date` - (Date) - Объект даты для преобразования

**Returns**: Date - Объект даты в UTC

**Example**:
~~~js
// 29 June, 2019 14:00 (local time) -> 29 June, 2019 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

---

#### copy(date)
Делает копию объекта Date

**Parameters**:
- `date` - (Date) - Объект даты для копирования

**Returns**: Date - Скопированный объект даты

**Example**:
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29)); // -> 29 June, 2019
~~~

---

#### date_part(date)
Сбрасывает часть времени указанной даты до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты для форматирования

**Returns**: Date - Дата с временем, установленным на 00:00:00

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### date_to_str(format, utc)
Возвращает функцию, которая преобразует объект Date в строку заданного формата

**Parameters**:
- `format` - (string) - Формат даты (см. guides/date-format.md)
- `utc` - (boolean, optional) - Нужно ли преобразовать в UTC

**Returns**: Function - Функция форматирования

**Example**:
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~

---

#### day_start(date)
Сбрасывает время указанной даты до 00:00:00 (псевдоним date_part)

**Parameters**:
- `date` - (Date) - Объект даты для форматирования

**Returns**: Date - Дата с временной частью 00:00:00

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### getISOWeek(date)
Возвращает номер недели по ISO-8601 для даты (недели начинаются с понедельника)

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getUTCISOWeek(date)
Возвращает номер недели даты после преобразования к UTC

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getWeek(date)
Возвращает номер недели даты (начало недели зависит от gantt.config.start_on_monday)

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
// недели начинаются в воскресенье
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~

---

#### month_start(date)
Возвращает первый день месяца с временем, обнулённым до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день месяца

**Example**:
~~~js
// 29 June, 2019 14:30 -> 01 June, 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### parseDate(date, format)

Преобразует строку даты в объект Date. Этот метод вызывается во время [gantt.load()](api/method/load.md) и [gantt.parse()](api/method/parse.md) для разбора дат задач и связей.

**Parameters**:
- `date` - (string) - Строка даты для разбора
- `format` - (string | function, optional) - Строка формата даты (см. [Date Format Specification](guides/date-format.md)) или пользовательская функция парсера `(dateStr) => Date`

**Returns**: Date - Разобранный объект даты

**Parsing logic** (since v9.1.3):

1. **ISO 8601 check** - если строка совпадает с образцом ISO 8601 (например, `"2026-01-06"`, `"2026-01-06T10:30:00Z"`), она разбирается напрямую и `format` не используется. Если пользователь явно переопределил `gantt.templates.parse_date`, ISO авто-детектирование пропускается и пользовательская функция обрабатывает все разборы.
2. **`format` argument** - если передан как строка, она преобразуется в функцию парсера через `gantt.date.str_to_date(format)`; если передан как функция, она вызывается напрямую
3. **Fallback** - если формат не указан, используется шаблон [parse_date](api/template/parse_date.md)

**Examples**:
~~~js
// with an explicit format string
var date = gantt.date.parseDate("29/06/2019", "%d/%m/%Y");
// -> 29 June, 2019 00:00:00

// ISO string - parsed automatically, format is ignored
var date2 = gantt.date.parseDate("2026-01-06T10:30:00Z");
// -> 6 January, 2026 10:30:00 UTC

// with a custom parser function
var date3 = gantt.date.parseDate("Jan 6, 2026", function(str) {
    return new Date(str);
});
~~~

---

#### str_to_date(format, utc)
Возвращает функцию, которая преобразует строку в объект Date

**Parameters**:
- `format` - (string) - Формат даты (см. guides/date-format.md)
- `utc` - (boolean, optional) - Нужно ли преобразовать в UTC

**Returns**: Function - Функция парсинга

**Example**:
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 June, 2019 00:00:00
~~~

---

#### time_part(date)
Возвращает время в виде секунд после полуночи

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Секунды после полуночи

**Example**:
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### to_fixed(num)
Добавляет ведущий ноль к числам < 10

**Parameters**:
- `num` - (number) - Число для форматирования

**Returns**: string - Отформатированная строка

**Example**:
~~~js
var num1 = gantt.date.to_fixed(2); // ->"02"
var num2 = gantt.date.to_fixed(10); // ->10
~~~

---

#### minute_start(date)
Сбрасывает секунды до 00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Отформатированная дата

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### hour_start(date)
Сбрасывает минуты и секунды до 00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Отформатированная дата

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### week_start(date)
Возвращает первый день недели с временем, установленным на 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день недели

**Example**:
~~~js
// 29 June, 2019 14:30 -> 24 June, 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### quarter_start(date)
Возвращает первый месяц квартала с временем, установленным на 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день квартала

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 01 April, 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### year_start(date)
Возвращает первый день года с временем, установленным на 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день года

**Example**:
~~~js
// 29 June, 2019 14:30 -> 01 January, 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~