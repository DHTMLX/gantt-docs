onError
=============

@short:
	fires when api/gantt_assert.md receives 'false' value, i.e. when assertion fails

@params:
- errorMessage		string			a string with an error from the api/gantt_assert.md method

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onError", function(errorMessage){
	gantt.message({
    	text:"Error"
    });
    return true;
});

@template:	api_event
@descr:
the event is blockable. Returning false will cancel error message showing

@changelog:

added in version 4.0
