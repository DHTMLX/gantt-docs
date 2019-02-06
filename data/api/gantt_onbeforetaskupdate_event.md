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


@relatedapi:
	api/gantt_updatetask.md
    api/gantt_onaftertaskupdate_event.md
