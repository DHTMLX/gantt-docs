---
sidebar_label: format_date
title: format_date 模板
description: "将日期对象转换为日期字符串。用于将数据发送回服务器"
---

# format_date

### Description

@short: 将日期对象转换为日期字符串。用于将数据发送回服务器

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 日期的文本表示

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

请参阅 [日期格式规范](guides/date-format.md)。

## 以 ISO 日期格式加载日期

自 v9.1.3 以来，当输入中检测到 ISO 8601 日期时，日期会自动被序列化为 ISO 字符串，除非你显式覆盖此模板。如果你定义了自定义的 `format_date` 函数，它将优先并用于所有日期，包括 ISO。

:::tip Gantt v9.1.2 及更早版本
在 v9.1.3 之前的版本中，ISO 日期不会自动检测。如果你使用的是较旧的版本，则需要覆盖模板来处理 ISO 字符串：

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

在 v9.1.3+ 版本中，这些覆盖对 ISO 日期而言就不再必要。
:::

如需更多详情，请参阅 [加载 ISO 格式日期](guides/loading.md#loading-dates-in-iso-format)。

## 动态改变日期格式

如果你需要动态修改 [date format](api/config/date_format.md)，则需要按以下方式修改 [parse_date](api/template/parse_date.md) 模板：

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [数据加载](guides/loading.md)
- [日期操作](guides/date-operations.md)
- [服务器端集成](guides/server-side.md)
- [日期格式规范](guides/date-format.md)