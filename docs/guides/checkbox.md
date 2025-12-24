---
title: "Checkbox Control"
sidebar_label: "Checkbox Control"
---

# Checkbox Control


A two-state checkbox. The control is used for switching an option or several values on/off.

For example, it is helpful for:

- [assigning resources to tasks](guides/resource-management.md) 

![Checkbox control](/img/checkbox_control.png)


[Checkbox control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_checkbox.html)


- switching [between the split and tree modes for split tasks](guides/split-tasks.md)

![Split task checkbox](/img/split_task_checkbox.png)


~~~js
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[    /*!*/
        {key:"split", label:"Split Task"}                            /*!*/                        
    ]},                                                                /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Initialization


To add the **checkbox** control to the lightbox, follow these steps:

1) Add a section to the lightbox configuration:

~~~js
var opts = [
    {key:"split", label:"Split Task"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:opts},            /*!*/
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

2) Set a label for the section:

~~~js
gantt.locale.labels.section_split = "Display";
~~~
  

[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## Properties


The following properties are mostly important and commonly set for the **checkbox** control (see the full list [here](api/config/lightbox.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the [type of the section control](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) an array of objects. Defines select options of the control (*used for the **select**, **checkbox**  and **radio** controls*). Each object in the array specifies a single option and takes
the following properties:
    - **key** - (*string*) the option id. This attribute is compared with the task data property to assign options to tasks
    - **label** - (*string*) the option label
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control. Applied only if the input value is underfined
  


## Populating control with data


Generally, to set values for the **checkbox** control, use the [options](api/config/lightbox.md) parameter:

~~~js
gantt.config.lightbox.sections = [
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]}                                                                
];
~~~

Items in the [options](api/config/lightbox.md) parameter have 2 mandatory properties:

- **key** - the option id
- **label** - the option label

