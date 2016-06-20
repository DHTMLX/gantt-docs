onTaskIdChange
=============

@short:fires when the id of a task is changed
	

@params:
- id		string, number		the current task's id
- new_id	string, number		the new task's id

@example:
gantt.attachEvent("onTaskIdChange", function(id,new_id){
    //any custom logic here
});


@template:	api_event
@descr:
@relatedapi:
	api/gantt_changetaskid.md

