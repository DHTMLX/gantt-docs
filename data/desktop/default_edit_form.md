Configuring Elements of the Lightbox
=============================================
 Lightbox is an edit form used to change the task's details.<br> The default lightbox is presented in the image below.

<img src="desktop/lightbox.png"/>

Lightboxes may differ depending on the type and peculiarities of tasks they are used for. You can learn more from the section desktop/task_types.md#individuallightboxforeachtype.

Exploring the lightbox's structure
--------------------------------------

###Sections
The structure of the lightbox is specified by the **sections** property of the lightbox object:

~~~js
//default lightbox definition   
gantt.config.lightbox.sections=[
	{name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time", 		 height:72, map_to:"auto", type:"duration"}
];
~~~
Each item in the sections's array is an object that specifies an individual section in the lightbox (available section properties).



###Sections controls
Each section of the lightbox is based on some control. The following types of controls are available for use in the lightbox:

- [Textarea](desktop/textarea.md) - a multiline text field
- [Time](desktop/time.md) - a pair of selectors for setting the task duration by specifying the task's start and end dates
- [Duration](desktop/duration.md) - a set of selectors for setting the task duration by specifying the task's start date and the number of days
- [Select](desktop/select.md) - a simple select box
- [Typeselect](desktop/typeselect.md) - a select box for changing the type of a task
- [Parent](desktop/parent.md) - a select box for changing the parent of a task
- [Template](desktop/template.md) - a container with some HTML content inside



~~~js
var opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
	{name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority", 	 height:22, map_to:"priority", type:"select", options:opts},
    {name:"time", 		 height:72, map_to:"auto", type:"duration"}
];
~~~



@index:
- desktop/textarea.md
- desktop/duration.md
- desktop/time.md
- desktop/select.md
- desktop/typeselect.md
- desktop/parent.md
- desktop/template.md
