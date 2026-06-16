---
sidebar_label: date
title: 日期格式化方法
description: "一组日期格式化方法"
---

# date

### Description

@short: 一组日期格式化方法

@signature: date: DateHelpers


### Methods

#### `add(date, number, unit)`
向日期添加/减少指定的时间间隔

**Parameters**:
- `date` - (Date) - 日期对象
- `number` - (number) - 要添加的单位数量（正数表示添加，负数表示减去）
- `unit` - (string) - 时间单位：`minute`, `hour`, `day`, `week`, `month`, `year`

**Returns**: Date - 新的日期对象

**Example**:
~~~js
// adds 1 year to the specified date: 29 June, 2027 -> 29 June, 2028
const newDate = gantt.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

---

#### `add_quarter(date, number)`
向日期添加/减少指定数量的季度

**Parameters**:
- `date` - (Date) - 日期对象
- `number` - (number) - 要添加的季度数量（正数表示添加，负数表示减去）

**Returns**: Date - 新的日期对象

**Example**:
~~~js
// adds 1 quarter (3 months) to the specified date: 
// 29 June, 2027 -> 29 September, 2027
const newDate = gantt.date.add_quarter(new Date(2027, 5, 29), 1);
~~~

---

#### `convert_to_utc(date)`
将本地时间转换为 UTC

**Parameters**:
- `date` - (Date) - 要转换的日期对象

**Returns**: Date - UTC 日期对象

**Example**:
~~~js
// 29 June, 2027 14:00 (local time) -> 29 June, 2027 12:00 (utc)
const utcTime = gantt.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

---

#### `copy(date)`
复制一个 Date 对象

**Parameters**:
- `date` - (Date) - 要复制的日期对象

**Returns**: Date - 复制后的日期对象

**Example**:
~~~js
const copiedDate = gantt.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~

---

#### `date_part(date)`
返回一个日期的副本，并将时间部分重置为 00:00:00

**Parameters**:
- `date` - (Date) - 要格式化的日期对象

**Returns**: Date - 将时间重置为 00:00:00 的日期

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const dateWithoutTime = gantt.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `date_to_str(format, utc)`
返回一个将 Date 对象转换为指定格式字符串的函数

**Parameters**:
- `format` - (string) - 日期格式（见 [Date Format Specification](guides/date-format.md)）
- `utc` - (boolean, optional) - 是否转换为 UTC

**Returns**: Function - 格式化函数

**Example**:
~~~js
const formatDate = gantt.date.date_to_str("%d/%m/%Y");
const formattedDate = formatDate(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~

---

#### `day_start(date)`
返回一个日期的副本，将时间部分重置为 00:00:00（date_part() 的别名）

**Parameters**:
- `date` - (Date) - 要格式化的日期对象

**Returns**: Date - 将时间重置为 00:00:00 的日期

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 00:00:00
const dayStart = gantt.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `getISOWeek(date)`
返回日期的 ISO-8601 周数（周从周一开始）

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
const isoWeek = gantt.date.getISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getUTCISOWeek(date)`
在转换为 UTC 之后返回日期的周数

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
const utcIsoWeek = gantt.date.getUTCISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getWeek(date)`
返回日期的周数（周的开始取决于 `gantt.config.start_on_monday`）

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
// 周从周日开始
gantt.config.start_on_monday = false;

const isoWeek = gantt.date.getISOWeek(new Date(2027, 2, 25)); // ->12
const week = gantt.date.getWeek(new Date(2027, 2, 25)); // ->13
~~~

---

#### `month_start(date)`
返回该月的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 月份的第一天

**Example**:
~~~js
// 29 June, 2027 14:30 -> 01 June, 2027 00:00
const firstDayOfMonth = gantt.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `parseDate(date, format)`

将日期字符串转换为 Date 对象。此方法在 [`load()`](api/method/load.md) 和 [`parse()`](api/method/parse.md) 期间用于解析任务和链接日期属性。

**Parameters**:
- `date` - (string) - 要解析的日期字符串
- `format` - (string | function, optional) - 日期格式字符串（见 [Date Format Specification](guides/date-format.md)）或自定义解析函数 `(dateStr) => Date`

**Returns**: Date - 解析后的日期对象

**Parsing logic** (since v9.1.3):

1. **ISO 8601 检查** - 如果字符串匹配 ISO 8601 模式（例如 `"2027-01-06"`、`"2027-01-06T10:30:00Z"`），则直接解析，不查阅 `format`。如果用户显式覆盖了 `parse_date` 模板，则跳过 ISO 自动检测，用户函数处理所有解析。
2. **`format` 参数** - 如果以字符串提供，则通过 `str_to_date()` 将其转换为解析函数；如果提供为函数，则直接调用
3. **回退** - 如果未提供 `format`，则使用 [`parse_date`](api/template/parse_date.md) 模板

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
返回一个将字符串转换为 Date 对象的函数

**Parameters**:
- `format` - (string) - 日期格式（见 [Date Format Specification](guides/date-format.md)）
- `utc` - (boolean, optional) - 是否转换为 UTC

**Returns**: Function - 解析函数

**Example**:
~~~js
const parseDate = gantt.date.str_to_date("%d/%m/%Y");
const parsedDate = parseDate("29/06/2027"); // -> 29 June, 2027 00:00:00
~~~

---

#### `time_part(date)`
返回自午夜以来的秒数

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 自午夜以来的秒数

**Example**:
~~~js
const secondsSinceMidnight = gantt.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `to_fixed(num)`
为小于 10 的数字添加前导零

**Parameters**:
- `num` - (number) - 要格式化的数字

**Returns**: string - 格式化后的字符串

**Example**:
~~~js
const paddedNumber = gantt.date.to_fixed(2); // ->"02"
const unchangedNumber = gantt.date.to_fixed(10); // ->10
~~~

---

#### `minute_start(date)`
返回一个日期的副本，将秒和毫秒重置为 00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 格式化后的日期

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:30:00
const minuteStart = gantt.date.minute_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `hour_start(date)`
返回一个日期的副本，将分钟和秒重置为 00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 格式化后的日期

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 29 June, 2027 14:00:00
const hourStart = gantt.date.hour_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `week_start(date)`
返回一周的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 一周的第一天

**Example**:
~~~js
// 29 June, 2027 14:30 -> 28 June, 2027 00:00
const weekStart = gantt.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `quarter_start(date)`
返回季度的第一月，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 季度的第一天

**Example**:
~~~js
// 29 June, 2027 14:30:10 -> 01 April, 2027 00:00:00
const quarterStart = gantt.date.quarter_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `year_start(date)`
返回年份的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 年份的第一天

**Example**:
~~~js
// 29 June, 2027 14:30 -> 01 January, 2027 00:00
const yearStart = gantt.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~