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


Initialization
-----------------

To add the **template** control to the lightbox, follow these steps:

1) Add a section to the lightbox configuration:

~~~js
gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Set a label for the section:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) Set the content of the control with the help of some event, e.g. the api/gantt_onbeforelightbox_event.md event:

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
  	var task = gantt.getTask(id);
   	task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
	return true;
});
~~~


Properties
--------------

The following properties are mostly important and commonly set for the **template** control (see the full list <a href="api/gantt_lightbox_config.md">here</a>):

- **name** - (*string*) the section name 
- **height** - (*number*) the section height
- **map_to** - (*string*) the name of a data property that will be mapped to the section
- **type** - (*string*) the type of the [section control](desktop/default_edit_form.md#lightboxcontrols)
- **focus** - (*boolean*) if set to *true*, the section will take focus on opening the lightbox

