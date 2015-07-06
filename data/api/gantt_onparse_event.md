onParse
=============
@short:fires after data was parsed (became available for API) but before it was rendered in the Gantt chart
	

@params:

@example:
gantt.init("gantt_here");
gantt.attachEvent("onParse", function(){alert("Data was parsed")});

gantt.parse(demo_tasks);

@template:	api_event
@descr:

@relatedapi: 
    api/gantt_onloadstart_event.md
	api/gantt_onbeforeparse_event.md
    api/gantt_ontaskloading_event.md
    api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
    api/gantt_ondatarender_event.md
	api/gantt_onganttrender_event.md
    api/gantt_onloadend_event.md