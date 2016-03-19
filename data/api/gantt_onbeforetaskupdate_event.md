onBeforeTaskUpdate
=============
@short:fires before the user updates a task
	
@params:
- id			string/number		the task id
- new_item		object				the new (updated)  object of the task 

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_item){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:
The event is blockable. Return false to cancel updating of the task.

@relatedapi:
	api/gantt_updatetask.md
    api/gantt_onaftertaskupdate_event.md
