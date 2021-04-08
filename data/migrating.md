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

7.0 -> 7.1
-------------

Version 7.1 doesn't introduce any breaking changes that would require modifying the existing code.

There is a minor visual change in the way milestones are rendered, which can be reverted by the code if needed.
Large projects that use the resource panel may have a possible performance decrease caused by the new logic of the resource assignments, it can be mitigated by disabling the unneeded logic.

### Milestones

The size of Milestone elements has changed compared to the previous versions in order for the milestones to have the same height as regular bars.

If you want the milestones to look the same as in previous versions, you can adjust the height of the milestone elements using the **bar_height** property:

~~~js
{
    id:23, text:"Mediate milestone", start_date:"13-04-2018", 
    type:"milestone", parent:"15", bar_height: 35
}
~~~

### Resource assignments

Version 7.1 adds a complex logic to resource assignments which allows specifying dates of the resource assignments and working with the resource assignments via DataStore.
It should not affect the existing code, but the changes may add noticeable performance overhead to resource calculations.

If you don't need to assign resources to specific dates of tasks, you can disable the new functionality using the **process_resource_assignments** config in order to improve the performance:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### New optional properties of Task objects

The following properties of the task object are now processed by the gantt and affect the display of tasks:

- "task.row_height"
- "task.bar_height"
- "task.hide_bar"
- "task.rollup"
  
If you have custom properties with the same names, you should rename them to avoid conflicts.

### Deep copy on data parsing

Gantt performed a deep copy of data objects on data parsing from [v6.3.2](whatsnew.md#632) till v7.1.
<br>Starting with v7.1, the functionality is disabled by default. 

You can enable the old behavior by setting the [gantt.config.deepcopy_on_parse](api/gantt_deepcopy_on_parse_config.md) to *true*:

~~~js
gantt.config.deepcopy_on_parse = true;
~~~

### Deprecated config

The **gantt.config.task_height** property has been deprecated since v7.1. Despite the property will still continue work and the **task_height** config will be used if specified, you'd better use the new [gantt.config.bar_height](api/gantt_bar_height_config.md) option instead:

~~~js
gantt.config.bar_height = 50;
~~~


6.3 -> 7.0
---------------------

###Extensions and locale files

The newest update v7.0 introduces two major changes in the structure of the Gantt package:

1) All files of extensions are now bundled with the *dhtmlxgantt.js* file. 
Therefore, in order to activate any of extra extensions provided by dhtmlxGantt you need to use the API call.

- If you have already included any extension files from the built-in package on your page, for example:

~~~js
<script src="../codebase/dhtmlxgantt.js"></script>
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

or

~~~js
import "dhtmlx-gantt";
import "dhtmlx-gantt/ext/dhtmlxgantt_auto_scheduling";
~~~

Then you need to remove the extension file and enable the extension using the **gantt.plugins** method:

~~~js
gantt.plugins({
   auto_scheduling: true
});
~~~

See the full list of extensions [here](desktop/extensions_list.md).

- If you use a modified version of extension files or have developed custom extensions, include them as files on a page and they will work. 

- **Note**, that the **dhtmlxgantt_smart_rendering.js** and **dhtmlxgantt_csp.js** extensions are completely removed and do not need to be enabled manually.
<br>

2) All locales are now embedded into the *dhtmlxgantt.js* file. To activate them, use the API call.

- If you have included any locale on a page, you need to remove it from the page and enable the required locale using **gantt.i18n.setLocale**:

~~~js
gantt.i18n.setLocale("de");
~~~

- If you use a custom locale file, it can be loaded as before.

###Default settings of the working time are changed

In all versions before 7.0, the default working hours were from 8:00 till 17:00 that is 9 hours per day.<br>
Starting from v7.0, the working hours are 8:00-12:00, 13:00-17:00 that is 8 hours per day.

If you want to revert to the previous settings, you'll need to set it manually:

~~~js
gantt.setWorkTime({hours: [8, 17]});
~~~

###Content Security Policy

The **ext/dhtmlxgantt_csp.js** extension is no longer needed as it is removed and replaced with the [csp config](api/gantt_csp_config.md) which is enabled by default; the extension should be removed from the gantt.

Since the **csp** property is added to the dhtmlxGantt library, valid HTML 5 attributes, that can be used in any browser that supports HTML5 doctypes, will be assigned to all elements of Gantt. <br>

Therefore, we recommend that you update already existing attributes with new ones:

- "task_id" -> ["data-task-id"](api/gantt_task_attribute_config.md)
- "link_id" -> ["data-link-id"](api/gantt_link_attribute_config.md)
- "resource_id" -> ["data-resource-id"](api/gantt_resource_attribute_config.md)
- "column_index" -> ["data-column-index"](api/gantt_grid_resizer_column_attribute_config.md)

However, the old attributes are included in the markup, so if you don't change the attributes' names, your code will continue working. 

###Styling grid cells

Earlier, alignment of grid cells was accomplished via `display:inline-block`. Starting from v7.0, `display:flex` is used instead and cells are positioned inside a flex container.

This change doesn't affect the UI visible to the user (it remains 100% identical) and shouldn't cause any migration issues.
However, some regressions with styling of the grid cells may be related to this update.

###"xml_date" config and template, and "xml_format" templates are removed

Deprecated in v6.2 config and templates are removed in v7.0 and replaced with new ones:

- gantt.config.xml_date →  [gantt.config.date_format](api/gantt_date_format_config.md)
- gantt.templates.xml_date → [gantt.templates.parse_date](api/gantt_parse_date_template.md)
- gantt.templates.xml_format → [gantt.templates.format_date](api/gantt_format_date_template.md)

If you have already defined the old names in your code, they will continue work. In other case, use a newer version of the API.

6.2 -> 6.3
---------------

###Multi-task selection

Since v6.3 the **ext/dhtmlxgantt_multiselect.js** extension automatically allows to drag horizontally several tasks that are selected  at once.
If you want to disable this functionality make use of the [drag_multiple](api/gantt_drag_multiple_config.md) property and set it to *false* (by default it is enabled).

~~~js
gantt.config.drag_multiple = false;
~~~

###Google Roboto font is no longer included into Material skin

Until v6.3, Google [Roboto](https://fonts.google.com/specimen/Roboto) font was included into the ['Material' skin](desktop/skins.md#materialskin) of dhtmlxGantt via the `import` statement.
Starting from v6.3, the import was removed, therefore you need to add `Roboto` font manually:

~~~html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:regular,medium,thin,bold">
~~~

###Usage with Require.JS

Earlier you could use any arbitrary names for different files of dhtmlxGantt library included into a RequireJS-based app:

~~~js
requirejs.config({
  paths: {
    "gantt": "../../codebase/dhtmlxgantt",
    "tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "marker": "../../codebase/ext/dhtmlxgantt_marker",
    "locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "tooltip": ["gantt"],
    "marker": ["gantt"],
    "locale_de": ["gantt"],
  }
});
requirejs(["gantt", "tooltip", "marker", "locale_de"],
function (dhx) {
  var gantt = dhx.gantt;
 ...
});
~~~

Starting from version 6.3 names of modules must be fixed according to the folder structure of dhtmlxGantt library:

~~~js
requirejs.config({
  paths: {
    "dhtmlxgantt": "../../codebase/dhtmlxgantt",
    "ext/dhtmlxgantt_tooltip": "../../codebase/ext/dhtmlxgantt_tooltip",
    "ext/dhtmlxgantt_critical_path": "../../codebase/ext/dhtmlxgantt_critical_path",
    "locale/locale_de": "../../codebase/locale/locale_de",
  },
  shim: {
    "ext/dhtmlxgantt_tooltip": ["dhtmlxgantt"],
    "ext/dhtmlxgantt_critical_path": ["dhtmlxgantt"],
    "locale/locale_de": ["dhtmlxgantt"],
  }
});
 
requirejs(["dhtmlxgantt", "ext/dhtmlxgantt_tooltip", "ext/dhtmlxgantt_critical_path", 
			"locale/locale_de"], 
function (dhx) {
  var gantt = dhx.gantt;
...
});
~~~

Check that the module name for any file inside the package is specified as *a relative path inside the 'codebase' folder of the package* plus *the filename*, for instance:

**core library:**

- "dhtmlxgantt": "./vendor/dhtmlxgantt/dhtmlxgantt"

**extensions:**

- "ext/dhtmlxgantt_critical_path": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_critical_path"
- "ext/dhtmlxgantt_tooltip": "./vendor/dhtmlxgantt/ext/dhtmlxgantt_tooltip"

**locales:**

- "locale/locale_de": "./vendor/dhtmlxgantt/locale/locale_de"
- "locale/locale_be": "./vendor/dhtmlxgantt/locale/locale_be"

<h3 id="inline_editors">Inline Editors</h3>

Before version 6.3, minimal and maximal values of the **date** [inline editor](desktop/inline_editing.md#typesofeditors) were limited by the dates visible  on the time scale, unless custom min/max values were provided.

Starting from v6.3 there are no default limits for minimal and maximal values of date editors.

In order to restore the previous behavior you can specify dynamic **min**/**max** values:

~~~js
const dateEditor = {type: "date", map_to: "start_date", 
  min: function(taskId){
    return gantt.getState().min_date
  },
  max: function( taskId ){
    return gantt.getState().max_date
  }
};
~~~

6.1 -> 6.2
---------------

The update to v6.2 is generally compatible with v6.1 and should not require any changes in code.
However, some behavior of the component has been changed (old behavior can be restored via config), and some APIs has been deprecated.

###Smart rendering and static background

Smart rendering functionality has been updated and is now embedded into the component. It should now work both in the main timeline area and in resource panels. From now on, all timelines should render only rows and cells that are currently visible.

Smart rendering can be disabled via the **smart_rendering** config, which will return gantt to the default behavior of v6.1:

~~~js
gantt.config.smart_rendering = false;
~~~

The **dhtmlxgantt_smart_rendering** extension is no longer needed and should be removed from gantt. The extension itself is still available in the package in case of compatibility issues.
If the extension is added to the page, gantt will revert to the v6.1 smart rendering mode.

The behavior of the **api/gantt_static_background_config.md** config has been updated as well. Starting from v6.2 it will render PNG background AND any cells that have CSS class attached to them via template function.

If you need to revert to v6.1 behavior, use the **static_background_cells** config:

~~~js
gantt.config.static_background_cells = false;
~~~


### Time scale settings

Configuration of time scale has been simplified. Instead of specifying a bunch of scale settings for each scale separately, now you should use just one configuration option api/gantt_scales_config.md that will contain 
a number of scale objects with settings for them.

All in all, the following time scale APIs are deprecated:

- gantt.config.scale_unit
- gantt.config.step
- gantt.config.date_scale
- gantt.templates.date_scale
- gantt.config.subscales

For example, the code below:

~~~js
gantt.config.scale_unit = "day"; 
gantt.config.step = 1; 
gantt.config.date_scale = "%d %M"; 
gantt.templates.date_scale = null; 
gantt.config.subscales = [];
~~~

Now looks like this:

~~~js
gantt.config.scales = [ { unit:"day", step: 1, format: "%d %M"} ];
~~~

#### task_cell_class template renamed

The template used to define the CSS class applied to the cells of the timeline area is renamed as follows:

- gantt.templates.task_cell_class → [gantt.templates.timeline_cell_class](api/gantt_timeline_cell_class_template.md)

An example of using the renamed template is:

~~~js
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
 
gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

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


### Unused API removed

The **gantt.config.api_date** config and **gantt.templates.api_date** template are removed from API as they weren't used inside gantt code. If you've used them in your code, you need to declare them once again.

~~~js
gantt.config.api_date = "%d-%m-%Y %H:%i";
gantt.templates.api_date = gantt.date.date_to_str(gantt.config.api_date);
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
