onBeforeTaskAutoSchedule
=============

@short:
	fires for each task which is rescheduled

@params:
- task				object			the task object
- startDate			Date object		new start date
- link				object			the link object that creates the constraint
- predecessor		object			the predecessor task object


@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, startDate, link, predecessor){
    // any custom logic here
});

@template:	api_event
@descr:
the event is blockable - returning false will cancel further processing
