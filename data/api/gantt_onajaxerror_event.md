onAjaxError
=============

@short:
	fires if the server returns an error

@params:

- request		object 			XML HTTP request object

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:

gantt.attachEvent("onAjaxError", function(request){
    // your code here
    return true;
});

@template:	api_event
@descr:
The event is blockable. Return false to cancel further processing.
