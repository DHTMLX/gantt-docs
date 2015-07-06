onDataRender
=============
@short:fires after data was rendered on the page
	
@example:
gantt.attachEvent("onDataRender", function(){alert("Data was rendered on the page")});

gantt.init("gantt_here");
gantt.parse(demo_tasks);

@template:	api_event
@descr:

@relatedapi:
	api/gantt_onloadstart_event.md
    api/gantt_ontaskloading_event.md
	api/gantt_onbeforeparse_event.md
	api/gantt_onparse_event.md
	api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
	api/gantt_onganttrender_event.md
    api/gantt_onloadend_event.md