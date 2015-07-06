onBeforeTaskSelected
=============

@short:fires before the user selects a task 
	

@params:
- id	string, number	the task id


@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeTaskSelected", function(id,item){
    //any custom logic here
	return true;
});

@template:	api_event
@relatedapi:
	api/gantt_ontaskselected_event.md
    api/gantt_ontaskunselected_event.md
@descr:
The event is blockable. Return *false* to cancel the default processing.
