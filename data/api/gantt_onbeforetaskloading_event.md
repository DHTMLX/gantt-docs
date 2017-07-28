onBeforeTaskLoading
=============

@todo:
	check 

@short:
	fires before a task has been loaded to the Gantt chart 

@params:
- task		object			the object of a task

@returns:  
- result     boolean       	defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeTaskLoading", function(task){
    //any custom logic here
    return false;
});

@template:	api_event
@descr:
- The event fires for each task in the data source.
- The event is blockable. Return *false* and the task won't be loaded into the Gantt chart.

@relatedapi:
api/gantt_ontaskloading_event.md