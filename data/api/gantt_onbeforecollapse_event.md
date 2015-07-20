onBeforeCollapse
=============

@short:
	fires before the Gantt chart is collapsed

@params:

@example:
gantt.attachEvent("onBeforeCollapse",function(){
    // any custom logic here
});

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@template:	api_event
@descr:
the event is blockable - returning false will cancel further processing
