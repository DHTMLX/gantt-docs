onBeforeExpand
=============

@short:
	fires before the Gantt chart is expanded to full screen

@params:

@example:
gantt.attachEvent("onBeforeExpand",function(){
    // any custom logic here
});

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@template:	api_event
@descr:
the event is blockable - returning false will cancel further processing

