Task Properties 
=======================================

On this page you'll find the full list of properties that the task object may include.

The full list of properties of the link object is given in the [Link Properties](desktop/link_properties.md) article.

Required properties
-------------------

These properties will always be defined on the client. Gantt expects the properties to be specified in the task object on data loading but if they are not specified, Gantt will add them by itself.
If you remove one of these properties for the loaded tasks, Gantt will start throwing errors.

<table>
	<tbody>
        <tr>
            <th>Name</th><th>Type</th><th>Description</th>
        </tr>
        <tr>
			<td><b class=subproperty>id</b></td>
            <td><i>string | number</i></td>
			<td>The task id, auto-generated if not set</td>
		</tr>
        <tr>
			<td><b class=subproperty>start_date</b></td>
            <td><i>Date</i></td>
			<td>The date when a task is scheduled to begin. <a href="desktop/loading.md#loadingtaskdates">If not specified, Gantt will calculate it based on the <b>end_date</b> and <b>duration</b> properties.</a><br>The property becomes optional when setting <b>unscheduled: true</b>.</td>
		</tr>
		<tr>
			<td><b class=subproperty>end_date</b></td>
            <td><i>Date</i></td>
			<td>The date when a task is scheduled to be completed. <a href="desktop/loading.md#loadingtaskdates">If not specified, Gantt will calculate it based on the <b>start_date</b> and <b>duration</b> properties.</a><br>The property becomes optional when setting <b>unscheduled: true</b>.</td>
		</tr>
		<tr>
			<td><b class=subproperty>duration</b></td>
            <td><i>number</i></td>
			<td>The task duration. <a href="desktop/loading.md#loadingtaskdates">If not specified, Gantt will calculate it based on the <b>start_date</b> and <b>end_date</b> properties.</a></td>
		</tr>
    </tbody>
</table>

Optional properties
------------------

These properties may or may not be defined. The default logic and templates of gantt will use these properties if they are defined.

<table>
    <tbody>
        <tr>
            <th>Name</th><th>Type</th><th>Description</th>
        </tr>
        <tr>
			<td><b class=subproperty>auto_scheduling</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether gantt should do auto-scheduling of the task (<i>true</i> or not specified) or not (<i>false</i>)</td>
		</tr>
        <tr>
			<td><b class=subproperty>bar_height</b></td>
            <td><i>number</i></td>
			<td>Sets the height of the DOM element of the task in the timeline area</td>
		</tr>
		<tr>
			<td><b class=subproperty>baselines</b></td>
            <td><i>Baseline[]</i></td>
			<td>An array with the baselines</td>
		</tr>
        <tr>
			<td><b class=subproperty>calendar_id</b></td>
            <td><i>number | string</i></td>
			<td>Sets the id of the custom calendar to be assigned to the task. The name of the property depends on the value of the <a href="https://docs.dhtmlx.com/gantt/api__gantt_calendar_property_config.html">calendar_property</a> option</td>
		</tr>
        <tr>
			<td><b class=subproperty>color</b></td>
            <td><i>string</i></td>
			<td>Sets the color of the task in the timeline area (i.e. sets <b>background-color</b> for the <b>gantt_task_line</b> element of the task)</td>
		</tr>
        <tr>
			<td><b class=subproperty>constraint_date</b></td>
            <td><i>Date</i></td>
			<td>The date of the task constraint. It is added to the task object when <a href="https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html">auto-scheduling with time constraints is enabled</a>. The property isn't used if <a href="https://docs.dhtmlx.com/gantt/api__gantt_auto_scheduling_compatibility_config.html">auto_scheduling_compatibility</a> is enabled.</td>
		</tr>
        <tr>
			<td><b class=subproperty>constraint_type</b></td>
            <td><i>string</i></td>
			<td><a href="https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html#timeconstraintsfortasks">The type of the task constraint ("asap", "alap", "snet", "snlt", "fnet", "fnlt", "mso", "mfo")</a>. It is added to the task object when <a href="https://docs.dhtmlx.com/gantt/desktop__auto_scheduling.html">auto-scheduling with time constraints is enabled</a>. The property isn't used if <a href="https://docs.dhtmlx.com/gantt/api__gantt_auto_scheduling_compatibility_config.html">auto_scheduling_compatibility</a> is enabled.</td>
		</tr>
		<tr>
			<td><b class=subproperty>deadline</b></td>
            <td><i>Date</i></td>
			<td>Specifies the deadline date for the task. A [visual indicator](desktop/inbuilt_baselines.md#deadlinesandconstraints) is displayed in the timeline when this property is set.</td>
		</tr>
        <tr>
			<td><b class=subproperty>editable</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether the task can be <a href="desktop/readonly_mode.md#readonlymodefortheentiregantt">editable</a> in the read-only Gantt chart. The name of the property depends on the value of the <a href="https://docs.dhtmlx.com/gantt/api__gantt_editable_property_config.html">editable_property</a> option</td>
		</tr>
        <tr>
			<td><b class=subproperty>group_id</b></td>
            <td><i>string | number</i></td>
			<td>The group's id. It is added to the tasks grouped by some criterion if the property used for grouping tasks (<a href="desktop/grouping.md#groupingtasks">relation_property</a> in the groupBy() method) is specified as an object.</td>
		</tr>
        <tr>
			<td><b class=subproperty>hide_bar</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether a task (type:"task") or milestone (type:"milestone") <a href="desktop/milestones.md#hidingtasksandmilestones">should be hidden in the timeline area</a></td>
		</tr>
        <tr>
			<td><b class=subproperty>key</b></td>
            <td><i>string | number</i></td>
			<td>The key of the group. It is added to the tasks grouped by some criterion if the property used for grouping tasks (<a href="desktop/grouping.md#groupingtasks">relation_property</a> in the groupBy() method) is specified as an array.<br>It is also added to the tasks with the name of the group (for example, to the "High", "Normal", "Low" tasks if you've grouped tasks by priority. <a href="https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html">Check the example</a>).</td>
		</tr>
		<tr>
			<td><b class=subproperty>label</b></td>
            <td><i>string</i></td>
			<td>The label of the group. It is added to the tasks with the name of the group (for example, if you've grouped tasks by priority, the property will be added to the tasks with "High", "Normal", "Low" names. <a href="https://docs.dhtmlx.com/gantt/samples/02_extensions/28_tasks_grouping_save_tree_structure.html">Check the example</a>).</td>
		</tr>
		<tr>
			<td><b class=subproperty>open</b></td>
            <td><i>boolean</i></td>
			<td>Specifies whether the task branch will be opened initially (to show child tasks). To close/open the branch after Gantt initialization, use the related methods: <a href="api/gantt_close.md">close()</a> and <a href="api/gantt_open.md">open()</a></td>
		</tr>
		<tr>
			<td><b class=subproperty>parent</b></td>
            <td><i>number | string</i></td>
			<td>The id of the parent task. If the specified parent doesn't exist, the task won't be rendered in the Gantt. The id of the root task is specified by the api/gantt_root_id_config.md config.</td>
		</tr>
		<tr>
			<td><b class=subproperty>progress</b></td>
            <td><i>number</i></td>
			<td>The task's progress (from 0 to 1)</td>
		</tr>
		<tr>
			<td><b class=subproperty>progressColor</b></td>
            <td><i>string</i></td>
			<td>The color of the task progress in the timeline area (i.e. sets <b>background-color</b> for the <b>gantt_task_progress</b> element of the task progress)</td>
		</tr>
		<tr>
			<td><b class=subproperty>readonly</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether the task must be <a href="desktop/readonly_mode.md#readonlymodeforspecifictaskslinks">readonly</a>. The name of the property depends on the value of the <a href="api/gantt_readonly_property_config.md">readonly_property</a> option</td>
		</tr>
		<tr>
			<td><b class=subproperty>render</b></td>
            <td><i>string</i></td>
			<td>Defines how subtasks of the task must be displayed. <br>Values: <i>"split" | ""</i>. <br>If set to <a href="desktop/split_tasks.md">"split"</a>, the subtasks will be displayed in one row. In addition, if you enable the <a href="api/gantt_open_split_tasks_config.md">open_split_tasks</a> property, the subtasks will be rendered in one row only if the task is collapsed. </td>
		</tr>
		<tr>
			<td><b class=subproperty>resource</b></td>
            <td><i>Array &lt;string&gt;</i></td>
			<td>An array with resources assigned to the task. It is added to the task object when importing data from MS Project/Primavera</td>
		</tr>
		<tr>
			<td><b class=subproperty>rollup</b></td>
            <td><i>boolean</i></td>
			<td>Specifies whether a task (type:"task") or milestone (type:"milestone") <a href="desktop/milestones.md#rolluptasksandmilestones">should appear on the parent projects</a>.</td>
		</tr>
		<tr>
			<td><b class=subproperty>row_height</b></td>
            <td><i>number</i></td>
			<td>Sets the height for the task's row</td>
		</tr>
		<tr>
			<td><b class=subproperty>target</b></td>
            <td><i>string</i></td>
			<td>The id of the target task. The property displays the same value as the <b>$drop_target</b> property. <br>The property is added to the task object only if Data Processor is enabled, after the task is updated and data is sent to the server. </td>
		</tr>
		<tr>
			<td><b class=subproperty>text</b></td>
            <td><i>any</i></td>
			<td>The name of the task. If necessary you may use any other name for this property.<br>The property is used in default configurations of different parts of Gantt.</td>
		</tr>
		<tr>
			<td><b class=subproperty>textColor</b></td>
            <td><i>string</i></td>
			<td>The color of the task's text in the timeline area (i.e. sets <b>color</b> for the <b>gantt_task_line</b> element of the task)</td>
		</tr>
		<tr>
			<td><b class=subproperty>type</b></td>
            <td><i>string</i></td>
			<td>the task type. The available values are stored in the api/gantt_types_config.md object:
            <ul>
				<li><a href="desktop/task_types.md#regulartasks">"task"</a> -  a regular task (<i>default value</i>).</li>
				<li><a href="desktop/task_types.md#projecttasks">"project"</a> -  a task that starts, when its earliest child task starts, and ends, when its latest child ends. 
                <i>The <b>start_date</b>, <b>end_date</b>, <b>duration</b> properties are ignored for such tasks.</i> 
               	</li>
				<li><a href="desktop/task_types.md#milestones">"milestone"</a> -  a zero-duration task that is used to mark out important dates of the project.
                 <i>The <b>duration</b>, <b>progress</b>, <b>end_date</b> properties are ignored for such tasks. </i></li>
			</ul></td>
		</tr>
		<tr>
			<td><b class=subproperty>unscheduled</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether the task must be <a href="desktop/unscheduled_tasks.md">unscheduled</a>. By default, the unscheduled task isn't displayed in the timeline area, empty values are displayed in the grid instead of the start and end dates. </td>
		</tr>
    </tbody>
</table>

Dynamic properties
------------------

Dynamic properties are created on the client and represent the current state of a task or a link. They shouldn't be saved to the database, gantt will ignore these properties if they are specified in your JSON/XML.


<table>
	<tbody>
        <tr>
            <th>Name</th><th>Type</th><th>Description</th>
        </tr>
        <tr>
			<td><b class=subproperty>[resource_property]</b></td>
            <td><i>string | Array &lt;any&gt;</i></td>
			<td><a href="api/gantt_resource_property_config.md">The property may have any other name</a>. This property stores the resource id associated with <i>resourceGrid/Timeline/Histogram/Calendar.</i></td>
		</tr>
        <tr>
			<td><b class=subproperty>$auto_end_date</b></td>
            <td><i>Date</i></td>
			<td>A computed end date of the project task from its subtasks. Added and updated when "auto_scheduling" is disabled.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$auto_start_date</b></td>
            <td><i>Date</i></td>
			<td>A computed start date of the project task from its subtasks. Added and updated when "auto_scheduling" is disabled.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$calculate_duration</b></td>
            <td><i>boolean</i></td>
			<td>A system property that is used in internal calculations.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$custom_data</b></td>
            <td><i>object</i></td>
			<td>An object which contains custom properties of a task which were defined in the <a href="api/gantt_importfrommsproject.md">importFromMSProject()</a> and <a href="api/gantt_importfromprimaverap6.md">importFromPrimaveraP6()</a> methods</td>
		</tr>
        <tr>
			<td><b class=subproperty>$dataprocessor_class</b></td>
            <td><i>string</i></td>
			<td>A system property which defines whether the task has been updated. It is added to the task object when Data Processor is enabled. If the value of the property is <i>"updated"</i>, the task's text will be bold in the grid but it is possible to define your own styles via CSS.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$drop_target</b></td>
            <td><i>string</i></td>
			<td>The id of the target task. A temporary property which is added to the task object when dragging the task vertically.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$effective_calendar</b></td>
            <td><i>string</i></td>
			<td>The id of the calendar (or resource calendar) assigned to the task. A system property that is used in internal calculations.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$expanded_branch</b></td>
            <td><i>boolean</i></td>
			<td>A system property which shows whether the task is visible depending on whether the task's parents are expanded or not. If at least one parent is collapsed, the task won't be visible. The exception is only split tasks (subtasks).</td>
		</tr>
        <tr>
			<td><b class=subproperty>$has_child</b></td>
            <td><i>boolean</i></td>
			<td>Defines whether the Gantt should send a request to the server to load the first-level subtasks of the task. The property is used when the <a href="api/gantt_branch_loading_config.md">branch_loading</a> property is enabled. The name of the property depends on the value of the <a href="api/gantt_branch_loading_property_config.md">branch_loading_property</a> option.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$index</b></td>
            <td><i>number</i></td>
			<td>The global vertical position of the task. It is bound to the task and changes if the tasks below or above are open or closed. If the parent of the task is collapsed, the property doesn't show the actual position of the task.</td>
		</tr>
        <tr>
			<td><b class=subproperty>$level</b></td>
            <td><i>number</i></td>
			<td>The task's level in the tasks hierarchy (zero-based numbering)</td>
		</tr>
        <tr>
			<td><b class=subproperty>$local_index</b></td>
            <td><i>number</i></td>
			<td>The vertical position of the task in the branch (under the parent). It isn't bound to the task and doesn't change if the tasks below or above are open or closed as inside the branch as globally. If the parent of the task is collapsed, the property doesn't show the actual position of the task.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$new</b></td>
            <td><i>boolean</i></td>
			<td>It is added for a new task when it is created via the <a href="api/gantt_createtask.md">createTask()</a> method or via the "+" button. The property is added to the task object when you open the lightbox, and is removed after you save the task.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$no_end</b></td>
            <td><i>boolean</i></td>
			<td><b>Required</b>, a system property which is added to the task object. <br><i>True</i> if the <b>end_date</b> property couldn't be calculated (when the <b>start_date</b> property is loaded but there is no <b>duration</b> or <b>end_date</b> one). In this case, you cannot move or resize the task. The <b>end_date</b> property will depend on the <b>end_date</b> of the subtasks (if any). The <b>start_date</b> property will be fixed and won't change. Auto-scheduling won't work for such a task. If the <b>$no_start</b> property is enabled, the task will fully depend on the dates of its subtasks or on the date of the first task.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$no_start</b></td>
            <td><i>boolean</i></td>
			<td><b>Required</b>, a system property which is added to the task object. <br><i>True</i> if the <b>start_date</b> property couldn't be calculated (when the <b>end_date</b> property is loaded but there is no <b>duration</b> or <b>start_date</b> one). The <b>start_date</b> property will depend on the <b>start_date</b> of the subtasks (if any) or on the start date of the first task. The <b>end_date</b> property will be fixed and will change only if the start date of the subtasks/first task is bigger than the end date of the task. Auto-scheduling won't work for such a task. If the <b>$no_end</b> property is enabled, the task will fully depend on the dates of its subtasks or on the date of the first task.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$open</b></td>
            <td><i>boolean</i></td>
			<td>A system property which specifies whether the task is currently opened (<i>true</i>). If you change the value of the property and re-draw the Gantt, it will open or close the task. To change the state of the task, you may also apply the <a href="api/gantt_open.md">open()</a> or <a href="api/gantt_close.md">close()</a> methods.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$raw</b></td>
            <td><i>object</i></td>
			<td>An object with original names of task properties which were imported from <a href="desktop/export_msproject.md">MS Project</a> / <a href="desktop/export_primavera.md">Primavera</a> into the export module (export server). The properties appear in the <b>$raw</b> object while the file is converted into JSON-format but before they are converted into names and format expected by Gantt.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$rendered_at</b></td>
            <td><i>string | number</i></td>
			<td>The id of a row the <a href="https://docs.dhtmlx.com/gantt/desktop__milestones.html#rolluptasksandmilestones">rollup item</a> / <a href="https://docs.dhtmlx.com/gantt/desktop__split_tasks.html">split</a> task is rendered at. This is the temporary property which appears in the object of the rollup/split task only when it's been rendering on the page.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$rendered_parent</b></td>
            <td><i>number | string</i></td>
			<td>The id of the parent under which the task is rendered (not id of the real parent of the task). The property is used in internal calculations and on tasks' grouping.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$rendered_type</b></td>
            <td><i>string</i></td>
			<td>The type of the rendered task (a temporary property).</td>
		</tr>
		<tr>
			<td><b class=subproperty>$resourceAssignments</b></td>
            <td><i>Array &lt;any&gt;</i></td>
			<td>An array with ids of resources assigned to the task (a temporary property). But the most actual data is stored in the store of resource assignments not in this property.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$rollup</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
			<td>An array with ids of tasks and milestones which <a href="desktop/milestones.md#rolluptasksandmilestones">have appeared on the current task</a></td>
		</tr>
		<tr>
			<td><b class=subproperty>$source</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
			<td><b>Required</b>, an array with <a href="desktop/link_object_operations.md#gettingthelinksrelatedtoacertaintask">ids of all links that come out of the task</a></td>
		</tr>
		<tr>
			<td><b class=subproperty>$split_subtask</b></td>
            <td><i>boolean</i></td>
			<td>Appears if the task is a subtask of a split task (i.e. arranges in one row with other subtasks)</td>
		</tr>
		<tr>
			<td><b class=subproperty>$target</b></td>
            <td><i>Array &lt;string | number&gt;</i></td>
			<td><b>Required</b>, an array with <a href="desktop/link_object_operations.md#gettingthelinksrelatedtoacertaintask">ids of links that come into task</a></td>
		</tr>
		<tr>
			<td><b class=subproperty>$transparent</b></td>
            <td><i>boolean</i></td>
			<td>A temporary property which is added to the task object when dragging the task vertically. The task looks a little bit transparent in grid on vertical dragging due to this property.</td>
		</tr>
		<tr>
			<td><b class=subproperty>$virtual</b></td>
            <td><i>boolean</i></td>
			<td>It is added to the tasks grouped by some criterion. After the grouping is reset, tasks with <b>$virtual: true</b> are removed</td>
		</tr>
		<tr>
			<td><b class=subproperty>$wbs</b></td>
            <td><i>string</i></td>
			<td>The WBS code of the task (a temporary property). It is added to the task object after applying the <a href="api/gantt_getwbscode.md">getWBSCode()</a> method. If the value of the code has changed (the task's parent or position has been changed), you need to call the <a href="api/gantt_getwbscode.md">getWBSCode()</a> method again to get the updated value of the code.</td>
		</tr>
    </tbody>
</table>

## Example

~~~js
var data = {
  tasks:[
     	{id:1, text:"Project #1", start_date:"01-04-2020", duration:18},
     	{id:2, text:"Task #1", start_date:"02-04-2020", duration:8, parent:1},
     	{id:3, text:"Task #2", start_date:"11-04-2020", duration:8, parent:1}
   	],
    links:[]
};
~~~
