Select Control
=========================
A drop-down list box.

<img src="desktop/select_control.png"/>

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", height:22, map_to:"priority", type:"select", options: [ /*!*/
    	{key:1, label: "High"},                                               /*!*/
    	{key:2, label: "Normal"},                                             /*!*/
        {key:3, label: "Low"}                                                 /*!*/
     ]},                                                                      /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_priority = "Priority";
~~~
{{sample
	05_lightbox/02_select.html
}}

Initializing the control
------------------------------------------

To add the **select** control to the lightbox, follow these steps:

<ol>
    <li><b>Add the section to the lightbox configuration:</b>
~~~js
var opts = [
    	{key:1, label: "High"},                                            
    	{key:2, label: "Normal"},                                         
        {key:3, label: "Low"}                                            
];

gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea",focus:true},
    {name:"priority", height:22, map_to:"priority",type:"select",options:opts},      /*!*/                                                                  /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~
	</li>
    <li><b>Set the label for the section:</b>
~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
	</li>
</ol>

        
{{sample
	05_lightbox/02_select.html
}}

A list of properties
---------------------------------------------
The following properties are mostly important and commonly set for the **select** control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

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
        <tr>
			<td class="webixdoc_links0"  style="vertical-align: top;"><b>options</b></td>
			<td>(<i>array of objects</i>) defines select options of the control (<b>for the 'select' control only</b>).<br> Each object in the array specifies a single option and takes these properties:
            	<ul>
					<li><b>key</b> -   (<i>string</i>) the option id. This attribute is compared with the task data property to assign options to tasks</li>
					<li><b>label</b> -   (<i>string</i>) the option label</li>
			</ul>
             </td>
		</tr>
    </tbody>
</table>


Populating the control with data
-------------------------------------------

Generally, to set values for the **select** control, use the [options](api/gantt_lightbox_config.md) parameter:

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",height:22, map_to:"priority",type:"select",
      options: [ 
    		{key:1, label: "High"},                                               
    		{key:2, label: "Normal"},                                             
        	{key:3, label: "Low"}                                                
    ]}                                                                    
];
~~~

Items in the  [options](api/gantt_lightbox_config.md) parameter have 2 mandatory properties:

- **key** - the option id
- **label** - the option label


Populating the control with data from the server
------------------------------------------------------
To populate the control from the server, set the [options](api/gantt_lightbox_config.md) option
to the value returned by the api/gantt_serverlist.md method:

~~~js
gantt.config.lightbox.sections = [
    { name:"priority",map_to:"priority",type:"select",
    options:gantt.serverList("priority")}                                      
];

gantt.config.lightbox.sections = [
	{name:"description", ...},
	{name:"type", map_to:"type", type:"select", options:gantt.serverList("type")},
	{name:"time", ...}
];
gantt.init("gantt_here");
gantt.load("data.php");
~~~

where the **data.php** is a server-side script that retrieves a set of tasks and the 'priority' options collection:

~~~php
//data.php
<?php
	include('connector-php/codebase/gantt_connector.php');
 
	$res=mysql_connect("localhost","root","");
	mysql_select_db("sampleDB");

	$list = new OptionsConnector($res, $dbtype);
	$list->render_table("priorities","id","id(value),name(label)");
    
	$gantt = new JSONGanttConnector($res, $dbtype);
    $gantt->set_options("priority", $list);
	$gantt->render_links("gantt_links","id","source_task(source),
                    target_task(target),type");    
	$gantt->render_table("gantt_tasks","id","start_date,duration,text,progress,
                    sortorder,parent");
?>
~~~

