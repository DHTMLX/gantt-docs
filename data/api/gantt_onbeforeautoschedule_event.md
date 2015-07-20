onBeforeAutoSchedule
=============

@short:
	fires before auto scheduling 

@params:
- taskId		string/number		the root task id

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
	// any custom logic here
});

@template:	api_event
@descr:
the event is blockable - returning false will cancel further processing

