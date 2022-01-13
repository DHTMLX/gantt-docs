onBeforeTaskUpdate
=============

@short:fires before the user updates a task
	
@params:
- id			string,number		the task id
- new_item		object				the new (updated) object of the task 

 
@example:
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_item){
    //any custom logic here
});

@template:	api_event
@descr:

While using the **onBeforeTaskUpdate** event, it is not always possible to get the object of the task before the task is completely updated. The event fires after the task object has been updated but before all changes have been applied.
To get the task object before the changes are applied, you need to use the event handlers which are directly related to the changes of the task:

- api/gantt_onlightboxsave_event.md
- api/gantt_onbeforetaskdrag_event.md
- desktop/inline_editors_ext.md#events
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_onrowdragstart_event.md

If the changes are made via API, you may get the task object before the code, which modifies the task, is executed. Check the example where you may modify a task in different ways (for instance, change the task dates):

{{editor	https://snippet.dhtmlx.com/5/6d5ccd13a	Updating a task}}

After comparison, you will notice that the events, which fire right before you modify the task, return the old task object, while the **onBeforeTaskUpdate** event returns a new object of the task.

@relatedapi:
	api/gantt_updatetask.md
    api/gantt_onaftertaskupdate_event.md
