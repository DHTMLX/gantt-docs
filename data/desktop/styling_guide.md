Working with Styles in Gantt
=========================

dhtmlxGantt provides a wide set of options for adjusting the styles of its elements. You can follow the directions given in this guide to modify the styling of
tasks, links, scale and subscales, grid and other parts of the Gantt chart. There is detailed information on working with the styles of this or that Gantt element is provided
in the related docs. Here you will find general guidelines collected together to facilitate your wandering through the documentation. 

Styling Tasks
----------------

You can change the style of a task and a task bar via the corresponding [templates of the timeline area](desktop/timeline_templates.md).

###Styling the task bar

You can redefine the api/gantt_task_class_template.md template to refresh the styles of a task or of a task bar. 
You can find the details in the article desktop/colouring_tasks.md#redefiningthetaskstemplate.

~~~js
gantt.templates.task_class = function(start, end, task){return "";};
~~~

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

{{editor		https://docs.dhtmlx.com/gantt/snippet/c31afbec		Inline Styling of the Task Text}}


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


{{sample 04_customization/16_inline_task_colors.html}}

###Styling rows of the timeline area

The **task_row_class** template allows you to change the color of the rows of the timeline area (those lying behind the Gantt tasks).

~~~js
gantt.templates.task_row_class = function(start, end, task){
  if(task.id == 12)
  	return "updColor";
};
~~~

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

{{sample	04_customization/06_highlight_weekend.html}}

Read more on this topic in the article desktop/highlighting_time_slots.md.

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

{{editor		https://docs.dhtmlx.com/gantt/snippet/53c5406c		Styling the Second Scale}}

{{sample	03_scales/01_multiple_scales.html}}


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

{{sample  04_customization/03_link_styles.html}}


###Styling the popups of dependency links

The api/gantt_drag_link_class_template.md template allows styling the popup that appears when a user starts dragging a dependency line between tasks. For example, you can color the background of
the popup and change the color of the popup text:

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

{{editor	http://docs.dhtmlx.com/gantt/snippet/9b4d4246		Styling the Popup of Dependency Link}}


Styling Grid
------------------
