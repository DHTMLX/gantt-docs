Working with Styles in Gantt
=========================

dhtmlxGantt provides you with a wide set of options for modifying its appearance. You can both [change the general look of the Gantt chart by using one of the 
predefined skins](desktop/skins.md) and adjust the styles of separate elements (tasks, links, scale and subscales, grid, etc.) of the component.  

In this guide general instructions on working with styles of Gantt parts are collected together to facilitate your wandering through the documentation. 
Detailed information for each particular element is provided in the related articles.


Styling Grid
------------------

You can change the style of the grid area via the related desktop/table_templates.md.

###Styling the headers of grid columns

There is a api/gantt_grid_header_class_template.md template that allows you to apply a custom style to the headers of the grid columns. For example, you can change the background color of certain headers of the grid columns in the following way:

~~~html
<style>
  .updColor{
  	background-color:#ffeb8a!important;
  }
</style>
~~~

~~~js
gantt.templates.grid_header_class = function(columnName, column){
  if(columnName == 'duration' ||columnName == 'text')
    return "updColor";
};
~~~

<img src="desktop/styling_columns_headers.png">

{{editor		http://docs.dhtmlx.com/gantt/snippet/356f900e		Styling Headers of Grid Columns}}

###Setting the background color of a grid row 

You can apply a custom color for all or separate grid rows with tasks via the api/gantt_grid_row_class_template.md template. For example, you can change the background color of a particular row like this:

~~~html
<style>
  .updColor{
  	background-color:#ffeb8a!important;  
  }
</style>
~~~

~~~js
gantt.templates.grid_row_class = function(start, end, task){
 if(task.id == 12)
    return "updColor";
};
~~~

<img src="desktop/grid_row_bg.png">

{{editor	https://docs.dhtmlx.com/gantt/snippet/3328e356			Coloring Grid Rows}}

###Changing the color of text in grid columns

It is also possible to change the default color of the text in grid columns. You can do it by setting a template for a necessary column via the api/gantt_columns_config.md configuration option. For example, you can define a special color for the text of tasks depending on their priority:

~~~js
gantt.config.columns=[
	{name:"text",       label:"Task name",  tree:true, width:230, template:myFunc },
	{name:"start_date", label:"Start time", align: "center" },
	{name:"duration",   label:"Duration",   align: "center" }
];

function myFunc(task){
	if(task.priority ==1)
		return "<div class='important'>"+task.text+" ("+task.users+") </div>";
	return task.text+" ("+task.users+")";
};
~~~

<img src="desktop/columns_text_color.png">

{{sample	04_customization/05_tree_template.html}}


Styling Scale
------------

The scale styling is defined by the related [templates of the timeline area](desktop/timeline_templates.md).

###Styling the row of the timeline area

You can style the row of the scale with the help of the **scale_row_class** template. For example, define the background color:

~~~html
<style>
  .updColor{
  	background-color:#ffeb8a!important  	
  }
</style>
~~~

~~~js
gantt.templates.scale_row_class = function(scale){           
	return "updColor";
}
~~~

<img src="desktop/color_scale_row.png">
 
{{editor	http://docs.dhtmlx.com/gantt/snippet/70bae8cb		Styling Row of the Scale}}

###Styling the cells of the timeline area

It is also possible to style the cells of the scale via the **scale_cell_class** template. For example, you can color particular days of the timeline area:

~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "updColor";
    }
};
~~~

<img src="desktop/styling_scale_cells.png">

{{editor	http://docs.dhtmlx.com/gantt/snippet/953ad9f3		Styling Separate Cells on the Scale}}

Read more in the related articles: desktop/configuring_time_scale.md#settingthescalesstyle and desktop/highlighting_time_slots.md.

###Styling the subscale

You can specify a new style for the subscale via the **css** attribute of the api/gantt_subscales_config.md property. For example, you can set a specific color for the weekends as follows:

~~~html
<style type="text/css">
.weekend{
    background: #F0DFE5 !important;
}
</style>
~~~

~~~js
var daysStyle = function(date){
	var dateToStr = gantt.date.date_to_str("%D");
    if (dateToStr(date) == "Sun"||dateToStr(date) == "Sat")  return "weekend";

	return "";
};

gantt.config.subscales = [
	{unit:"day", date:"%D", css:daysStyle }
];
~~~

Check the related article desktop/second_scale.md#settingthescalesstyle for more details.

<img src="desktop/styling_subscale.png">

{{editor		https://docs.dhtmlx.com/gantt/snippet/53c5406c		Styling the Second Scale}}

{{sample	03_scales/01_multiple_scales.html}}



Styling Tasks
----------------

You can change the style of a task and a task bar via the corresponding [templates of the timeline area](desktop/timeline_templates.md).

###Styling the task bar

You can redefine the api/gantt_task_class_template.md template to refresh the styles of a task or of a task bar. 
You can find the details in the article desktop/colouring_tasks.md#redefiningthetaskstemplate.

~~~js
gantt.templates.task_class = function(start, end, task){return "";};
~~~

<img src="desktop/coloring_tasks.png">

{{sample 04_customization/04_task_styles.html}}

Templates allow applying styles dynamically. For example, you can change colors depending on the progress of the task:

~~~js
gantt.templates.task_class = function(start,end,task){
	if(task.progress > 0.5){
		return "";
	}else{
		return "important";
	}
};
~~~

<img src="desktop/dynamic_styling.png">

{{sample 04_customization/08_templates.html}}


###Styling text in the task bar

The api/gantt_task_text_template.md template allows using inline styles to change the style of the task bar text:

~~~js
gantt.templates.task_text = function(start, end, task){
  if(task.id == 12)
    return "<span style='color:red'>"+task.text+"</span>";
  
  return task.text;
};
~~~

<img src="desktop/inline_styling_task_text.png">

{{editor		https://docs.dhtmlx.com/gantt/snippet/c31afbec		Inline Styling of the Task Text}}


###Setting the style via the properties of a task object

You can set additional properties in the task object configuration to define a custom color for a task. They are: **color**, **textColor** and **progressColor**.

~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, color:"red"},
     {id:2, text:"Task #1", start_date:"02-04-2013", 
        duration:8, color:"blue", parent:1}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getTask(1).color = "red"
~~~

Read the related section of the desktop/colouring_tasks.md#specifyingstyleinthepropertiesofataskobject article to get the details.

###Setting the color and text of a task bar via the lightbox

You can define a set of predefined colors and specify them as options in the lightbox configuration.

~~~js
var colors = [
	{key:"", label:"Default"},
	{key:"#4B0082",label:"Indigo"},
	{key:"#FFFFF0",label:"Ivory"},
	{key:"#F0E68C",label:"Khaki"}
	// more colors
];

gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
	{name:"priority", height:22, map_to:"color", type:"select", options:colors},
	{name:"textColor", height:22, map_to:"textColor", type:"select", options:colors},
	{name:"time", type:"duration", map_to:"auto"}
];
~~~

<img src="desktop/task_style_property.png">

{{sample 04_customization/16_inline_task_colors.html}}

###Styling rows of the timeline area

The api/gantt_task_row_class_template.md template allows you to change the color of the rows of the timeline area (those lying behind the Gantt tasks).

~~~js
gantt.templates.task_row_class = function(start, end, task){
  if(task.id == 12)
  	return "updColor";
};
~~~

<img src="desktop/styling_timeline_row.png">

{{editor	http://docs.dhtmlx.com/gantt/snippet/25715bf1		Styling Rows of the Timeline Area}}

{{sample	04_customization/02_custom_tree.html}}


###Highlighting timeline cells

You can highlight the necessary timeline cells, depending on the day of the week with the **task_cell_class** template. The template function will iterate over the cells and apply the desired CSS
class to the specified cells. For example, you can highlight weekends as in:

~~~html
<style>
	.weekend{
		background: #f4f7f4;
	}	
</style>
~~~

~~~js
gantt.templates.task_cell_class = function(item,date){
	if(date.getDay()==0||date.getDay()==6){
		return "weekend"
	}
};
~~~

<img src="desktop/styling_timeline_cells.png">

{{sample	04_customization/06_highlight_weekend.html}}

Read more on this topic in the article desktop/highlighting_time_slots.md.


Styling Links
--------------

You can change the style of the dependency links via the related desktop/dependency_templates.md.

###Styling the lines of dependency links

You can change the color of the dependency line via the api/gantt_link_class_template.md template.

~~~js
gantt.templates.link_class = function(link){
    return "";
};
~~~

<img src="desktop/coloring_links.png">

{{sample  04_customization/03_link_styles.html}}


There is more information in the related article desktop/colouring_lines.md.

###Setting color via the property of the link object

You can also set a custom color for a dependency link by specifying the **color** property in the link object:

~~~js
var tasks = {
  data:[
     // tasks configuration
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, 
     {id:2, source:2, target:3, type:"0", color:"blue"}
  ]
};
 
gantt.init("gantt_here");
gantt.parse(tasks);
 
gantt.getLink(2).color = "blue";
~~~

Read the related section of the desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject article to get the details.

###Styling the popups of dependency links

The api/gantt_drag_link_class_template.md template allows styling the popup that appears when a user starts dragging a dependency line between tasks. For example, you can color the background of the popup and change the color of the popup text:

~~~html
<style>
  .gantt_link_tooltip{color:red; background-color:yellow} 
</style> 
~~~


~~~js
gantt.templates.drag_link_class = function(from, from_start, to, to_start) {
    return "gantt_link_tooltip" ;
};
~~~

<img src="desktop/styling_link_popup.png">

{{editor	http://docs.dhtmlx.com/gantt/snippet/9b4d4246		Styling the Popup of Dependency Link}}

Check the desktop/dependency_templates.md article to get more details on the topic.



Styling Quick Info Popup
-------------------

The styling of the Quick Info popup is defined via the desktop/touch_templates.md templates.

You can apply the necessary style to the pop-up edit form by the api/gantt_quick_info_class_template.md template. For example, you can style quick info popups for
particular tasks as follows:

~~~html
<style>
  .updColor{
  	background-color:#ffeb8a!important;
  }
  .updColor .gantt_cal_qi_title{
  	background-color:#ffeb8a!important;
  }
  
</style>
~~~

~~~js
gantt.templates.quick_info_class = function(start, end, task){ 
  if(task.id == "12")
    return "updColor";
  
  	return ""
};
~~~

<img src="desktop/styling_quick_info.png">

{{editor			https://docs.dhtmlx.com/gantt/snippet/0e519fb2			Styling Quick Info Popup}}


