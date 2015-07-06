lightbox
=============
@short:specifies the lightbox object
	

@type: object
@example:
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
gantt.init("gantt_here");



@template:	api_config
@descr:
The lightbox object has 1 property:

- **sections** - (*array*) specifies lightbox's sections 

~~~js
//default lightbox definition   
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

Each object in the **sections** array can have the following properties:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) the section's name (according to this name, dhtmlxGantt will take the section's label from <i>locale.labels</i> collection). For example, for the <b>'time'</b> section, dhtmlxGantt will take the label stored as <b>gantt.locale.labels.section_time</b>. </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>height</b></td>
			<td>(<i>number</i>) the section's height</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>map_to</b></td>
			<td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>duration,select,template,textarea,time</i>) the type of the section's control (editor)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>time_format</b></td>
			<td>(<i>string</i>) sets the order of date-time selectors in the "duration" or "time" section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>focus</b></td>
			<td>(<i>boolean</i>) if set to <i>true</i>, the section will take the focus on opening the lightbox</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>default_value</b></td>
			<td>(<i>any</i>) the default value of the section's control</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>onchange</b></td>
			<td>(<i>function</i>) specifies the 'onChange' event handler function for the section's control (<b>for the <a href="desktop/select.md">select</a> control only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>options</b></td>
			<td>(<i>array of objects</i>) defines select options of the control. (<b>for the <a href="desktop/select.md">select</a> control only</b>)<br> Each object in the array specifies a single option and takes these properties:
            	<ul>
					<li><b>key</b> -   (<i>string</i>) the option's id. This attribute is compared with the task's data property to assign select options to tasks</li>
					<li><b>label</b> -   (<i>string</i>) the option's label</li>
			</ul>
             </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>readonly</b></td>
			<td>(<i>boolean</i>) if you set the "true" value, the section will be read-only <br>(<b>for the <a href="desktop/time.md">time</a>, 
            <a href="desktop/duration.md">duration</a> controls only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>year_range</b></td>
			<td>(<i>array,number</i>) sets the range for the year selector
            <br>Can be set in 2 ways: 
             <ul>
              <li>year_range: [2005, 2025] - a period from 2005 till 2025 year </li>
              <li>year_range: 10  - a period [current year - 10 years; current year + 10 years]</li>
              </ul>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>single_date</b></td>
			<td>(<i>boolean</i>) if you set the "true" value, just the 'start Date' selector will be presented in the section. 
            Edited tasks will be specified only by the start date and have the zero duration. Makes sense only for <a href="desktop/task_types.md#milestones">milestones</a> <br>(<b>for the <a href="desktop/time.md">time</a>, 
            <a href="desktop/duration.md">duration</a> controls only</b>)</td></td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>allow_root</b></td>
			<td>(<i>boolean</i>) if set to "true", the options list will contain an additional option that will allow users to set for tasks the root level as the parent. Used in pair with the 
           'root_label' property (<b>for the <a href="desktop/parent.md">parent</a> control only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>root_label</b></td>
			<td>(<i>string</i>) sets the label for the root-level parent. Used in pair with the 'allow_root' property (<b>for the <a href="desktop/parent.md">parent</a> control only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>filter</b></td>
			<td>(<i>function</i>) sets the filtering function for the select options <br> (<b>for the <a href="desktop/parent.md">parent</a> control only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>sort</b></td>
			<td>(<i>function</i>) sets the sorting function for the select options <br>(<b>for the <a href="desktop/parent.md">parent</a> control only</b>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>template</b></td>
			<td>(<i>function</i>) sets the template for select options (<b>for the <a href="desktop/parent.md">parent</a> control only</b>)</td>
		</tr>
    </tbody>
</table>

