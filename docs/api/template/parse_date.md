---
sidebar_label: parse_date
title: parse_date template
description: "converts date string into a Date object"
---

# parse_date

### Description

@short: Converts date string into a Date object

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (required) *string* - the string which need to be parsed

### Returns
- ` date` - (Date) - date object

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Details

This function is called from **gantt.load()** or **gantt.parse()** call to parse the *start_date/end_date* properties of tasks, if they are provided in the string format. 
This function can be redefined if you use a custom format that the default method can't parse. Check [Date Format Specification](guides/date-format.md).

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

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

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Data Loading](guides/loading.md)
- [Date Format Specification](guides/date-format.md)
- [Server-Side Integration](guides/server-side.md)

