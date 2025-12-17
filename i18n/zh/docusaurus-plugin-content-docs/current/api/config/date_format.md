---
sidebar_label: date_format
title: date_format config
description: "指定用于解析数据集中日期以及向服务器发送日期时所使用的日期格式"
---

# date_format

### Description

@short: 指定用于解析数据集中日期以及向服务器发送日期时所使用的日期格式

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

此配置选项用于创建 [parse_date](api/template/parse_date.md) 和 [format_date](api/template/format_date.md) 模板函数。 
要使用自定义格式，你可以调整此配置值，或者直接重写 **parse_date** 和 **format_date** 模板。

## 加载 ISO 格式的日期

Gantt 支持 ISO 日期格式。要启用此功能，需要重写负责解析和序列化日期的函数:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## 动态更改日期格式

要动态更新日期格式，请按如下方式修改 [parse_date](api/template/parse_date.md) 模板:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [日期格式规范](guides/date-format.md)

