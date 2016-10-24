onBeforeTaskDelete
=============

@short:fires before the user deletes a task 
	

@params:
- id	string, number	the task id
- item	object	the task object 

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskDelete", function(id,item){
    //any custom logic here
	return true;
});

@template:	api_event
@relatedapi:
	api/gantt_deletetask.md
@descr:
The event is blockable. Return false to cancel deleting of the task.