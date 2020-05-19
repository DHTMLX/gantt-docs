Resource Management
======================

{{pronote  This functionality is available in the Gantt PRO edition only. }}

Gantt provides predefined resource views for highlighting resource load, methods for breaking project down by a resource for load balancing, 
task and resource-specific work-time calendars.

<img src="desktop/resource_panel.png">

{{note Although Gantt itself does not calculate the resource load, and does not have any methods that can be used out of the box,  Gantt provides you with public API for implementing any custom behavior.}}

Assigning resources 
-------------------

###Connecting resources to tasks 

The resource relation is defined by the api/gantt_resource_property_config.md configuration option:

~~~js
gantt.config.resource_property = "user_id";
// task.user_id <-> resource.id
~~~

Resources can be connected to tasks via the properties of the task object in one of the following ways:

- assigning one resource to one task

~~~js
{
	id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
	user_id: 5 // 5 is the id of the resource 
}
~~~

- assigning multiple resources to one task

~~~js
{
	id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6, 
	users: [2, 3] // 2 and 3 are the ids of resources
}
~~~

You can use this format with the [custom multiselect control](desktop/custom_editor.md#customthirdpartyeditor). 

- assigning multiple resources and specifiying their quantity

~~~js
{
	id: 1, text: "Task #1", start_date: "02-04-2018", duration: 8, progress: 0.6,
	users: [{resource_id:2, value:8}, {resource_id:3, value:4}]  
}
~~~

The resources are assigned to the Task1 as follows: the resource with id=2 - in the quantity of 8 units, while the resource with the id=3 - in the quantity of 4 units.
This format is supported by the desktop/resources.md of the lightbox.

When sending data to the server, DataProcessor serializes the values of the described properies into JSON. To process such records on the server with ease, make use of the ["REST_JSON"](desktop/server_side.md#restjson)
dataprocessor mode.


###Getting tasks a resource is assigned to 

There is a shorthand for getting all tasks assigned to a resource - api/gantt_getresourceassignments.md.

~~~js
gantt.getResourceAssignments("6"); 
~~~

The method takes as a parameter the id of the resource and returns an array of objects with tasks assigned to the resource:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5},
    {task_id: 18, resource_id: "6", value: 2},
    {task_id: 19, resource_id: "6", value: 3},
    {task_id: 21, resource_id: "6", value: 5}
]
~~~

Each object contains the following properties:

- *task_id* - the id of the task
- *resource_id* - the id of the resource
- *value* - the quantity of the resource assigned to a task


###Setting connection via lightbox


Resources can be assigned to any property of the task object using the built-in lightbox.

~~~js
gantt.serverList("people", [
	{key: 1, label: "John"},
	{key: 2, label: "Mike"},
	{key: 3, label: "Anna"},
	{key: 4, label: "Bill"},
	{key: 7, label: "Floe"}
]);

gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];
~~~


###Loading collections

Collections specified as server lists can be loaded and updated dynamically, after gantt is initialized:

~~~js
// init lightbox with an empty collection 
gantt.locale.labels.section_owner = "Owner";

gantt.config.lightbox.sections = [
  {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
  {name:"owner", map_to:"owner_id", type:"select", options:gantt.serverList("people")},
  {name:"time", type:"duration", map_to: "auto"}
];

// once options are loaded 
gantt.updateCollection("people", [
	{key: 1, label: "John"},
	{key: 2, label: "Mike"},
	{key: 3, label: "Anna"},
	{key: 4, label: "Bill"},
	{key: 7, label: "Floe"}
]);
~~~


<img src="desktop/resource_management.png">


{{sample  11_resources/01_assigning_resources.html}}

If you define resources via the *serverList* collection, they can be [loaded together with the rest of the data](desktop/supported_data_formats.md#jsonwithcollections), otherwise you'll need to load them manually.


Showing task resource
----------------------

The resource name can be displayed as a part of task description or a label of one of the grid cells.
Gantt doesn't provide a ready method for getting an item specified in the server list by its id, so you'll need to implement a small helper for this:

~~~js
function byId(list, id) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].key == id)
			return list[i].label || "";
	}
	return "";
}
~~~

After that you can use the resource name in templates:

~~~js
gantt.config.columns = [
	{name: "owner", width: 80, align: "center", template: function (item) {
		return byId(gantt.serverList('people'), item.owner_id)}},
	{name: "text", label: "Task name", tree: true, width: '*'},
	{name: "add", width: 40}
];

gantt.templates.rightside_text = function(start, end, task){
	return byId(gantt.serverList('people'), task.owner_id);
};
~~~


{{sample 11_resources/01_assigning_resources.html}}

Custom styling of resources
------------------------

For coloring you'll usually need the following templates:

- [gantt.templates.grid_row_class](api/gantt_grid_row_class_template.md) - the CSS of a row in the left hand grid
- [gantt.templates.task_row_class](api/gantt_task_row_class_template.md) - the background row in the timeline (won't be called if api/gantt_smart_rendering_config.md is enabled)
- [gantt.templates.task_class](api/gantt_task_class_template.md) - the CSS class of a task bar element


Depending on your context, you can 

- either have [predefined classes for each resource](desktop/colouring_tasks.md#redefiningthetaskstemplate)
- or load styling, e.g. background and text color settings together with the resources. In that case you'll need to [generate a CSS dynamically on the page](desktop/colouring_tasks.md#loadingcolorswiththedata)

{{sample  11_resources/01_assigning_resources.html}}


Resource calendars
------------------

Gantt supports the custom work-time calendars feature. Work-time calendars can be associated with specific resources.

<img src="desktop/resource_calendars.png">

They are mapped to tasks via the property value in one-to-one relation:

~~~js
// a resource value will be taken from the `task.resource_id` property
gantt.config.resource_property = "resource_id";

gantt.config.resource_calendars = {
    "resource1" : "calendarId1",
    "resource2" : "calendarId2",
    "resource3" : "calendarId3"
};
~~~

You can use any property to assign calendars to resources. If the resource property is changed dynamically, the gantt will automatically recalculate time of tasks using a new calendar.

{{sample 11_resources/02_resource_calendars.html}}


If multiple resources can be assigned to a single task, the gantt can [automatically generate a common calendar](api/gantt_dynamic_resource_calendars_config.md) for all assigned resources.

You can [get more information in the related article](desktop/working_time.md#assigningcalendartoresource).


Balancing resource load
------------------------

You can use the [grouping extension](desktop/extensions_list.md#grouping) to break down the whole project by the **resource** property. 

<img src="desktop/resource_break_down.png">

This feature can be used for balancing resource load in the calendar.

{{sample  11_resources/03_break_down_by_resource.html}}

Read more about task grouping in [the related article](desktop/grouping.md).  

###Grouping tasks by multiple resources 

In case you assign several resources to a task, tasks will be grouped by assigned resources. It means that a task assigned to two persons won't be duplicated for each of them. Instead it will be rendered once with 
both persons assigned to it. Note that grouped tasks will be sorted by the start date.

![Group resources](desktop/grouping_resources.png)

{{sample 11_resources/08_resource_usage_groups.html}}

- If tasks in the loaded data set have several resources assigned to them, Gantt will create groups for them automatically. 
- For tasks without assigned resources Gantt will create the default group Not assigned. In case there is such a group in the data set that is passed into the **groupBy()** method, 
it should have the *default:true* config specified to prevent automatic creation of a such a group.

{{note Please note that dragging of tasks grouped by multiple resources is impossible.}}

Resource view panel
------------------------

dhtmlxGantt has two types of predefined layout view for displaying resource load of gantt: resource load diagram and resource histogram.

###Resource load diagram

It includes corresponding views for the grid and timeline: "resourceGrid" and "resourceTimeline".

<img src="desktop/resource_panel.png">

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows: [
	  {
		cols: [
		  {view: "grid", group:"grids", scrollY: "scrollVer"},
		  {resizer: true, width: 1},
		  {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
		  {view: "scrollbar", id: "scrollVer", group:"vertical"}
		],
		gravity:2
	  },
	  { resizer: true, width: 1},
	  {
		config: resourceConfig,
		cols: [
		  {view: "resourceGrid", group:"grids", width: 435, scrollY:"resourceVScroll"},
		  {resizer: true, width: 1},
		  {view: "resourceTimeline", scrollX: "scrollHor", scrollY:"resourceVScroll"},
		  {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
		],
		gravity:1
	   },
	   {view: "scrollbar", id: "scrollHor"}
	]
};
~~~

{{sample  11_resources/04_resource_usage_diagram.html}}


Once initialized, *resourceGrid* will work in the same way as the default grid view, but readonly. *resourceTimeline* will inherit the scale configuration from the default timeline and will have two layers:

- background rows, which inherit api/gantt_task_row_class_template.md and api/gantt_timeline_cell_class_template.md. The templates of *resourceTimeline* can be redefined at the layout level.
- resource layer - a layer specific for *resourceTimeline*. It will display blocks in cells where the resource has tasks assigned. The block style and content can be templated with 
the api/gantt_resource_cell_class_template.md and api/gantt_resource_cell_value_template.md templates:

~~~js
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks){
	var html = "<div>" +  tasks.length * 8 + "h</div>";
		return html;
};
~~~


{{sample 11_resources/05_resource_usage_templates.html}}


###Resource histogram

This type of the layout view for displaying resource load of gantt includes the "resourceGrid" and "resourceHistogram" views for the grid and timeline correspondingly.

![Resource histogram](desktop/resource_histogram.png)

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows: [
		{
			gravity: 2,
			cols: [
				{view: "grid", group:"grids", scrollY: "scrollVer"},
				{resizer: true, width: 1},
				{view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
				{view: "scrollbar", id: "scrollVer", group:"vertical"}
			]
		},
		{ resizer: true, width: 1, next: "resources"},
		{
			gravity:1,
			id: "resources",
			config: resourceConfig,
			templates: resourceTemplates,
			cols: [
				{ view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" },
				{ resizer: true, width: 1},
				{ view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
                	scrollY: "resourceVScroll"},
				{ view: "scrollbar", id: "resourceVScroll", group:"vertical"}
			]
		},
		{view: "scrollbar", id: "scrollHor"}
	]
};
~~~

{{sample  11_resources/09_resource_histogram.html}}

The same as in the resource load diagram, *resourceGrid* will work in the same way as the default grid view, but readonly. *resourceHistogram* has the following additional templates:

- *histogram_cell_class* - the CSS class which is applied to a cell of the resource panel

~~~js
gantt.templates.histogram_cell_class=function(start_date,end_date,resource,tasks){
	return "";
};
~~~

- *histogram_cell_label* - the label inside a cell

~~~js
gantt.templates.histogram_cell_label=function(start_date,end_date,resource,tasks){
 	return tasks.length * 8;
};
~~~

- *histogram_cell_allocated* - the height of the filled area in the histogram. Its value can be set from 0 to *maxCapacity* *.

~~~js
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks){
 	return tasks.length * 8;
};
~~~

- *histogram_cell_capacity* - the height of the line that defines the available capacity of the resource. Its value can be set from -1 to *maxCapacity* *. Values less than 0 won't render the line.

~~~js
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks){
 	return 24;
};
~~~

**What maxCapacity is**

If each row of the histogram is considered as a bar chart, maxCapacity is the height of the Y-scale of this chart. In the image below maxCapacity = 24:


![maxCapacity](desktop/maxcapacity.png)

Thus, if the templates *histogram_cell_allocated* or *histogram_cell_capacity* are set to value 24, it implies the highest point of the row.

**maxCapacity** can be defined either at the histogram level:

~~~js
{ view: "resourceHistogram", capacity:24, scrollX: "scrollHor", 
	scrollY: "resourceVScroll"}
~~~

or individually for each resource:

~~~js
resourcesStore.parse([
    {id: 1, text: "John", capacity:8},
    {id: 2, text: "Mike", capacity:4},
    {id: 3, text: "Anna", capacity:8},
    {id: 4, text: "Bill", capacity:8},
    {id: 5, text: "Floe", capacity:8}
]);
~~~

{{note Capacity defined at the resource level overrides the global capacity of histogram for a given resource.}}

###Working with the resource view panel

By default both views (either "resourceGrid" and "resourceTimeline" or "resourceGrid" and "resourceHistogram") will be bound to the data store named as specified in the 
[gantt.config.resource_store](api/gantt_resource_store_config.md) configuration option.

This data store has to be initialized manually with the help of the api/gantt_createdatastore.md method:

~~~js
var resourcesStore = gantt.createDatastore({
  name: gantt.config.resource_store,
  // use treeDatastore if you have hierarchical resources (e.g. workers/departments), 
  // skip the "type" if you have a flat structure
  type: "treeDatastore", 
  initItem: function (item) {
	item.parent = item.parent || gantt.config.root_id;
	item[gantt.config.resource_property] = item.parent;
	item.open = true;
	return item;
  }
});
~~~

In order to populate the data store, use the **datastore.parse** method:

~~~js
resourcesStore.parse([
	{id: 1, text: "QA", parent:null},
  	{id: 2, text: "Development", parent:null},
    {id: 3, text: "Sales", parent:null},
    {id: 4, text: "Other", parent:null},
    {id: 5, text: "Unassigned", parent:4},
    {id: 6, text: "John", parent:1},
    {id: 7, text: "Mike", parent:2},
    {id: 8, text: "Anna", parent:2},
    {id: 9, text: "Bill", parent:3},
    {id: 10, text: "Floe", parent:3}
]);
~~~


If you want to use resources in the lightbox, it might be a good idea to do it via the api/gantt_serverlist.md method from the onParse event of the data store:

~~~js
resourcesStore.attachEvent("onParse", function(){
  var people = [];
  resourcesStore.eachItem(function(res){
	if(!resourcesStore.hasChild(res.id)){
		var copy = gantt.copy(res);
		copy.key = res.id;
		copy.label = res.text;
		people.push(copy);
	}
  });
  gantt.updateCollection("people", people);
});
~~~


###Expanding resources panel

It is possible to expand the resources panel to show all the tasks assigned to a particular resource by enabling the **fetchTasks** property during initialization of the datastore via the
api/gantt_createdatastore.md method:

![Expanded resource panel](desktop/expanded_resource_panel.png)

~~~js
gantt.$resourcesStore = gantt.createDatastore({
 	name: gantt.config.resource_store,
    type: "treeDatastore",
 	fetchTasks: true, /*!*/
 	initItem: function (item) {
 		item.parent = item.parent || gantt.config.root_id;
 		item[gantt.config.resource_property] = item.parent;
 		if(!item.parent){
 			item.open = true;
 		}else{
 			item.open = false;
 		}
 		return item;
 	}
});
~~~

{{sample 11_resources/11_resource_histogram_display_tasks.html}}

With the **fetchTasks** property set to *true*, Gantt renders all tasks assigned to a certain resource in the resource view panel. This functionality works both for the resource diagram and resource histogram types
of layout.

There is a shorthand for getting all tasks assigned to a resource - api/gantt_getresourceassignments.md.

~~~js
gantt.getResourceAssignments("6");
~~~

@edition:pro


