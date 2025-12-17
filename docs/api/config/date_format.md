---
sidebar_label: date_format
title: date_format config
description: "sets the date format that is used to parse data from a data set and to send dates back to the server"
---

# date_format

### Description

@short: Sets the date format that is used to parse data from a data set and to send dates back to the server

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

This config value is used to generate [parse_date](api/template/parse_date.md) and [format_date](api/template/format_date.md) template functions. 
If you want to use a custom format, you can either change this config, or redefine **parse_date** and **format_date** templates directly.

## Loading dates in ISO format

You can use ISO date format in Gantt. For this, you need to redefine functions that parse and serialize dates in Gantt:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## Changing the date format dynamically

If you need to change the date format dynamically, it is necessary to modify the [parse_date](api/template/parse_date.md) template in the following way:

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
- [Date Format Specification](guides/date-format.md)

