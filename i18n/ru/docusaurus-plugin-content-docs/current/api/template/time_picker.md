---
sidebar_label: time_picker
title: time_picker template
description: "определяет формат, используемый для выпадающего селектора времени в lightbox"
---

# time_picker

### Description

@short: Определяет формат, используемый для выпадающего селектора времени в lightbox

@signature: time_picker: string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html контент, который будет отображаться в gantt

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
- [Шаблоны Lightbox](guides/lightbox-templates.md)
