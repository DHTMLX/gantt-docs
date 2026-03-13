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

Since v9.1.3, when ISO 8601 dates are detected on input, dates are serialized back as ISO strings automatically - unless you explicitly override this template. If you define a custom `format_date` function, it takes priority and is used for all dates, including ISO.

The serialization order (in `_copyObject`) is:

1. **`xml_format` template** - if defined, used for all dates (legacy, highest priority)
2. **ISO auto-serialization** - if ISO dates were detected on input and `format_date` has not been overridden by the user, dates are serialized as ISO strings. Date-only inputs (e.g. `"2026-01-06"`) are serialized back as `"YYYY-MM-DD"`; full datetime inputs round-trip as full ISO datetime
3. **`format_date` template** - used when ISO auto-serialization does not apply, or when the user has explicitly overridden this template

## Loading dates in ISO format

Since v9.1.3, Gantt automatically detects and serializes ISO 8601 date strings. A manual `format_date` override is not needed for ISO dates. However, if you do override this template, your function takes priority over ISO auto-serialization.

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

In v9.1.3+, these overrides are unnecessary for ISO dates. See [gantt.date.parseDate()](api/other/date.md#parsedatedate-format) for the full parsing pipeline.
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

