Textarea Control
============================

A multiline text field.

<img src="desktop/textarea_control.png"/>

Initialization
---------------------------------

One **textarea** control is added to the lightbox by default. To add another one, follow the steps below:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~


2) Set a label for the section:

~~~js
gantt.locale.labels.section_details = "Details";
~~~
	

Properties
---------------

The following properties are mostly important and commonly set for the **textarea** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **height** - (*number*) the section height
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control. Applied only if the input value is underfined. Won't work with *map_to:"text"*