Template Control
=====================================
A container with some HTML content inside.

<img src="desktop/template_control.png"/>

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_template = "Details";

gantt.attachEvent("onBeforeLightbox", function(id) {
  	var task = gantt.getTask(id);
   	task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
	return true;
});
~~~
{{sample
	05_lightbox/05_template.html
}}


Initializing the control
-----------------------
To add the **template** control to the lightbox, follow these steps:
<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
gantt.locale.labels.section_template = "Details";
~~~
	</li>
    <li><b>Set the content of the control with the help of some event, e.g. the api/gantt_onbeforelightbox_event.md event:</b>
~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
  	var task = gantt.getTask(id);
   	task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
	return true;
});
~~~
	</li>
</ol>

        


A list of properties
------------------------------
The following properties are mostly important and commonly set for the **template** control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

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
