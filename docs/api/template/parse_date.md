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

This function can be called from **gantt.load()** or **gantt.parse()** call to parse date properties of tasks, if they are provided in the string format. 

This function can be redefined if you use a custom date format that the default method can't parse. Check [Date Format Specification](guides/date-format.md).

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## Loading dates in ISO format

Since v9.1.3, Gantt automatically detects and parses ISO 8601 date strings. A manual `parse_date` override is not needed for ISO dates. However, if you do override this template, your function takes priority - ISO auto-detection is skipped and your function handles all date strings.

:::tip Gantt v9.1.2 and earlier
In versions before v9.1.3, ISO dates were not detected automatically. If you are using an older version, you need to override this template to handle ISO strings:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

In v9.1.3+, these overrides are unnecessary for ISO dates.
:::

For more details, see [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Data Loading](guides/loading.md)
- [Date Format Specification](guides/date-format.md)
- [Server-Side Integration](guides/server-side.md)

