--- 
sidebar_label: time_picker
title: time_picker template
description: "Gibt das Format des Drop-down-Zeit-Auswahlfelds im Lightbox an"
---

# time_picker

### Description

@short: Gibt das Format des Drop-down-Zeit-Auswahlfelds im Lightbox an

@signature: time_picker: (date: Date) =\> string

### Parameters

- `date` - (erforderlich) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

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
- [Vorlagen der Lightbox](guides/lightbox-templates.md)