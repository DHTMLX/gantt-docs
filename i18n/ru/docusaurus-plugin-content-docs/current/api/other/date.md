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

#### `add(date, number, unit)`
Добавляет или вычитает указанный временной интервал из даты

**Parameters**:
- `date` - (Date) - Объект Date
- `number` - (number) - Количество единиц для добавления (положительное) или вычитания (отрицательное)
- `unit` - (string) - Единица времени: `minute`, `hour`, `day`, `week`, `month`, `year`

**Returns**: Date - Новый объект даты

**Example**:
~~~js
// adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2028
const newDate = gantt.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

---

#### `add_quarter(date, number)`
Добавляет(а) или вычитает(а) указанное количество кварталов из даты

**Parameters**:
- `date` - (Date) - Объект Date
- `number` - (number) - Количество кварталов для добавления (положительное) или вычитания (отрицательное)

**Returns**: Date - Новый объект даты

**Example**:
~~~js
// adds 1 quarter (3 months) to the specified date: 
// 29 June, 2027 -> 29 September, 2027
const newDate = gantt.date.add_quarter(new Date(2027, 5, 29), 1);
~~~

---

#### `convert_to_utc(date)`
Преобразует локальное время в UTC

**Parameters**:
- `date` - (Date) - Объект даты, который следует преобразовать

**Returns**: Date - Объект даты в UTC

**Example**:
~~~js
// 29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const utcTime = gantt.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

---

#### `copy(date)`
Делает копию объекта Date

**Parameters**:
- `date` - (Date) - Объект даты, который нужно скопировать

**Returns**: Date - Скопированный объект даты

**Example**:
~~~js
const copiedDate = gantt.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~

---

#### `date_part(date)`
Возвращает копию даты с обнулением временной части до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Дата с времением 00:00:00

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const dateWithoutTime = gantt.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `date_to_str(format, utc)`
Возвращает функцию, которая преобразует объект Date в строку указанного формата

**Parameters**:
- `format` - (string) - Формат даты (см. [Спецификация форматов дат](guides/date-format.md))
- `utc` - (boolean, optional) - Преобразовывать ли в UTC

**Returns**: Function - Функция форматирования

**Example**:
~~~js
const formatDate = gantt.date.date_to_str("%d/%m/%Y");
const formattedDate = formatDate(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~

---

#### `day_start(date)`
Возвращает копию даты с временем, установленным на 00:00:00 (псевдоним `date_part()`)

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Дата с временем 00:00:00

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const dayStart = gantt.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `getISOWeek(date)`
Возвращает номер недели по ISO-8601 (недели начинаются с понедельника)

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
const isoWeek = gantt.date.getISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getUTCISOWeek(date)`
Возвращает номер недели даты после преобразования в UTC

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
const utcIsoWeek = gantt.date.getUTCISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getWeek(date)`
Возвращает номер недели даты (начало недели зависит от `gantt.config.start_on_monday`)

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Номер недели

**Example**:
~~~js
// weeks start on Sunday
gantt.config.start_on_monday = false;

const isoWeek = gantt.date.getISOWeek(new Date(2027, 2, 25)); // ->12
const week = gantt.date.getWeek(new Date(2027, 2, 25)); // ->13
~~~

---

#### `month_start(date)`
Возвращает первый день месяца с обнулением времени до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день месяца

**Example**:
~~~js
// 29 June, 2027 14:30 -> 01 June, 2027 00:00
const firstDayOfMonth = gantt.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `parseDate(date, format)`

Преобразует строку с датой в объект Date. Этот метод вызывается во время [`load()`](api/method/load.md) и [`parse()`](api/method/parse.md) для разбора дат задач и связей.

**Parameters**:
- `date` - (string) - Строка даты для разбора
- `format` - (string | function, optional) - Строка формата даты (см. [Спецификация форматов дат](guides/date-format.md)) или пользовательская функция парсинга `(dateStr) => Date`

**Returns**: Date - Разобранный объект Date

**Parsing logic** (since v9.1.3):

1. **ISO 8601 check** - если строка совпадает с шаблоном ISO 8601 (например, `"2027-01-06"`, `"2027-01-06T10:30:00Z"`), она разбирается напрямую и `format` не учитывается. Если пользователь явно переопределил шаблон `parse_date`, автоматическое обнаружение ISO пропускается, и функция пользователя обрабатывает весь разбор.
2. **`format` argument** - если передан как строка, она конвертируется в функцию парсинга через `str_to_date()`; если передан как функция, она вызывается напрямую
3. **Fallback** - если не указан `format`, используется шаблон [`parse_date`](api/template/parse_date.md)

**Examples**:
~~~js
// with an explicit format string
const parsedDate = gantt.date.parseDate("29/06/2027", "%d/%m/%Y");
// -> 29 June, 2027 00:00:00

// ISO string - parsed automatically, format is ignored
const parsedIsoDate = gantt.date.parseDate("2027-01-06T10:30:00Z");
// -> 6 January, 2027 10:30:00 UTC

// with a custom parser function
const parsedCustomDate = gantt.date.parseDate("Jan 6, 2027", (str) => {
    return new Date(str);
});
~~~

---

#### `str_to_date(format, utc)`
Возвращает функцию, которая преобразует строку в объект Date

**Parameters**:
- `format` - (string) - Формат даты (см. [Спецификация форматов дат](guides/date-format.md))
- `utc` - (boolean, optional) - Преобразовывать ли в UTC

**Returns**: Function - Функция парсинга

**Example**:
~~~js
const parseDate = gantt.date.str_to_date("%d/%m/%Y");
const parsedDate = parseDate("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~

---

#### `time_part(date)`
Возвращает время как секунды с полуночи

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: number - Секунд с полуночи

**Example**:
~~~js
const secondsSinceMidnight = gantt.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `to_fixed(num)`
Добавляет ведущий ноль к числам < 10

**Parameters**:
- `num` - (number) - Число для форматирования

**Returns**: string - Форматированная строка

**Example**:
~~~js
const paddedNumber = gantt.date.to_fixed(2); // ->"02"
const unchangedNumber = gantt.date.to_fixed(10); // ->10
~~~

---

#### `minute_start(date)`
Возвращает копию даты с установкой секунд и миллисекунд в 00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Отформатированная дата

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:30:00
const minuteStart = gantt.date.minute_start(new Date(2027, 5, 29, 14, 30, 10));
~~~ 

---

#### `hour_start(date)`
Возвращает копию даты с обнулением минут и секунд до 00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Отформатированная дата

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:00:00
const hourStart = gantt.date.hour_start(new Date(2027, 5, 29, 14, 30, 10));
~~~ 

---

#### `week_start(date)`
Возвращает первый день недели с обнулением времени до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день недели

**Example**:
~~~js
// 29 June, 2027 14:30 -> 28 June, 2027 00:00
const weekStart = gantt.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `quarter_start(date)`
Возвращает первый месяц квартала с обнулением времени до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день квартала

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 01 April, 2027 00:00:00
const quarterStart = gantt.date.quarter_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `year_start(date)`
Возвращает первый день года с обнулением времени до 00:00:00

**Parameters**:
- `date` - (Date) - Объект даты

**Returns**: Date - Первый день года

**Example**:
~~~js
// 29 June, 2027 14:30 -> 01 January, 2027 00:00
const yearStart = gantt.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~