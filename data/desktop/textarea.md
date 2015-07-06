Textarea Control
============================

A multiline text field.

<img src="desktop/textarea_control.png"/>

Initializing the control
---------------------------------
One **textarea** control is added to the lighbox by default. To add another one, follow these steps:
<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
gantt.locale.labels.section_details = "Details";
~~~
	</li>
</ol>



Properties
---------------------------------------------
The following properties are mostly important and commonly set for the 'textarea' control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

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
			<td>(<i>string</i>) the name of a data property that will be mapped to the section</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>type</b></td>
			<td>(<i>duration,parent,select,template,textarea,time,typeselect</i>) the type of the section's control</td>
		</tr>
    </tbody>
</table>