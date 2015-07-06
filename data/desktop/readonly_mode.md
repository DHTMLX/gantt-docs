Setting the Read-only Mode
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
Note, when the entire Gantt chart is non-editable, users can't open the lightbox.

<br>

To make specific tasks/links editable in the read-only Gantt chart, add the 'editable' property to their data object and set  to *true*:

<img src="desktop/task_editable_property.png"/>

~~~js
gantt.config.readonly = true;
var task = gantt.getTask(id).editable = true;
~~~
By default, the mentioned behavior is binded to 'editable' property of a task/link. You can change the target property using the api/gantt_editable_property_config.md configuration option:

~~~js
gantt.config.editable_property = "property_name";
~~~

Read-only mode for specific tasks/links
------------------------------------------------
To make specific tasks or links read-only, add the 'readonly' property to data objects and set it to true:

~~~js
scheduler.getTask(id).readonly = true;
scheduler.getLink(id).readonly = true;
~~~

<img src="desktop/task_readonly_property.png"/>

{{note
By default, the gantt checks whether a task/link has this property with a no-negative value then makes the task/link read-only. Otherwise - keeps it editable.
}}

When the task/link is read-only,  it won't react on clicks, double clicks,not draggable and editable in any way.

<br>
By default, the read-only behavior is binded to the 'readonly' property of a task/link. But you can change the target property using the  api/gantt_readonly_property_config.md configuration option:

~~~js
gantt.config.readonly_property = "property_name";
~~~


