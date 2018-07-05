onBeforeTaskAdd
=============

@short:fires before a new task is added to the Gantt chart
	

@params:
- id		string,number		the task id
- item		object				the task object 

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskAdd", function(id,item){
    //any custom logic here
	return true;
});

@template:	api_event
@descr:
The event is blockable. Return *false* to cancel adding of the task.

@relatedapi:
	api/gantt_addtask.md
