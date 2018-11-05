Resources Control
===================

A complex control used to [assign multiple resources and their quantity to a task](desktop/resource_management.md#assigningresources).

![Resources control server options](desktop/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", options:gantt.serverList("people"),   /*!*/
 	map_to:"owner_id", default_value:8},                                 /*!*/
 {name: "time", type: "duration", map_to: "auto"}
];
~~~

{{sample 	11_resources/07_assign_multiple_resources.html}}

or

![Resources control options](desktop/resources_control2.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:[  /*!*/
  	  { key: 1, label: "room 1", unit: "hours" },    /*!*/
	  { key: 2, label: "room 2", unit: "hours" },   /*!*/
	  { key: 3, label: "room 3", unit: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_rooms = "Rooms";
~~~

{{sample  05_lightbox/13_resources.html}}

{{note You can also create [a custom control to assign multiple resources to a task](desktop/custom_editor.md#customthirdpartyeditor).}}

Initialization
------------

To add the **resources** control to the lightbox, follow the steps below:

1\. Add a section to the lightbox configuration:

~~~js
var roomsMap =  [
	{ key: 1, label: "room 1", unit: "hours" },
	{ key: 2, label: "room 2", unit: "hours" },
	{ key: 3, label: "room 3", unit: "hours" }
];

gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms", options:roomsMap}	   /*!*/
];
~~~

2\. Set a label for the section:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~

{{sample 05_lightbox/13_resources.html}}


Properties
-------------

The following properties are mostly important and commonly set for the **resources** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **options** - (*array*) an array of objects. Defines select options of the control (*used for the **select**, **checkbox**,**radio** and **resources**  controls*). 
Each object in the array specifies a single option and includes the following properties:
	- **key** - (*string*) the option id. This attribute is compared with the task data property to assign options to tasks
	- **label** - (*string*) the option label
    - **unit** - (*number*) the unit of measurement of the resource
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control. Applied if the value of the resource is underfined. Each option from the **options** array can have its own default value specified.


Populating control with data
-------------------------------

Generally, to set values for the **resources** control, use the [options](api/gantt_lightbox_config.md) parameter:

~~~js
gantt.config.lightbox.sections = [
  { name:"rooms",type:"resources",map_to:"rooms",
  	options:[
  	  { key: 1, label: "room 1", unit: "hours" },   
	  { key: 2, label: "room 2", unit: "hours" },   
	  { key: 3, label: "room 3", unit: "hours" }  
    ]  
  }	   
];
~~~

Items in the [options](api/gantt_lightbox_config.md) parameter have 3 mandatory properties:

- **key** - the option id
- **label** - the option label
- **unit** - the unit of measurement of the resource

Populating control with data from the server
---------------------------------------------

To populate the control from the server, set the [options](api/gantt_lightbox_config.md) option to the value returned by the api/gantt_serverlist.md method:

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name: "resources", type: "resources", map_to: "owner_id", default_value:8,
 	options: gantt.serverList("people")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~

{{sample 11_resources/07_assign_multiple_resources.html}}

@edition:pro