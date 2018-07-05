Time Control
=================

A pair of selectors for setting task duration by specifying the start and end dates of a task.

<img src="desktop/time_control.png"/>

~~~js
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",        height:72, map_to:"auto", type:"time"} /*!*/
];
~~~

{{sample
	05_lightbox/07_time.html
}}

Initializing the control
---------------------------

To add the **time** control to the lightbox, follow the steps below:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea",focus:true},
    {name:"period",      height:72, map_to:"auto", type:"time"}, /*!*/
];
~~~

2) Set a label for the section:

~~~js
gantt.locale.labels.section_period = "Time period";
~~~
	</li>
</ol>

A list of properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'time' control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

<table class="webixdoc_links">
	<tbody>
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
			<td>(<i>"auto"</i> or <i>object</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>readonly</b></td>
			<td>(<i>boolean</i>) if you set the "true" value, the section will be read-only</td>
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
            Edited tasks will be specified only by the start date and have the zero duration. Makes sense only for <a href="desktop/task_types.md#milestones">milestones</a> </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>duration,parent,select,template,textarea,time,typeselect</i>) the type of the section's control</td>
		</tr>
    </tbody>
</table>

 
Configuring  the date-time selectors 
-------------------------------------------------
To configure the selectors of the "duration" or "time" section, use the [time_format](api/gantt_lightbox_config.md) property (see desktop/date_format.md):

{{snippet
Adding the time selector to the 'Time period' section
}}
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"period",type:"time", map_to:"auto", time_format:["%d","%m","%Y","%H:%i"]}/*!*/
];
~~~

Note, the allowable members of the [time_format](api/gantt_lightbox_config.md)'s array are:

- *"%d"* - the day selector 
- *"%m"* - the month selector
- *"%Y"* - the year selector
- *"%H:%i"* - the time selector (the format is set with the api/gantt_time_picker_template.md template) 

You can change just the order and the number of these members in the array but not the data presentation format.<br> For example, you can change the format as in:

~~~js
//time goes first
time_format:["%H:%i", "%m", "%d", "%Y"] 
//month goes first
time_format:["%m","%d", "%Y", "%H:%i"]
//the year selector is removed
time_format:["%H:%i", "%m", "%d"]
//incorrect
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" was changed to "%M"
~~~


Assigning custom start and end date-time properties
------------------------------------------------------------
Generally, the time and duration controls are mapped to the mandatory 'start_date', 'end_date' data properties by setting the **map_to** property to the "auto" value (map_to:"auto").

<br>

To map controls to some custom date properties (instead of 'start_date', 'end_date' ), use the object notation of the **map_to** property:

~~~js
gantt.config.lightbox.sections = [
	{name: "description", height: 72, type: "textarea", map_to:"text", focus: true},
	{name: "time", 		  height: 72, type: "duration", map_to:"auto"},
	{name: "deadline",    height: 72, type: "time", /*!*/
     map_to:{start_date:"planned_start",end_date:"planned_end"}} /*!*/
];
~~~

{{sample
04_customization/14_deadline.html
}}

As an object, the **map_to** object  have 3 properties: 

1. **start_date**- the name of a data property that will store  the start date  set in the input
2. **end_date** - the name of a data property that will store the end date set in the input (*optional*)
3. **duration** - the name of a data property that will store the duration defined by the input (*optional*)

*If some of properties is not specified, the control takes the value of the related mandatory date property.*