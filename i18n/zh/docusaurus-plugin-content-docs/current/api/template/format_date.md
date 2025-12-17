---
sidebar_label: format_date
title: format_date template
description: "将日期对象转换为日期字符串。这在向服务器发送数据时非常有用。"
---

# format_date

### Description

@short: 将日期对象转换为日期字符串。这在向服务器发送数据时非常有用。

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 日期的字符串表示形式

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

详情请参见 [日期格式规范](guides/date-format.md)。

## 以 ISO 格式加载日期

Gantt 支持 ISO 日期格式。要使用它，只需重定义负责解析和格式化日期的函数:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## 动态更改日期格式

当你想动态更新[日期格式](api/config/date_format.md)时，也应同时更新[parse_date](api/template/parse_date.md)模板，如下所示:

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

