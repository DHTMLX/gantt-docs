---
sidebar_label: parse_date
title: parse_date template
description: "将日期字符串转换为 Date 对象"
---

# parse_date

### Description

@short: 将日期字符串转换为 Date 对象

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (required) *string* - 需要解析的字符串

### Returns
- ` date` - (Date) - 日期对象

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

此函数在 **gantt.load()** 或 **gantt.parse()** 过程中被调用，用于将任务的 *start_date/end_date* 字段从字符串转换为日期对象。 
如果你使用的自定义格式是默认解析器无法处理的，可以重写此函数。更多细节请参见 [日期格式规范](guides/date-format.md)。

[了解更多关于日期对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)。

## 以 ISO 格式加载日期

Gantt 支持 ISO 日期格式。要使用该格式，只需重写日期解析和格式化函数，如下所示:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [数据加载](guides/loading.md)
- [日期格式规范](guides/date-format.md)
- [服务器端集成](guides/server-side.md)

