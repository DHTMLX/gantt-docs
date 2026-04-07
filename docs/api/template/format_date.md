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

Since v9.1.3, when ISO 8601 dates are detected on input, dates are serialized back as ISO strings automatically - unless you explicitly override this template. If you define a custom `format_date` function, it takes priority and is used for all dates, including ISO.

:::tip Gantt v9.1.2 and earlier
In versions before v9.1.3, ISO dates were not detected automatically. If you are using an older version, you need to override the templates to handle ISO strings:

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

