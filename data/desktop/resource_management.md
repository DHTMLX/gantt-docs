Resource Management
======================


{{pronote
This functionality is available in the Gantt PRO edition only. 
}}

As of dhtmlxGantt v5.1, resources can be connected to tasks via the properties of the task object by the "many-to-one" relation **task.resourceId <-> resource.id**.
Gantt provides predefined resource views for highlighting resource load, methods for breaking project down by a resource for load balancing, 
task and resource-specific work-time calendars, as well as the public API for implementing any custom behavior.


<img src="desktop/resource_panel.png">


Assigning resources
-------------------

A resource can be assigned to any property of the task object using the built-in lightbox:

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
- or you load styling, e.g. background and text color settings together with the resources. In that case you'll need to [generate a CSS dynamically on the page](desktop/colouring_tasks.md#loadingcolorswiththedata)

{{sample  11_resources/01_assigning_resources.html}}


Resource calendars
------------------

Gantt supports the custom work-time calendars feature. Work-time calendars can be associated with specific resources.

<img src="desktop/resource_calendars.png">

They are mapped to tasks via the property value in one-to-one relation:

~~~js
gantt.config.resource_calendars = {
    "resourceProperty":{ // use the task.resourceProperty to link calendars
        "resource1" : "calendarId1",
        "resource2" : "calendarId2",
        "resource3" : "calendarId3"
    }
};
~~~

You can use any property to assign calendars to resources. If the resource property is changed dynamically, you'll need to recalculate task timing using a new calendar:

~~~js
function updateTaskTiming(task) {
  task.start_date = gantt.getClosestWorkTime({
     dir: "future",
     date: task.start_date,
     unit: gantt.config.duration_unit,
     task: task
  });
  task.end_date = gantt.calculateEndDate(task);
}
 
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  updateTaskTiming(task);
  return true;
});
~~~

{{sample 11_resources/02_resource_calendars.html}}

You can [get more information in the related article](desktop/working_time.md#assigningcalendartoresource).


Balancing resource load
------------------------

You can use the [grouping extension](desktop/extensions_list.md#grouping) to break down the whole project by the **resource** property. 

<img src="desktop/resource_break_down.png">

This feature can be used for balancing resource load in the calendar.

{{sample  11_resources/03_break_down_by_resource.html}}

Read more about task grouping in [the related article](desktop/grouping.html).  


Resource load diagram
------------------------

Starting from v5.1 dhtmlxGantt has a predefined layout view for displaying resource load of gantt. It includes corresponding views for the grid and timeline: "resourceGrid" and "resourceTimeline".

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

By default both views will be bound to the data store named as specified in the [gantt.config.resource_store](api/gantt_resource_store_config.md) configuration option.

This data store has to be initialized manually:

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

In order to populate the data store use the **datastore.parse** method:

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


Once initialized, the *resourceGrid* will work in the same way as the default grid view, but readonly.
The *resourceTimeline* will inherit the scale configuration from the default timeline and will have two layers:

- background rows, which inherit api/gantt_task_row_class_template.md and api/gantt_task_cell_class_template.md. The templates of *resourceTimeline* can be redefined at the layout level.
- resource layer - a layer specific for the *resourceTimeline*. It will display blocks in cells where the resource has tasks assigned. The block style and content can be templated with 
the api/gantt_resource_cell_class_template.md and api/gantt_resource_cell_value_template.md templates:

~~~js
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks){
	var html = "<div>" +  tasks.length * 8 + "h</div>";
		return html;
};
~~~

The resource relation is defined by the api/gantt_resource_property_config.md configuration option:

~~~js
gantt.config.resource_property = "userId";
// task.userId <-> resource.id
~~~

{{sample  11_resources/04_resource_usage_diagram.html}}

{{sample 11_resources/05_resource_usage_templates.html}}


@edition:pro
