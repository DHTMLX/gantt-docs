onBeforeTaskDisplay
=============

@short: fires after the tasks have been loaded to the Gantt chart, but before they are displayed
	

@params:
- id		string,number		the task id
- task		Task				the task object

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});

@template:	api_event
@descr:
The event is blockable. Returning false will prevent the task from being displayed

@related:
	desktop/filtering.md
@relatedapi:
	 api/gantt_onbeforelinkdisplay_event.md