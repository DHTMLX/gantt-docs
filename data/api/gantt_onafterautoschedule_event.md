onAfterAutoSchedule
=============

@short:
	fires when autoscheduling is done 

@params:
- taskId			string/number			the root task id
- updatedTasks		array					an array with the ids of rescheduled tasks


@example:
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
	// any custom logic here
});


@template:	api_event
@descr:

