onDestroy
=============

@short:
	called after gantt has been cleared by the api/gantt_destructor.md method

@params:

@example:
gantt.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

gantt.destructor();

@template:	api_event
@descr:

@relatedapi:
api/gantt_destructor.md