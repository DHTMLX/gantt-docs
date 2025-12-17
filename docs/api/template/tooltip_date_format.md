---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "specifies the format of start and end dates displayed in the tooltip"
---

# tooltip_date_format

### Description

@short: Specifies the format of start and end dates displayed in the tooltip

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
This template is defined in the **tooltip** extension, so you need to activate the [tooltip](guides/extensions-list.md#tooltip) plugin. Read the details in the [Tooltips for Gantt Elements](guides/tooltips.md) article. 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Templates of Tooltips](guides/tooltip-templates.md)
- [Tooltips for Gantt Elements](guides/tooltips.md)

