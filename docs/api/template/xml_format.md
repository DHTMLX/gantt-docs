---
sidebar_label: xml_format
title: xml_format template
description: "a date object is converted into a string in conformity with this template. Used to send data back to the server"
---

# xml_format
:::warning
The template is deprecated.
:::
### Description

@short: A date object is converted into a string in conformity with this template. Used to send data back to the server

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
note The template is deprecated. Use [format_date](api/template/format_date.md) instead:
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

This template is automatically generated from the [xml_date](api/config/xml_date.md) config and can be redefined after the [initialization of gantt](api/method/init.md).

A custom template function can be used, if the server side expects a format that is not supported by the [gantt date helper](api/other/date.md).

For example, let's say the server side expects **start_date** as a UNIX timestamp and the request parameters should look like this:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800


You should set the Gantt configuration as follows:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_format = function(date){
        return (date.valueOf() / 1000) + "";
    }
});

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [date](api/other/date.md)
- [xml_date](api/template/xml_date.md)

### Related Guides
- [Templates for Date Conversion](guides/conversion-templates.md)
- [Server-Side Integration](guides/server-side.md)

### Change log
- deprecated since v6.2, removed since v7.0

