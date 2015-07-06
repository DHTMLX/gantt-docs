Typeselect Control
==================================================
A select box for changing the [type of a task](desktop/task_types.md). <br> The control loads options from the 
api/gantt_types_config.md object and has the default onchange handler. Everything else is identical to desktop/select.md.
 

<img src="desktop/typeselect_control.png"/>

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name: "type", type: "typeselect", map_to: "type"},                             /*!*/
	{name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~
{{sample
01_initialization/16_projects_and_milestones.html
}}


Initializing the control
------------------------------------------
To add the **typeselect** control to the lightbox,  just add the section to the lightbox configuration as in:
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea",focus:true},
	{name: "type", type: "typeselect", map_to: "type"},                             /*!*/
	{name: "time", height: 72, type: "duration", map_to: "auto"}
];
~~~


{{sample
01_initialization/16_projects_and_milestones.html
}}

<ul>
	<li><a href="desktop/task_types.md#individuallightboxforeachtype">Each type of a task has its lightbox</a>. You can create a new type of tasks and define a specific structure of the lightbox for this type.</li>
	<li>Once the user changes <a href="desktop/task_types.md">the type of a task</a> through the control, the control refreshes the lightbox's structure according to the selected value. </li>
	<li>The control loads options from the api/gantt_types_config.md object and has the default onchange handler.</li>
	<li>The  section with <b>name="type"</b> already has a label specified - "Type". <br> If you want to set some other label for the section, use the following code: <br> <br>
~~~js
gantt.locale.labels.section_type = "Some other label for the section";
~~~
	</li>
</ul>        


Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'typeselect' control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

<table class="webixdoc_links">
	<tbody>
    	 <tr>
			<td class="webixdoc_links0"><b>filter</b></td>
			<td>(<i>function</i>) filters the types in the control. Takes the type's name as a parameter</td>
		</tr>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the section name </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>height</b></td>
			<td>(<i>number</i>) the section height</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>map_to</b></td>
			<td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>duration,parent,select,template,textarea,time,typeselect</i>) the type of the section's control</td>
		</tr>
    </tbody>
</table>


@edition: pro