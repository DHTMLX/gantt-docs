Resource Assignments Control
=========================

{{pronote This functionality is available in the PRO Edition only.}}

An extended control used to [assign multiple resources and their quantity to a task](desktop/resource_management.md#assigningresources).

![Resource Assignments control](desktop/resource_assignments_control.png)

~~~js
gantt.config.lightbox.sections = [
	{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
	{ name: "resource_selector", label: "Resources",   /*!*/
    	type: "resource_selector", map_to: "auto" },  /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

{{sample 	11_resources/07_assign_multiple_resources.html}}

or

[image2]

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to:"text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "rooms", type: "resource_selector", map_to: "rooms", options: [  /*!*/
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

## Initialization

To add the **resource_selector** control to the lightbox, follow the steps below:

1\. Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
	{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
	{ name: "resource_selector", label: "Resources",   /*!*/
    	type: "resource_selector", map_to: "auto" },  /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

{{note By default the resource control is mapped to the property specified in the api/gantt_resource_property_config.md config, so the **map_to** option can be omitted.}}

2\. Set a label for the section:

~~~js
gantt.locale.labels.section_resource_selector = "Rooms";
~~~

{{sample 05_lightbox/13_resources.html}}

## Properties

The following properties are mostly important and commonly set for the **resource_assignments** control (see the full list [here](api/gantt_lightbox_config.md)):

- **name** - (*string*) the section name 
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **config** - (*object*) the resource grid config in the lightbox to display required columns
- **label** - (*string*) the option label
- **templates** - (*object*) templates for the resource grid in the lightbox
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox
- **default_value** - (*any*) the default value of the section's control. Applied if the value of the resource is undefined. Each option from the **options** array can have its own default value specified

## Configuring resource table columns in the lightbox

The default configuration of columns of the resource table in the lightbox is given below:

~~~js
// helper editors
const selectResEditor = { 
  type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};
const numberEditor = { type: "number", map_to: "value", min: 0, max: 100 };

const dateToStr = gantt.date.date_to_str("%d-%m-%Y");
const resourceStore = gantt.getDatastore(gantt.config.resource_store);
// default columns definition
const defaultResourceLightboxConfig = {
  scale_height: 35, // height of the grid scale
  row_height: 35, // height of assignment rows
  // configures the columns of the grid
  columns: [
	{
		name: "resource", label: "Resource", align: "center", width: 80, 
	  	editor: selectResEditor, template: function (assignment) {
		  let defaultValue = "Unassigned";
		  const resource = resourceStore .getItem(assignment.resource_id);
		  return resource ? resource.text : defaultValue;
	    }
	},
	{
		name: "hours/Day", label: "Hours/Day", align: "center", width: 70,
	    editor: numberEditor, template: function (assignment) {
	      return assignment.value ? +assignment.value : ``;
	    }
	},
	{
		name: "start", label: "Start", align: "center", width: 100, 
	    template: function (assignment) { 
		  return assignment.start_date ? dateToStr(assignment.start_date) : ``;
	    }
    },
	{ 
		name: "end", label: "End", align: "center", width: 100, 
	    template: function (assignment) {
		  return assignment.end_date ? dateToStr(assignment.end_date) : ``;
	    }
  	},
	{ 
		name: "duration", label: "Duration", align: "center", width: 80, 
		template: function (assignment) {
		  if (assignment.duration) {
			return `${assignment.duration} day${assignment.duration == 1 ? '' : 's'}`;
		  } else {
			return ``;
		  }
		}
	},
	{
		name: "delete", label: "Delete", align: "center", width: 80, 
		template: function (assignment) {
			return `<div
				data-assignment-id='${assignment.id}'
				data-assignment-delete='${assignment.id}'
				class='dhx_gantt_icon dhx_gantt_icon_delete'
				>
				</div>`;
		}
	}
  ]
};
~~~

### Details

Each object in the **columns** array specifies a single column. An object can take the following attributes:

- <span class=subproperty>**name?**</span> - (*string | number*) - defines the column's id;
- <span class=subproperty>**align?**</span> - (*string*) - sets the horizontal title alignment. Possible values: *'left'*, *'center'*, or *'right'*;
- <span class=subproperty>**hide?**</span> - (*boolean*) - hides/shows a column (PRO);
- <span class=subproperty>**label?**</span> - (*string | number | any*) - specifies the title of the column;
- <span class=subproperty>**max_width?**</span> - (*number*) - sets the maximum column width;
- <span class=subproperty>**min_width?**</span> - (*number*) - sets the minimum column width;
- <span class=subproperty>**width?**</span> - (*number | string*) - defines the width of the column;
- <span class=submethod>**template? (assignment): any**</span> - sets a data template.
    - **assignment** - (*Assignment*) - the Assignment object;
- <span class=submethod>**onrender? (assignment, node): any**</span> - optional, a callback function for rendering a cell into the DOM. 
The function takes an assignment object and the DOM element of the grid cell as 
parameters and may return a component of the framework. See details <a href="desktop/specifying_columns.md#modifyingcellsafterrendering">here</a>;
    - **assignment** - (*Assignment*) - the Assignment object;
    - **_node_** - (*HTMLElement*) - the HTML element of the Grid cell;
- <span class=subproperty>**editor?**</span> - (*object*) - the attached [inline editor](desktop/inline_editing.md);
    - **_type_** - (*string*) - the type of the inline editor;
    - **_map_to_** - (*string*) - specifies which property of the assignment should be updated by the inline editor;
    - **_min?_** - (*Date | number*) - the minimal value for the date and duration types;
    - **_max?_** - (*Date | number*) - the maximal value for the date and duration types;
    - **_options?_** - (*Array &lt;any&gt;*) - an array with the options for the select types;
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - formatter for the date and predecessor types.

<br>

{{note
The template attribute is a function that takes a data item object as a parameter and returns the final data template. The function definition allows you to present almost any content.
}}

## Populating control with data

If you use the default resource Datastore created by Gantt, the **resource_selector** control 
will be connected to the **gantt.serverList("resourceOptions")** collection. 
This collection will be populated with the resources from the resource datastore. You can access options by using the following code line:

~~~js
const options = gantt.serverList("resourceOptions");
~~~

Take notice that the options array will be empty before the resources are loaded into the datastore.

You can also update this collection using the custom list of options as follows:

~~~js
gantt.updateCollection("resourceOptions", [...]);
~~~

Note that if you load resources into the gantt after that, the gantt will update this collection and overwrite your changes.

## Populating control with data from the server

To populate the control from the server, use the [serverList()](api/gantt_serverlist.md) method in the options of the resource editor:

~~~js
const resourceEditor = { 
	type: "select", map_to: "resource_id", options: gantt.serverList("resourceOptions")
};

const defaultResourceLightboxConfig = {
	...
	columns:[
		{
  			name: "resource", 
            label: "Resource", 
            align: "center",  
            editor: resourceEditor
		}
        ...
    ]
}
~~~

The contents of `gantt.serverList("resourceOptions")` can be defined when the options become available using the [updateCollection](api/gantt_updatecollection.md) method:

~~~js
gantt.updateCollection("resourceOptions", [
	// resource objects
    { id: 1, text: "QA", parent: null },
    { id: 2, text: "Development", parent: null },
    { id: 3, text: "Sales", parent: null },
    { id: 4, text: "Other", parent: null },
    { id: 5, text: "Unassigned", parent: 4 },
    { id: 6, text: "John", parent: 1 },
    { id: 7, text: "Mike", parent: 2 },
    { id: 8, text: "Anna", parent: 2 },
    { id: 9, text: "Bill", parent: 3 },
    { id: 10, text: "Floe", parent: 3 }
]);
~~~

@edition:pro
