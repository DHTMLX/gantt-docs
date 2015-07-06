onBeforeParse
=============
@short:fires before data started to be parsed 
	

@example:
gantt.init("gantt_here");
gantt.attachEvent("onBeforeParse", function(){ 
	//any custom logic here
});

gantt.parse(demo_tasks);

@template:	api_event

@relatedapi: 
    api/gantt_onloadstart_event.md
    api/gantt_ontaskloading_event.md
	api/gantt_onparse_event.md
	api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
    api/gantt_ondatarender_event.md
	api/gantt_onganttrender_event.md
    api/gantt_onloadend_event.md