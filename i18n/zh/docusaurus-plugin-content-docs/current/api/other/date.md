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

#### add(date, number, unit)
在日期上添加/减少指定的时间间隔

**Parameters**:
- `date` - (Date) - 日期对象
- `number` - (number) - 要添加的单位数量（正数）或要减去的单位数量（负数）
- `unit` - (string) - 时间单位：'minute', 'hour', 'day', 'week', 'month', 'year'

**Returns**: Date - 新的日期对象

**Example**:
~~~js
// 给指定日期增加 1 年: 2019-06-29 -> 2020-06-29
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

---

#### add_quarter(date, number)
对日期进行添加/减少指定数量的季度

**Parameters**:
- `date` - (Date) - 日期对象
- `number` - (number) - 要添加的季度数量（正数）或要减去的数量（负数）

**Returns**: Date - 新的日期对象

**Example**:
~~~js
// 给指定日期增加 1 个季度（3 个月）:
// 2019-06-29 -> 2020-09-29
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~

---

#### convert_to_utc(date)
将本地时间转换为 UTC

**Parameters**:
- `date` - (Date) - 需要转换的日期对象

**Returns**: Date - UTC 日期对象

**Example**:
~~~js
// 2019-06-29 14:00（本地时间） -> 2019-06-29 12:00（UTC）
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

---

#### copy(date)
复制一个 Date 对象

**Parameters**:
- `date` - (Date) - 需要复制的日期对象

**Returns**: Date - 复制后的日期对象

**Example**:
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29)); // -> 2019-06-29
~~~

---

#### date_part(date)
将提供日期的时间部分重置为 00:00:00

**Parameters**:
- `date` - (Date) - 要格式化的日期对象

**Returns**: Date - 时间重置为 00:00:00 的日期

**Example**:
~~~js
// 2019-06-29 14:30:10 -> 2019-06-29 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### date_to_str(format, utc)
返回一个将 Date 对象转换为指定格式字符串的函数

**Parameters**:
- `format` - (string) - 日期格式（见 guides/date-format.md）
- `utc` - (boolean, optional) - 是否转换为 UTC

**Returns**: Function - 格式化函数

**Example**:
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~

---

#### day_start(date)
将提供日期的时间部分重置为 00:00:00（date_part 的别名）

**Parameters**:
- `date` - (Date) - 要格式化的日期对象

**Returns**: Date - 时间重置为 00:00:00 的日期

**Example**:
~~~js
// 2019-06-29 14:30:10 -> 2019-06-29 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### getISOWeek(date)
返回日期的 ISO-8601 周数（周从周一开始）

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getUTCISOWeek(date)
将日期转换为 UTC 后返回周数

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getWeek(date)
返回日期的周数（周起始取决于 gantt.config.start_on_monday）

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 周数

**Example**:
~~~js
// 周从周日开始
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~

---

#### month_start(date)
返回该月的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 当月第一天

**Example**:
~~~js
// 2019-06-29 14:30 -> 2019-06-01 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### parseDate(date, format)

将日期字符串转换为 Date 对象。此方法在 [gantt.load()](api/method/load.md) 和 [gantt.parse()](api/method/parse.md) 期间用于解析任务和链接的日期属性。

**Parameters**:
- `date` - (string) - 要解析的日期字符串
- `format` - (string | function, optional) - 日期格式字符串（见 [Date Format Specification](guides/date-format.md)）或自定义解析函数 `(dateStr) => Date`

**Returns**: Date - 解析后的日期对象

**Parsing logic**（自 v9.1.3 起）：

1. **ISO 8601 检查** - 如果字符串匹配 ISO 8601 模式（例如 `"2026-01-06"`、`"2026-01-06T10:30:00Z"`），将直接解析，不会查阅 `format`。如果用户明确覆盖了 `gantt.templates.parse_date`，则跳过 ISO 自动检测，由用户函数处理所有解析。
2. **`format` 参数** - 如果以字符串提供，则通过 `gantt.date.str_to_date(format)` 将其转换为解析函数；如果以函数提供，则直接调用
3. **回退** - 如果未提供 `format`，则使用 [parse_date](api/template/parse_date.md) 模板

**Examples**:
~~~js
// 使用显式格式字符串
var date = gantt.date.parseDate("29/06/2019", "%d/%m/%Y");
// -> 2019-06-29 00:00:00

// ISO 字符串 - 自动解析，格式被忽略
var date2 = gantt.date.parseDate("2026-01-06T10:30:00Z");
// -> 2026-01-06 10:30:00 UTC

// 使用自定义解析函数
var date3 = gantt.date.parseDate("Jan 6, 2026", function(str) {
    return new Date(str);
});
~~~

---

#### str_to_date(format, utc)
返回一个将字符串转换为 Date 对象的函数

**Parameters**:
- `format` - (string) - 日期格式（见 guides/date-format.md）
- `utc` - (boolean, optional) - 是否转换为 UTC

**Returns**: Function - 解析函数

**Example**:
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019-06-29 00:00:00
~~~

---

#### time_part(date)
返回自午夜以来的秒数

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: number - 自午夜以来的秒数

**Example**:
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### to_fixed(num)
为小于 10 的数字添加前导零

**Parameters**:
- `num` - (number) - 要格式化的数字

**Returns**: string - 格式化后的字符串

**Example**:
~~~js
var num1 = gantt.date.to_fixed(2); // ->"02"
var num2 = gantt.date.to_fixed(10); // ->10
~~~

---

#### minute_start(date)
将秒重置为 00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 格式化后的日期

**Example**:
~~~js
// 2019-06-29 14:30:10 -> 2019-06-29 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### hour_start(date)
将分和秒重置为 00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 格式化后的日期

**Example**:
~~~js
// 2019-06-29 14:30:10 -> 2019-06-29 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### week_start(date)
返回该周的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 本周的第一天

**Example**:
~~~js
// 2019-06-29 14:30 -> 2019-06-24 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### quarter_start(date)
返回该季度的第一月，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 该季度的第一天

**Example**:
~~~js
// 2019-06-29 14:30:10 -> 2019-04-01 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### year_start(date)
返回当年的第一天，时间重置为 00:00:00

**Parameters**:
- `date` - (Date) - 日期对象

**Returns**: Date - 当年的第一天

**Example**:
~~~js
// 2019-06-29 14:30 -> 2019-01-01 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~