onAfterTaskAutoSchedule
=============

@short:
	fires for each task which has been autoscheduled

@params:
- task				object			the task object
- startDate			Date object		new start date
- link				object			the link object that creates the constraint
- predecessor		object			the predecessor task object


@example:

gantt.attachEvent("onAfterTaskAutoSchedule",function(task, startDate, link, predecessor){
    // any custom logic here
});

@template:	api_event
@descr:

