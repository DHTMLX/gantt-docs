Read-Only Mode
===================================

In this part we want to consider read-only mode in the context of 2 situations:

1. [Read-only mode for the entire Gantt chart](desktop/readonly_mode.md#readonlymodefortheentiregantt)
2. [Read-only mode for specific tasks](desktop/readonly_mode.md#readonlymodeforspecifictaskslinks)


Read-only mode for the entire gantt
---------------------------------------------------

To make the entire Gantt chart read-only, set the api/gantt_readonly_config.md  option to *true*.

~~~js
gantt.config.readonly = true;

gantt.init("gantt_here");
~~~

You should be aware that the read-only mode affects only the built-in actions which users can perform via UI. It means that when the entire Gantt chart is non-editable, the users can't open the lightbox or inline editor, can't drag-n-drop tasks vertically or horizontally, or resize tasks.

But the api/gantt_readonly_config.md property doesn't block actions implemented via API methods. Thus, if you use the Gantt API, you need to manually check if the read-only mode is enabled in the callback function. For instance, here is how you can block the ability to add tasks via clicking on a custom button:

~~~js
gantt.config.readonly = true;

gantt.config.columns = [
    { name: "text", label: "Task name", width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration", label: "Duration", align: "center" },
    { name: "add", label: "1", width: 44 },
    {
        name: "add_custom", label: "2", width: 44, template: function (task) {
          return "<div class='custom_add' onclick='customAdd(" + task.id + ")';></div>"
        }
    }
];

function customAdd(parentId) { /*!*/
    if (gantt.config.readonly){ /*!*/
        return; /*!*/
    }/*!*/
}/*!*/
~~~



To make specific tasks/links editable in the read-only Gantt chart, add the 'editable' property to their data object and set it to *true*:

<img src="desktop/task_editable_property.png"/>

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~
By default, the mentioned behavior is binded to the 'editable' property of a task/link. You can change the target property using the api/gantt_editable_property_config.md configuration option:

~~~js
gantt.config.editable_property = "property_name";
~~~


Read-only mode for specific tasks/links
------------------------------------------------
To make specific tasks or links read-only, add the 'readonly' property to data objects and set it to true:

~~~js
gantt.getTask(id).readonly = true;
gantt.getLink(id).readonly = true;
~~~

<img src="desktop/task_readonly_property.png"/>

{{note
By default, the gantt checks whether a task/link has this property with a no-negative value then makes the task/link read-only. Otherwise - keeps it editable.
}}

When the task/link is read-only,  it won't react on clicks, double clicks, isn't draggable or editable in any way.

In case you want to show the lightbox for read-only tasks, you can manually call it using [gantt.showLightbox(id)](api/gantt_showlightbox.md):

~~~js
gantt.attachEvent("onTaskDblClick", function(id,e){
    gantt.showLightbox(id)
    return true;
});
~~~

By default, the read-only behavior is binded to the 'readonly' property of a task/link. But you can change the target property using the  api/gantt_readonly_property_config.md configuration option:

~~~js
gantt.config.readonly_property = "property_name";
~~~


Details of the "editable_property" config option
---------------------------

The 'editable_property' refers to the property of the task data object, not to the lightbox section or the column of the left-hand grid:

~~~js
{
	tasks:[
		{id:1, text:"Project #2", start_date:"01-04-2020", duration:18,order:10, 
        	progress:0.4, parent:0, editable:false},
		{id:2, text:"Task #1", start_date:"02-04-2020", duration:8, order:10, 
        	progress:0.6, parent:1, editable:true},
		{id:3, text:"Task #2", start_date:"11-04-2020", duration:8, order:20, 
        	progress:0.6, parent:1, editable:true}
	],
	links:[...]
}
~~~

If you want to make it settable from the lightbox, you need to set the 'editable_property' to the same property the control is mapped to:

~~~js
gantt.config.lightbox.sections = [ 
	{
    	name:"description", 
        height:38, 
        map_to:"some_property", 
        type:"textarea", 
        focus:true
    },
	....
]
gantt.config.editable_property = "some_property";
~~~

Setting event readonly based on multiple properties
-----------------------

If you want to make events conditionally editable based on a set of properties, you can:

- manage their editability manually, e.g. by blocking the api/gantt_onbeforelightbox_event.md and api/gantt_onbeforetaskdrag_event.md events 
- dynamically update the 'editable_property' each time the task is loaded, added or updated (api/gantt_ontaskloading_event.md, api/gantt_ontaskcreated_event.md, api/gantt_onaftertaskupdate_event.md):

~~~js
gantt.attachEvent("onTaskLoading", function(task){
    task.editable = task.has_owner && task.editable && task.text;
    return true;
});
~~~

