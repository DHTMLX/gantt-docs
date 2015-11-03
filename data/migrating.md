Migrating From Older Versions
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


3.0 -> 4.0
------------

###Changes in the Gantt API


1) You should use the local **gantt** object instead of the global **window** object.
The API related to the window object is deprecated since the version 4.0. If you need to use **window**, you should include the file *dhtmlxgantt_deprecated.js* into your code. 

<table class="my_table">

<tr><td class="version_info">Up to version 3.0</td><td class="version_info">From version 4.0</td></tr>
<tr><td colspan="2" class="type_info">Functionality moved from window to gantt object</td></tr>

<tr><td>window.dhtmlxDnD</td><td>gantt._DnD</td></tr>
<tr><td>window.dhtmlxEventable</td><td>gantt._eventable</td></tr>
<tr><td>window.dhtmlxEvent</td><td>gantt.event</td></tr>
<tr><td>window.dhtmlxDetachEvent</td><td>gantt.eventRemove</td></tr>
</table>


2) The **gantt.env** object is used instead of the **window.dhx4** object. Thus, the API that referred to **window.dhx4** is deprecated now.

If you need to use **window.dhx4**, you should include the file *dhtmlxgantt_deprecated.js* into your code. 

<table class="my_table">

<tr><td class="version_info">Up to version 3.0</td><td class="version_info">From version 4.0</td></tr>
<tr><td colspan="2" class="type_info">Functionality of properties moved from window.dhx4 to gantt.env object</td></tr>

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


####Events:
~~~js
gantt.attachEvent("onLoadXMLError", function () {
	dhx4.callEvent("onLoadXMLError", Array.prototype.slice.call(arguments));
});
gantt.attachEvent("onAjaxError", function () {
	dhx4.callEvent("onAjaxError", Array.prototype.slice.call(arguments));
});
~~~

####window.dhx4.ajax => gantt.ajax

You should use **gantt.ajax** instead of dhx4.ajax for ajax operations.

####Global flags:

~~~js
window._isFF = false;
window._isIE = false;
window._isOpera = false;
window._isKHTML = false;
window._isMacOS = false;
window._isChrome = false;
window._FFrv = false;
window._KHTMLrv = false;
window._OperaRv = false;
~~~


2) Some methods that were called through the global **dhtmlx** object are deprecated and will eventually stop working in version 5.0. They should be called via the **gantt** object instead. 



If you try to call one of these methods as usual, a warning will appear:

<img src="desktop/gantt_deprecated_warning.png">

In order to get such warnings in the case of a wrong call of a method, you need to include the *deprecated_warnings.js* file.

<table class="my_table">

<tr><td class="version_info">Up to version 3.0</td><td class="version_info">From version 4.0</td></tr>
<tr><td colspan="2" class="type_info">Functionality moved from dhtmlx to gantt object</td></tr>

<tr><td>dhtmlx.alert</td><td>gantt.alert</td></tr>
<tr><td>dhtmlx.confirm</td><td>gantt.confirm</td></tr>
<tr><td>dhtmlx.modalbox</td><td>gantt.modalbox</td></tr>
<tr><td>dhtmlx.uid</td><td>gantt.uid</td></tr>
<tr><td>dhtmlx.copy</td><td>gantt.copy</td></tr>
<tr><td>dhtmlx.mixin</td><td>gantt.mixin</td></tr>
<tr><td>dhtmlx.defined</td><td>gantt.defined</td></tr>
<tr><td>dhtmlx.bind</td><td>gantt.bind</td></tr>
<tr><td>dhtmlx.assert</td><td>gantt.assert</td></tr>
</table>

4) The global **dataProcessor constructor** was replaced with the local one:

<table class="my_table">
<tr><td class="version_info">Up to version 3.0</td><td class="version_info">From version 4.0</td></tr>

<tr><td>new dataProcessor(url)</td><td>new gantt.dataProcessor(url)</td></tr>
</table>



2.0 -> 3.0
----------------------
1) In order to prevent CSS conflicts with dhtmlxScheduler, the class names that have been used by both components were renamed in dhtmlxGantt (all classes were related to the ligthbox).
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

3) Following features are now available only in the Commercial or Enterprise version of the component (not available in the GPL version of dhtmlxGantt):

- Ability to hide days in week, month, timeline view
- Projects, milestones and other custom types

1.0 -> 2.0
----------------------
1) A varierty of objects (**GanttProjectInfo**, **GanttTaskInfo**, **GanttChart**, **GanttProject**, **GanttTask**) are replaced with 1 static object -  **gantt**. <br> 
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

dhtmlxGantt 2.0 doesn't use different types for project and task obejcts. Instead of this, any task object can have 1 parent object and any number of child tasks.

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