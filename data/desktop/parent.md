Parent Control
==================================================
A select box for changing the parent of a task.  The control loads all tasks presented in the Gantt chart but you can set filtering rules and the template of displayable values.
Everything else is identical to desktop/select.md.
 

<img src="desktop/parent_control.png"/>

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, /*!*/
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~
{{sample
05_lightbox/08_parent_selector.html
}}



Initializing the control
-----------------------
To add the **parent** control to the lightbox, follow these steps:
<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"type", type:"typeselect", map_to:"type"},  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
gantt.locale.labels["section_parent"] = "Parent task";
~~~
	</li>
</ol>

{{sample
05_lightbox/08_parent_selector.html
}}       


A list of properties
------------------------------
The following properties are mostly important and commonly set for the **parent** control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

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
			<td>(<i>string</i>) the name of a data property that will be mapped to the section. The property may be omitted, as the control is always mapped to the 'parent' property</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>duration,parent,select,template,textarea,time,typeselect</i>) the type of the section's control</td>
		</tr>        
        <tr>
			<td class="webixdoc_links0"><b>allow_root</b></td>
			<td>(<i>boolean</i>) if set to "true", the options list will contain an additional option that will allow users to set for tasks the root level as the parent. Used in pair with the 
            <b>root_label</b> property</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>root_label</b></td>
			<td>(<i>string</i>) sets the label for the root-level parent. Used in pair with the <b>allow_root</b> property </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>filter</b></td>
			<td>(<i>function</i>) sets the filtering function for the select options (<a href="desktop/parent.md#filteringoptions">details</a>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>sort</b></td>
			<td>(<i>function</i>) sets the sorting function for the select options (<a href="desktop/parent.md#sortingoptions">details</a>)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>template</b></td>
			<td>(<i>function</i>) sets the template for select options (<a href="desktop/parent.md#specifyingthetemplateforoptions">details</a>)</td>
		</tr>
</tbody>
</table>

Filtering options
--------------------------------------
To filter options presented in the **parent** control, use the **filter** property:

{{snippet
Filtering. Displaying only tasks of the 1st level
}}
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name:"parent", type:"parent",  filter:function(id, task){ /*!*/
	 	if(task.$level > 1){         /*!*/
			return false;     /*!*/
		}else{  /*!*/
			return true; /*!*/
		} /*!*/
	}},
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~
{{sample
05_lightbox/08_parent_selector.html
}}

The **filter** property sets a filtering function that takes 2 parameters:

- **id**  - (*string, number*) the task's id
- **task** - (*object*) the task's object

and returns:

- *true*, for a task that should be displayed
- *false*, for a task that should be removed from the list of options


Sorting options
---------------------------------------
To sort options presented in the **parent** control, use the **sort** property:


{{snippet
Sorting tasks by the title's length
}}
~~~js
function sortByLength(a,b){
        a = a.text.length();
        b = b.text.length();
        return a>b?1:(a<b?-1:0);
};
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name:"parent", type:"parent",  sort:sortByLength}, /*!*/
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

The **sort** property sets a sorting function that is  called for each pair of adjacent values and return 1,-1 or 0:

- 1 - an object with the first value in pair must go before the second one
- -1 - the second object goes before the first one
- 0 - the order of both objects doesn't change

Specifying the template for options
--------------------------------------------
To set the template of options in the **parent** control, use the **template** property:

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name:"parent", type:"parent",  template(start,end,ev){/*!*/
    	var title = ev.id+"."+ev.text;/*!*/
        return title;/*!*/
    }}, /*!*/
	{name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

The **template** property sets a function that takes 3 parameters: 

- **start** - (*Date*)  the date when an event is scheduled to begin
- **end** - (*Date*) the date when an event is scheduled to be completed
- **ev** - (*object*) the event's object


and returns the template of options in the control.

<br>

{{note
If the  'template' property isn't specified, the format of options will be defined by the api/gantt_task_text_template.md template.
}}
