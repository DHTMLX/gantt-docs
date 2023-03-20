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
    gantt.message({type: "error", text:`Http error ${request.status}!`})
    gantt.message(request.response)
    return true;
});

@template:	api_event
@descr:
The event is blockable. Returning false will stop further processing of the AJAX request

@related:
desktop/server_side.md


@relatedsample: https://snippet.dhtmlx.com/5/bc8ea86e0	Error from the server