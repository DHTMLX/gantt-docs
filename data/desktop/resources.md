Resources Control
===================

A multiselect control. The control is used to assign several resources to a task.

![Resources control](desktop/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms",saveEmpty:false,options:[  /*!*/
  	  { key: 1, label: "room 1", sku: "hours" },    /*!*/
	  { key: 2, label: "room 2", sku: "hours" },   /*!*/
	  { key: 3, label: "room 3", sku: "hours" }   /*!*/
    ]  /*!*/
  }	   /*!*/
];

gantt.locale.labels.section_resources = "Resources";
gantt.locale.labels.section_rooms = "Rooms";
~~~

{{sample 05_lightbox/13_resources.html}}

Initialization
------------

To add the **resources** control to the lightbox, follow the steps below:

1\. Add a section to the lightbox configuration:

~~~js
var roomsMap =  [
	{ key: 1, label: "room 1", sku: "hours" },
	{ key: 2, label: "room 2", sku: "hours" },
	{ key: 3, label: "room 3", sku: "hours" }
];

gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources",map_to:"rooms",saveEmpty:false,options:roomsMap}	   /*!*/
];
~~~

2\. Set a label for the section:

~~~js
gantt.locale.labels.section_resources = "Rooms";
~~~

Properties
-------------

The following properties are mostly important and commonly set for the **resources** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **options** - (*array*) an array of objects. Defines select options of the control (*used for the **select**, **checkbox**  and **radio**  controls*). Each object in the array specifies a single option and takes
the following properties:
	- **key** - (*string*) the option id. This attribute is compared with the task data property to assign options to tasks
	- **label** - (*string*) the option label
    - **sku** - the unit of measurement for the option
- **saveEmpty?** - (*boolean*)


Populating control with data
-------------------------------

Generally, to set values for the **resources** control, use the [options](api/gantt_lightbox_config.md) parameter:

~~~js
gantt.config.lightbox.sections = [
  { name:"rooms",type:"resources",map_to:"rooms",saveEmpty:false,
  	options:[
  	  { key: 1, label: "room 1", sku: "hours" },   
	  { key: 2, label: "room 2", sku: "hours" },   
	  { key: 3, label: "room 3", sku: "hours" }  
    ]  
  }	   
];
~~~

Items in the [options](api/gantt_lightbox_config.md) parameter have 3 mandatory properties:

- **key** - the option id
- **label** - the option label
- **sku** - the unit of measurement for the option

Populating control with data from the server
---------------------------------------------

To populate the control from the server, set the [options](api/gantt_lightbox_config.md) option to the value returned by the api/gantt_serverlist.md method:

~~~js
gantt.config.lightbox.sections = [
  {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
  {name: "owner", height: 60, type: "multiselect", map_to:"owner_id", 
     options: gantt.serverList("people")} /*!*/
  {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~

{{sample 11_resources/06_resource_multiselect.html}}



@todo: it is a draft page, needs update