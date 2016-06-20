onAfterTaskDelete
=============
@short:fires after the user deletes a task 
	

@params:
- id		string, number			the task id
- item		object					the task object 

@example:
gantt.attachEvent("onAfterTaskDelete", function(id,item){
    //any custom logic here
});

@template:	api_event
@relatedapi:
	api/gantt_deletetask.md
@descr:
