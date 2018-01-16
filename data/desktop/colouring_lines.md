Coloring Dependency Links
================================

Coloring dependency links in various colors allows you to visually differentiate them for users.

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/coloring_links.png"/>

To set a custom style for links, you can use one of the following approaches:

1. [To redefine the default link's template](desktop/colouring_lines.md#redefiningthelinkstemplate)
2. [To set style values in the properties of the link object](desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject)


Redefining the link's template
-----------------------------------------

To style dependency links, use the api/gantt_link_class_template.md template. For example, to color links depending on the tasks priority, use the code as in:

{{snippet
Coloring links depending on the dependency type
}}
~~~js
gantt.templates.link_class = function(link){
	var types = gantt.config.links;
	switch (link.type){
		case types.finish_to_start:
			return "finish_to_start";
			break;
		case types.start_to_start:
			return "start_to_start";
			break;
		case types.finish_to_finish:
			return "finish_to_finish";
			break;
		case types.start_to_finish:
			return "start_to_finish";
			break;
	}
};
~~~

{{sample
	04_customization/03_link_styles.html
}}

{{note
To style other elements of dependency links, use the templates listed in the desktop/dependency_templates.md article.
}}

A similar approach can be applied to tasks. Read more about it [here](desktop/colouring_tasks.md#redefiningthetaskstemplate).

Specifying color in the properties of the link object
-----------------------------------------------------

To specify a custom color for a dependency link, you can add extra property to the data object:

- **color** - the color of the link 

<img src="desktop/link_color_property.png"/>

{{note
Note, this is a special property. 
By default, Gantt checks whether a link has it and if it does, applies the related value to the link. Otherwise, the predefined color is applied.
}}

{{snippet
Setting the link's color in the data object
}}
~~~js
var tasks = {
  data:[
     {id:1, text:"Project #1", start_date:"01-04-2013", duration:18},
     {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8, parent:1},
     {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
  ],
  links:[
     {id:1, source:1, target:2, type:"1", color:"red"}, /*!*/
     {id:2, source:2, target:3, type:"0", color:"blue"},/*!*/
     {id:3, source:3, target:4, type:"0", color:"blue"},/*!*/
     {id:4, source:2, target:5, type:"2", color:"green"}/*!*/
  ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getLink(4).color = "green";
~~~


If, at least one of the properties is assigned, the link receives additional class - **"gantt_link_inline_color"**. 

You can use this class to override some other style for the link:

~~~js
.gantt_link_inline_color {
	opacity:0.4
}
~~~


The properties can have any valid CSS color value, e.g. all of the following notations are valid:

~~~js
link.color = "#FF0000";
link.color = "red";
link.color = "rgb(255,0,0)";
~~~


A similar approach can be applied to tasks. Read more about it [here](desktop/colouring_tasks.md#specifyingstyleinthepropertiesofthetaskobject).