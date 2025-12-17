---
sidebar_label: xml_date
title: xml_date template
description: "a string from an XML file is converted into a date object in conformity with this template"
---

# xml_date
:::warning
The template is deprecated.
:::
### Description

@short: A string from an XML file is converted into a date object in conformity with this template

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
The template is deprecated. Use [parse_date](api/template/parse_date.md) instead: 
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~


This template is automatically generated from the [xml_date](api/config/xml_date.md) config and can be redefined after the [initialization of gantt](api/method/init.md).

A custom template function can be used, if the format of server dates is not supported by the [gantt date helper](api/other/date.md).

For example, using UNIX time for **start_date**: 

snippet /data :
~~~js
{
    "data":[
    {
        "id":1,
        "start_date":1503608400,
        "duration":10,
        "text":"Task #1",
        "parent":0,
    },
    {
        "id":2,
        "start_date":1503694800,
        "duration":4,
        "text":"Task #2",
        "parent":0,
    }],

    "links":[
    ]
}
~~~

You should set the Gantt configuration as follows:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_date = function(dateString){
        return new Date(dateString * 1000);
    }
});

gantt.init("gantt_here");
gantt.load("/data");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [xml_format](api/template/xml_format.md)
- [date](api/other/date.md)

### Related Guides
- [Templates for Date Conversion](guides/conversion-templates.md)

### Change log
- deprecated since v6.2, removed since v7.0

