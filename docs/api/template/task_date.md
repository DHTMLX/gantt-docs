---
sidebar_label: task_date
title: task_date template
description: "specifies the date format of the label in the 'Time period' section of the lightbox"
---

# task_date

### Description

@short: Specifies the date format of the label in the 'Time period' section of the lightbox

@signature: task_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.templates.task_date= function(date){
    return gantt.date.date_to_str(gantt.config.task_date)(date);
};
~~~

### Related API
- [task_date](api/config/task_date.md)

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)

