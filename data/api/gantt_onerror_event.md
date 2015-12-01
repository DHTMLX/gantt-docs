onError
=============

@short:
	fires when api/gantt_assert.md receives 'false' value, i.e. when assertion fails

@params:
- errorMessage		string			a string with an error from the api/gantt_assert.md method

@example:
gantt.attachEvent("onError", function(errorMessage){
	gantt.message({
    	text:"Error"
    });
});

@template:	api_event
@descr:

@changelog:

added in version 4.0
