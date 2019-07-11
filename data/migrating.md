Migration from Older Versions
=================================================

<style>
	table.my_table {
    	width: 100%;
    }
	table.my_table td {
		text-align: left;
		vertical-align: middle;
        width: 50%;
	}
	table.my_table td.type_info {
		text-align: center;
        background-color: #E3F6FF;
	}
	table.my_table td.version_info {
		text-align: center;
        background-color: #FFDAFF;
	}
</style>

6.1 -> 6.2
---------------

### api_date

### scales api

### gantt.templates.task_cell_class → gantt.templates.timeline_cell_class

### "xml_date" config and template, and "xml_format" templates are renamed

Below there is the scheme of replacing previously used API:

- gantt.config.xml_date →  [gantt.config.date_format](api/gantt_date_format_config.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/gantt_parse_date_template.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/gantt_format_date_template.md)


Since v6.2 the default values of the **xml_date** config, and **xml_date** and **xml_format** templates are *undefined*. Thus if you haven't assigned any values to them, they won't work. 

However, Gantt will continue to use the old names of the config and templates, so if you've redefined those APIs in your code, they will work as before. For example:

~~~js
// will work correctly
gantt.templates.xml_date = function(datestring){
    return new Date(datestring);
};
~~~

6.0 -> 6.1 
-------------

### Time constraints and auto scheduling

The **dhtmlxgantt_auto_scheduling.js** extension is upgraded with the [tasks constraints](desktop/auto_scheduling.md#tasksconstraints) functionality. Since this feature modifies the default behavior of auto scheduling, 
Gantt supports the compatibility mode that allows you to restore the previous behavior and not to take into account tasks constraints during auto scheduling. 

To enter the compatibility mode, make use of the following configuration option:

~~~js
gantt.config.auto_scheduling_compatibility = true;
~~~

### Tooltips displaying area

Before version 6.1 [tooltips](desktop/tooltips.md) have been displayed only inside the timeline area. After v6.1 release tooltips displaying isn't limited, and a tooltip follows the movement of the mouse pointer.

If necessary, you can restore the previous behavior by using the code below before initialization of Gantt:

~~~js
gantt.attachEvent("onGanttReady", function(){
	var tooltips = gantt.ext.tooltips;
 	tooltips.tooltip.setViewport(gantt.$task_data);
});

gantt.init("gantt_here");
gantt.parse(demo_tasks);
~~~

5.2 -> 6.0
------------------

In the version 6.0 the **getSlack()** method is deprecated. Two methods are added instead:

- api/gantt_getfreeslack.md - to return the free slack of a task
- api/gantt_gettotalslack.md - to return the total slack of a task

Methods marked as deprecated in v[4.0](#3x40) stopped working in v6.0. The **dhtmlx** object definition was removed from *dhtmlxgantt.js*.

If you use any of the obsolete methods, you'll need to replace them with supported implementations according to the table below. No changes in the arguments or behavior of the methods were made.

<table class="my_table">

<tr><td class="version_info">Obsolete methods</td><td class="version_info">Working methods</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>


3.x -> 4.0
------------

Version 4.0 introduces some changes in public API, namely:

- legacy modules as well as the modules that intersect with dhtmlxSuite modules are no longer defined by the dhtmlxGantt library
- commonly used modules, such as dhtmlxMessage, dataProcessor, Ajax are moved to the **window.gantt** namespace and became a part of dhtmlxGantt public API

A fallback to the old API is included in v4.x, so the code written for v3.3 and earlier will continue working. However in some cases changes are required.
Generally, all global declarations, except for **window.gantt** and **window.Gantt** (enterprise version only) are deprecated and will be removed in version 5.0.

###Deprecated API

There are methods that have been deprecated. They will continue working in v4.x, but will trigger a console warning (not visible to the end users) each time they are called. 

<img src="desktop/gantt_deprecated_warning.png">

Overview:

- dhtmlxMessage module has been moved from the **window.dhtmlx** object to the **window.gantt** object. Read more about Message Boxes [here](desktop/message_boxes.md)
- dhtmlxDataProcessor constructor has been moved from **window.dataProcessor** to **window.gantt.dataProcessor**
- utility methods such as **dhtmlx.copy**, **dhtmlx.uid** and **dhtmlx.mixin** have been moved to **window.gantt** object

If you use these methods, your application will continue working after updating to v4.0 without requiring any immediate changes. In future we recommend updating them to a newer version of the API.

The complete list of deprecated methods includes:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
<tr><td>window.dataProcessor</td><td>gantt.dataProcessor</td></tr>
</table>

###Obsolete API

Some methods have become obsolete and will no longer be used in v4.x.
If you still use these methods or objects, you'll need either to modify the code of an application or to include the **dhtmlxgantt_deprecated.js** file to the page.

Overview:

- **window.dhx4** is no longer defined by **dhtmlxgantt.js**
- Environment variables that were defined in **window.dhx4** are now available in the **gantt.env** object
- Ajax module has been moved from **dhx4.ajax** to **gantt.ajax**
- **gantt.event**, **gantt.eventRemove** should be used instead of **dhtmlxEvent/dhtmlxDetachEvent**

The whole list of the obsolete API is given below:

<table class="my_table">

<tr><td class="version_info">Up to version 3.3</td><td class="version_info">From version 4.0</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
<tr><td>window.dhx4.isIE</td><td>gantt.env.isIE</td></tr>
<tr><td>window.dhx4.isIE6</td><td>gantt.env.isIE6</td></tr>
<tr><td>window.dhx4.isIE7</td><td>gantt.env.isIE7</td></tr>
<tr><td>window.dhx4.isIE8</td><td>gantt.env.isIE8</td></tr>
<tr><td>window.dhx4.isOpera</td><td>gantt.env.isOpera</td></tr>
<tr><td>window.dhx4.isChrome</td><td>gantt.env.isChrome</td></tr>
<tr><td>window.dhx4.isKHTML</td><td>gantt.env.isKHTML</td></tr>
<tr><td>window.dhx4.isFF</td><td>gantt.env.isFF</td></tr>
<tr><td>window.dhx4.isIPad</td><td>gantt.env.isIPad</td></tr>
</table>



2.0 -> 3.0
----------------------
1) In order to prevent CSS conflicts with dhtmlxScheduler, the class names that have been used by both components were renamed in dhtmlxGantt (all classes were related to the lightbox).
If you have customized styling for  the lightbox, the migration will consist in renaming to appropriate CSS classes.

There is 2 renamed patterns:

- Replace <b>'.dhx_gantt_'</b> to <b>'.gantt_'</b> (.dhx_gantt_duration -> .gantt_duration)
- Replace <b>'.dhx_'</b> prefix with <b>'.gantt_'</b> (.dhx_custom_button -> .gantt_custom_button)

*If you encounter difficulties with migrating CSS classes,please, see the full  list of renamed classes [here](desktop/migrating_renamedcss.md)*.

<br>


2) The default values of the api/gantt_buttons_right_config.md and api/gantt_buttons_left_config.md configs were changed in the following way:

~~~js
gantt.config.buttons_left = [
        "dhx_save_btn",
        "dhx_cancel_btn"
];
gantt.config.buttons_right = [
        "dhx_delete_btn"
],

-->

gantt.config.buttons_left = [
        "gantt_save_btn",
        "gantt_cancel_btn"
];
gantt.config.buttons_right = [
        "gantt_delete_btn"
];
~~~

Old configurations ( "dhx_save_btn", "dhx_cancel_btn", "gantt_delete_btn") will still work. Changes does not break any existing behavior.

3) The following features are now available only in the Commercial or Enterprise version of the component (not available in the GPL version of dhtmlxGantt):

- Ability to hide days in week, month, timeline view
- Projects, milestones and other custom types

1.0 -> 2.0
----------------------

1) A variety of objects (**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**) are replaced with 1 static object -  **gantt**. <br> 
The **gantt** object contains a set of methods and 2 main properties: [config](api/refs/gantt_props.md) and [templates](api/refs/gantt_templates.md).

- <a href="api/refs/gantt.md#properties">gantt.config</a> - configuration options for dates, scale, controls etc.
- <a href="api/refs/gantt.md#templates">gantt.templates</a> - formatting templates for dates and labels used in the Gantt chart.

<br>

2) dhtmlxGantt is initialized through the api/gantt_init.md method <br>  <code> var gantt = new GanttChart()</code> -> <code>gantt.init("gantt_div")</code>.

<br>

3) Instead of GanttProject and GanttTask, data is stored as [an array of plain objects with a number of mandatory properties and any custom properties](desktop/loading.md#specifyingdataproperties): 

~~~js
{
    data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18,
    progress:0.4, open: true},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:"1"},
        { id:2, source:2, target:3, type:"0"},
        { id:3, source:3, target:4, type:"0"},
        { id:4, source:2, target:5, type:"2"},
  ]
}
~~~

<br>

4) The [XML format](desktop/supported_data_formats.md#xmldhtmlxgantt20) was changed but the [old XML format](desktop/supported_data_formats.md#xmldhtmlxganttlt20) is still can be [loaded](api/gantt_load.md).

~~~js
gantt.load("tasks.xml","oldxml");
~~~
{{sample
	01_initialization/09_backward_compatibility.html
}}

<br>


5) **Design-time Objects**:

- Methods of the **<i>GanttProjectInfo</i>** object are replaced with:
  - addTask  -> [gantt.addTask()](api/gantt_addtask.md)
  - deleteTask  ->  [gantt.deleteTask()](api/gantt_deletetask.md)
  - getTaskById  -> [gantt.getTask()](api/gantt_gettask.md)
- Methods of the **<i>GanttTaskInfo</i>** object are replaced with:
  - addChildTask -> [gantt.addTask()](api/gantt_addtask.md) (property "parent" of the task object sets the parent for the task)

<br>

6) **Run-time Objects**:

dhtmlxGantt 2.0 doesn't use different types for project and task objects. Instead of this, any task object can have 1 parent object and any number of child tasks.

- **<i>GanttProject</i>** 
  - Instead of getDuration(), getId(), getName(), getPercentCompleted(), getStartDate(), project properties are accessed through **gantt.getTask(projectTaskId).{name_of_property}**
- **<i>GanttTask</i>** 
  - Instead of getDuration(), getId(), getName(), getParentTaskId(), getPercentCompleted(), getPredecessorTaskId(), setDuration(, ) task properties are accessed through **gantt.getTask(taskId).{name_of_property}**
  
A list of methods to get parent/child objects:

- api/gantt_gettask.md
- api/gantt_haschild.md
- api/gantt_getchildren.md

{{note
The id of the parent task can be accessed as **gantt.getTask(task_id).parent**. The root element doesn't have the 'parent' property.
}}

@index:
- desktop/migrating_renamedcss.md

@spellcheck: btn

@todo: check 6.1->6.2