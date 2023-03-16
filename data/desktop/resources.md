Resources Control
===================

{{pronote This functionality is available in the PRO Edition only.}}

A complex control used to [assign multiple resources and their quantity to a task](desktop/resource_management.md#assigningresources).

![Resources control server options](desktop/resources_control.png)

~~~js
gantt.config.lightbox.sections = [
 {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
 {name:"owner",height:60, type:"resources", default_value:8},   /*!*/
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
gantt.config.lightbox.sections = [
  { name:"description",height:38,map_to:"text",type:"textarea",focus:true },
  { name:"time",type:"duration",map_to:"auto" },
  { name:"rooms",type:"resources" }	   /*!*/
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
- **default_value** - (*any*) the default value of the section's control. Applied if the value of the resource is undefined. Each option from the **options** array can have its own default value specified.

{{note By default the resource control is mapped to the property specified in the api/gantt_resource_property_config.md config, so the **map_to** option can be omitted.}}
{{note By default the resource control is automatically populated from the [resource datastore](desktop/resource_management.md#workingwithresourceviewpanel) via the `gantt.serverList("resourceOptions")` [collection](api/gantt_serverlist.md). You only need to specify the options list manually if you want to change the default behavior.}}

Populating control with data
-------------------------------


Starting from v8.0, the resource control gets options from the [resource Datastore](desktop/resource_management.md#workingwithresourceviewpanel) by default.

If you use the default resource Datastore created by Gantt, the [resource control](desktop/resources.md) initialized without the **options** parameter, will be connected to the **gantt.serverList("resourceOptions")** collection. This collection will be populated with the resources from the resource datastore. You can access options by code:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Note, the options array will be empty before the resources are loaded into the datastore.

You can also update this collection using the custom list of options:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Note, that if you load resources into the gantt after that, the gantt will update this collection and overwrite your changes.

If you want to control which resources go to the lightbox, you can redefine the **gantt.config.resources.lightbox_resources** config:

~~~js
gantt.config.resources = {
    lightbox_resources: function selectResourceControlOptions(resources){
      	const lightboxOptions = [];
      	resources.forEach(function(res) {
         	if (!gantt.$resourcesStore.hasChild(res.id)) {
            	const copy = gantt.copy(res);
            	copy.key = res.id;
            	copy.label = res.text;
            	lightboxOptions.push(copy);
         	}
      	});
      	return lightboxOptions;
   	}
};
~~~

If you create the resource datastore manually, you need to populate the resource control with the options yourself.

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
 	options: gantt.serverList("resourceOptions")},
 {name: "time", type: "duration", map_to: "auto"}
];

gantt.init("gantt_here");
gantt.load("/data");
~~~


The contents of `gantt.serverList("resourceOptions")` can be defined when the options become available using the api/gantt_updatecollection.md method:

~~~js
gantt.updateCollection("resourceOptions", [
	{ key: 1, label: "room 1", unit: "hours" },
	{ key: 2, label: "room 2", unit: "hours" },
	{ key: 3, label: "room 3", unit: "hours" }
])
~~~


{{sample 11_resources/07_assign_multiple_resources.html}}

@edition:pro