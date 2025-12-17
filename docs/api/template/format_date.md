---
sidebar_label: format_date
title: format_date template
description: "converts a date object to a date string. Used to send data back to the server"
---

# format_date

### Description

@short: Converts a date object to a date string. Used to send data back to the server

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - a text representation of the date

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Details

Check [Date Format Specification](guides/date-format.md).

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

If you need to change the [date format](api/config/date_format.md) dynamically, it is necessary to modify the [parse_date](api/template/parse_date.md) template in the following way:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related Guides
- [Data Loading](guides/loading.md)
- [Operations with Dates](guides/date-operations.md)
- [Server-Side Integration](guides/server-side.md)
- [Date Format Specification](guides/date-format.md)

