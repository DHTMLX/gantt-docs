onAfterTaskUpdate
=============

@short:fires after the user updates a task
	

@params:
- id			string,number			the task id
- task			Task					the task object 

@example:
gantt.attachEvent("onAfterTaskUpdate", function(id,task){
    //any custom logic here
});

@template:	api_event
@descr:

@relatedapi:
	api/gantt_updatetask.md
    api/gantt_onbeforetaskupdate_event.md
