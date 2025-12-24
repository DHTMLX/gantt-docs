---
title: "Working with Lightbox Elements"
sidebar_label: "Working with Lightbox Elements"
---

# Working with Lightbox Elements


## Getting/setting the control value

To get/set the value of a lightbox control, use the [getLightboxSection](api/method/getlightboxsection.md) method as in:

~~~js
//to get the value
var value = gantt.getLightboxSection('description').getValue();

//to set the value
gantt.getLightboxSection('description').setValue('abc');
~~~


## Checking whether the lighbox is open

To check whether the lightbox is currently open or closed, use the **lightbox** property of the state object returned by the [getState](api/method/getstate.md) method.

 If the lightbox is open - the method will return the id 
of the opened task, otherwise 'null' or 'undefined'

~~~js
if (gantt.getState().lightbox){
    //the code for the opened lighbox
} else {
    //the code for the closed lighbox
}
~~~

## Mapping data properties to the lightbox sections

To map a data property to a lightbox section, use the **map_to** attribute of the section object:

~~~js
//assigns the "holders" section to a data property with the name "holder" 
gantt.config.lightbox.sections = [
    {name:"description",height:38, type:"textarea", map_to:"text", focus:true},
    {name:"holders",     height:22, type:"textarea", map_to:"holder"},      /*!*/                                                                
    {name:"time",         height:72, type:"duration", map_to:"auto"}
];
~~~


## Setting the default value for a lightbox's control

To set the default value for a lightbox's section, use the **default_value** property of the section's object.

For example, you have added a custom section to the lightbox - "Priority" - that displays the task priority. 
When the user creates a new event, the field will be just empty. To correct such behaviour and set by default, say, the low priority,
specify the lightbox as in:

~~~js
var opts = [
    { key:1, label: "High" },                                            
    { key:2, label: "Normal" },                                         
    { key:3, label: "Low" }                                            
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, type:"textarea", map_to:"text",    focus:true},
    {name:"priority",      height:22, type:"select",      map_to:"priority",  /*!*/  
    options:opts, default_value:3},      /*!*/                                                                
    {name:"time",          height:72, type:"duration", map_to:"auto"}
];
~~~

:::note
The **default_value** property sets the default value for the lightbox's section, not for a new event, i.e. a new event gets the specified value only after the user opens the lightbox and saves the event.
:::

To set the default value directly for new events, use the [onTaskCreated](api/event/ontaskcreated.md) event:

~~~js
gantt.attachEvent("onTaskCreated", function(id, task){
    task.priority = "Low";
    return true;
});
~~~

## Making a section hidden for some events 

To make a section hidden for specific events, redefine its **set_value** method as in:


~~~js
gantt.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // editor area
    node.previousSibling.style.display="style;" //section header
    gantt.resizeLightbox(); //correct size of lightbox
}
~~~

## Setting section and its label on the same line

You can place sections of lightbox on the same line as their labels via setting the [wide_form](api/config/wide_form.md) configuration option to *true*:

~~~js
gantt.config.wide_form = true; /*!*/

gantt.locale.labels.section_priority = "Priority";
gantt.locale.labels.section_status = "Status";


gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "status", height:22, map_to: "status", type: "select", options: [         
        {key:1, label: "New"},                                                       
          {key:2, label: "Open"},                                                     
          {key:3, label: "Done"}                                                      
    ]},                                                                            
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]},
    {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
~~~

**Related sample** [Aligning Lightbox](https://snippet.dhtmlx.com/hf45hvr3)

## Button in the section header 

It's possible to have a custom button in the section header. To add a button to the header of a section, make the following steps:

- Specify the **button** property in the section object:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~
- Set the label for the button:

~~~js
//'help' is the value of the 'button' property
gantt.locale.labels.button_help="Help label";
~~~

- Specify the handler of button clicks:

~~~
gantt.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // any custom logic
}
~~~
where:

- **index** - (*number*) the section index. Zero-based numbering
- **button** - (*HTMLElement*) the HTML element of a button
- **shead** - (*HTMLElement*) the HTML element of the section header
- **sbody** - (*HTMLElement*) the HTML element of the section body

You can define the image used for the button through the following CSS class:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

