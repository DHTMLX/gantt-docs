callEvent
=============
@short:calls an inner event
	
@params:
- name		string		the event's name, case-insensitive
* params	array		optional, an array of the event-related data

@returns:
- result	boolean     <i>false</i>, if some of the event handlers returns <i>false</i>. Otherwise, <i>true</i>

@example:
gantt.attachEvent("CustomEvent", function(param1, param2){
	return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);


@template:	api_method
@descr:
Normally, events are called automatically and you don't need to use this method.



