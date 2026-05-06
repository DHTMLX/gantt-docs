---
sidebar_label: time_picker
title: time_picker шаблон
description: "задает формат выпадающего списка времени во всплывающем окне"
---

# time_picker

### Description

@short: Задает формат выпадающего списка времени во всплывающем окне

@signature: time_picker: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - HTML-текст, который будет отрисован в gantt

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