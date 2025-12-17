---
sidebar_label: time_picker
title: time_picker template
description: "specifies the format of the drop-down time selector in the lightbox"
---

# time_picker

### Description

@short: Specifies the format of the drop-down time selector in the lightbox

@signature: time_picker: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text which will be rendered in the gantt

### Example

~~~jsx
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}
];

gantt.templates.time_picker = function(date){
    return gantt.date.date_to_str(gantt.config.time_picker)(date);
};
~~~

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)
