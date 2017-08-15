onTaskLoading
=============

@short:
	fires when a task is being loaded from the data source
	

@params:
- task			object			the object of a task

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onTaskLoading", function(task){
    //any custom logic here
    return true;
});

@template:	api_event
@descr:
- The event fires for each task in the data source.
- The event is blockable. Return *false* and the task won't be loaded into the Gantt chart.

@relatedapi:
    api/gantt_onloadstart_event.md
	api/gantt_onbeforeparse_event.md
	api/gantt_onparse_event.md
	api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
    api/gantt_ondatarender_event.md
	api/gantt_onganttrender_event.md
    api/gantt_onloadend_event.md