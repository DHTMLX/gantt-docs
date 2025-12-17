---
sidebar_label: time_picker
title: time_picker template
description: "definiert das Format, das für den Drop-down-Zeitselektor im Lightbox verwendet wird"
---

# time_picker

### Description

@short: Definiert das Format, das für den Drop-down-Zeitselektor im Lightbox verwendet wird

@signature: time_picker: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - html Inhalt, der im Gantt angezeigt wird

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
- ["Vorlagen des Lightbox"](guides/lightbox-templates.md)
