---
sidebar_label: parse_date
title: parse_date 模板
description: "将日期字符串转换为 Date 对象"
---

# parse_date

### Description

@short: 将日期字符串转换为 Date 对象

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (必填) *字符串* - 需要解析的字符串

### Returns
- `date` - (Date) - date 对象

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

此函数可通过执行 **gantt.load()** 或 **gantt.parse()** 来解析任务的日期属性，前提是日期以字符串格式提供。

如果你使用自定义日期格式，默认方法无法解析，此函数可以被重新定义。请参阅 [日期格式规范](guides/date-format.md)。

[了解更多关于日期对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## 以 ISO 日期格式加载

自 v9.1.3 版本起，Gantt 会自动检测并解析 ISO 8601 日期字符串。ISO 日期不需要手动覆盖 `parse_date`。不过，如果你覆盖了此模板，你的函数将具有优先权——ISO 自动检测将被跳过，你的函数将处理所有日期字符串。

:::tip Gantt v9.1.2 及更早版本
在 v9.1.3 及更早版本中，ISO 日期不会被自动检测。如果你正在使用较旧的版本，则需要覆盖此模板以处理 ISO 字符串：

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

在 v9.1.3+，这些覆盖对于 ISO 日期已不再必要。
:::

有关更多细节，请参阅 [以 ISO 格式加载日期](guides/loading.md#loading-dates-in-iso-format).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [数据加载](guides/loading.md)
- [日期格式规范](guides/date-format.md)
- [服务器端集成](guides/server-side.md)