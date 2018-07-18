Radio Button
=============

A block of options that allows selecting only one of them at a time.

![Radio Button](desktop/radiobutton_control.png)

{{sample 05_lightbox/02_radio.html}}

Initializing the control
--------------------------

To add a **radio button** control to the lightbox, follow these steps:

- Add a section to the lightbox configuration:

~~~js
var opts = [
	{key: 1, label: "High"},
	{key: 2, label: "Normal"},
	{key: 3, label: "Low"}	                                    
];

gantt.config.lightbox.sections = [
	{name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
	{name: "priority", height: 22, map_to: "priority", type: "radio", options: [opts]}, /*!*/
	{name: "time", type: "duration", map_to: "auto"}
];
~~~

- Set a label for the section:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
	        
{{sample 05_lightbox/02_radio.html}}


A list of properties
---------------------------------------------

The following properties are mostly important and commonly set for the **radio button** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the [type of the section control](desktop/default_edit_form.md#lightboxcontrols)
- **options** - (*array*) an array of objects. Defines select options of the control (*used for the **select**, **checkbox** and **radio** controls*). Each object in the array specifies a single option and takes
the following properties:
	- **key** - (*string*) the option id. This attribute is compared with the task data property to assign options to tasks
	- **label** - (*string*) the option label
			


Populating the control with data
-------------------------------------------

Generally, to set values for the **radio button** control, use the [options](api/gantt_lightbox_config.md) parameter:

~~~js
gantt.config.lightbox.sections = [		
	{name: "priority", map_to: "priority", type: "radio", options: [
		{key: 1, label: "High"},
		{key: 2, label: "Normal"},
		{key: 3, label: "Low"},
	]}		
];
~~~

Items in the [options](api/gantt_lightbox_config.md) parameter have 2 mandatory properties:

- **key** - the option id
- **label** - the option label