attachEvent
=============
@short:attaches the handler to an inner event of dhtmlxGantt
	

@params: 
- name		GanttEventName		the event's name, case-insensitive
- handler	function	the handler function
- settings 	object		optional, an <a href="#propertiesofsettingsobject">object with settings</a> for the event handler

@example: 
gantt.attachEvent("onTaskClick", function(id, e) {
	alert("You've just clicked an item with id="+id);
});

@returns:
event_id	string	the id of the attached event handler



@template:	api_method
@relatedapi:
	api/gantt_detachevent.md
@related:
	desktop/handling_events.md
@relatedsample:
	08_api/01_dnd_events.html
@descr:

You can attach several handlers to the same event and all of them will be executed.
If some of handlers will return *false* - the related operation will be blocked.
Event handlers are processed in the same order that they were attached.


Properties of settings object 
-----------------------
The settings object can contain two properties:

1\. **id** - (*string*) the id of the event handler 

For example, you can easily detach a handler from the specified event:

~~~js
gantt.attachEvent("onTaskClick", function(){
	console.log("task click");
}, {id: "my-click"}); /*!*/
... //after a while:
gantt.detachEvent("my-click");
~~~

2\. **once** - (*boolean*) defines whether the event will be executed only once

Set the property to *true* if you want to capture the first triggering of the event, as in:

~~~js
gantt.attachEvent("onTaskClick", function(){
	console.log("capture next task click");
	return true;
}, {once: true}); /*!*/
~~~