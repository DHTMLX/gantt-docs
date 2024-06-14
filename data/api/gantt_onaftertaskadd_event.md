onAfterTaskAdd
=============
@short:fires after the user adds a task to the Gantt chart
	

@params:
- id		string,number			the task id
- task		Task					the task object 

@example:
gantt.attachEvent("onAfterTaskAdd", function(id,task){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_addtask.md
