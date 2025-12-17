---
sidebar_label: getLabel
title: getLabel method
description: "gets the label of a select control in the lightbox"
---

# getLabel

### Description

@short: Gets the label of a select control in the lightbox

@signature: getLabel: (property: string, key: string | number) =\> string

### Parameters

- `property` - (required) *string* - the name of a data property that the control is mapped to
- `key` - (required) *string | number* -     the option's id. This parameter is compared with the task's data property to <br/> assign the select's option to the task

### Returns
- ` label` - (string) - the label of a select control in the lightbox

### Example

~~~jsx
gantt.config.lightbox.sections=[
    {name:"custom", type:"select", map_to:"unit_id", options:[
        {key:1, label:"James Smith"}, 
        {key:2, label:"John Williams"}]}
];

const holder2 = gantt.getLabel("unit_id", 2);// ->"John Williams"
~~~

### Details

:::note
The method is applied only to the 'select' controls in the lightbox to get the label of a specific option.
:::
